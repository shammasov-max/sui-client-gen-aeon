module aeon_custody::proposal {
    use std::vector;
    use std::option::{Self,Option};
    use sui::clock::{Self,Clock};
    use sui::object::{Self,ID,UID};
    use sui::event::{Self};
    use sui::object_bag::{Self,ObjectBag};
    use sui::vec_map::{Self,VecMap};
    use sui::table::{Self,Table};
    use sui::tx_context::{Self,TxContext};
    use sui::transfer;
    use sui::vec_set::{Self,VecSet};
    use aeon_custody::user::{Self, Users};


    public struct Proposal has store, copy, drop {
        approved: VecSet<u16>, 
        rejected: VecSet<u16>,
        proposal_type: ProposalType,
    }

    public enum ProposalType has store, copy, drop {
        ConfigProposalQuorum {},
        MpcTxProposalQuorum {},
        MpcTxProposalSpecific { require_approval_users: vector<u16>, threshold: u16 },
    }

    // Events
    public struct ProposalExecuted has copy, drop, store {
        tx_id: u64
    }

    public struct ProposalCreated has copy, drop, store {
        workspace_id: ID,
        initiator: u16,
        is_config: bool,
        require_approval_users: vector<u16>,
        threshold: u16,
    }

    public(package) fun create_config_proposal_quorum(
        workspace_id: ID,
        user_id: u16,
    ) : Proposal {
        let proposal = Proposal {
            approved: vec_set::empty<u16>(),
            rejected: vec_set::empty<u16>(),
            proposal_type: ProposalType::ConfigProposalQuorum {},
        };

        event::emit(
            ProposalCreated {
                workspace_id: workspace_id,
                initiator: user_id,
                is_config: true,
                require_approval_users: vector::empty<u16>(),
                threshold: 0,
            }
        );
        proposal
    }

    public(package) fun create_mpc_tx_proposal_quorum(
        workspace_id: ID,
        user_id: u16,
    ) : Proposal {
        let proposal = Proposal {
            approved: vec_set::empty<u16>(),
            rejected: vec_set::empty<u16>(),
            proposal_type: ProposalType::MpcTxProposalQuorum {},
        };

        event::emit(
            ProposalCreated {
                workspace_id: workspace_id,
                initiator: user_id,
                is_config: false,
                require_approval_users: vector::empty<u16>(),
                threshold: 0,
            }
        );
        proposal
    }

    public(package) fun create_mpc_tx_proposal_specific(
        workspace_id: ID,
        user_id: u16,
        require_approval_users: vector<u16>,
        threshold: u16,
    ) : Proposal {
        let proposal = Proposal {
            approved: vec_set::empty<u16>(),
            rejected: vec_set::empty<u16>(),
            proposal_type: ProposalType::MpcTxProposalSpecific {
                require_approval_users: require_approval_users,
                threshold: threshold,
            },
        };

        event::emit(
            ProposalCreated {
                workspace_id: workspace_id,
                initiator: user_id,
                is_config: false,
                require_approval_users: require_approval_users,
                threshold: threshold,
            }
        );
        proposal
    }


    public(package) fun is_proposal_approved(proposal: &Proposal, users: &Users): bool {
        match (proposal.proposal_type) {
            ProposalType::ConfigProposalQuorum {} => {
                users.quorum_approves(&proposal.approved)
            },
            ProposalType::MpcTxProposalQuorum {} => {
                users.quorum_approves(&proposal.approved)
            },
            ProposalType::MpcTxProposalSpecific { require_approval_users: _, threshold } => {
                ((proposal.approved.size() as u16) >= threshold)
            }
        }
    }

    public(package) fun is_user_authorised_vote_proposal(
        proposal: &Proposal,
        users: &Users,
        user_id: u16,
    ) : bool {
        match (proposal.proposal_type) {
            ProposalType::ConfigProposalQuorum {} => users.is_user_authorized(user_id, user::get_admin_quorum_permission()),
            ProposalType::MpcTxProposalQuorum {} => users.is_user_authorized(user_id, user::get_admin_quorum_permission()),
            ProposalType::MpcTxProposalSpecific { require_approval_users, threshold: _ } => {
                require_approval_users.contains(&user_id)
            },
        }
    }

    // TODO refactor this to be more generic in a process_approval_quorum function
    public(package) fun approve_proposal(
        proposal: &mut Proposal,
        users: &mut Users,
        user_id: u16,
    ):bool {
        is_user_authorised_vote_proposal(proposal, users, user_id);
        match (proposal.proposal_type) {
            ProposalType::ConfigProposalQuorum{} => {
                if (has_voted_reject(proposal, user_id)) {
                    remove_rejection_vote(proposal, user_id);
                };
                proposal.approved.insert(user_id);

                if (user::get_count_quorum_members_from_list(users, *proposal.approved.keys()) >= users.get_admin_quorum_threshold()) {
                    // proposal.status = PROPOSAL_STATUS_APPROVED;
                    return true
                };
                return false;
            },
            ProposalType::MpcTxProposalQuorum{} => {
                if (has_voted_reject(proposal, user_id)) {
                    remove_rejection_vote(proposal, user_id);
                };
                proposal.approved.insert(user_id);

                if (user::get_count_quorum_members_from_list(users, *proposal.approved.keys()) >= users.get_admin_quorum_threshold()) {
                    // proposal.status = PROPOSAL_STATUS_APPROVED;
                    return true
                };
                return false;

            },
            ProposalType::MpcTxProposalSpecific{require_approval_users: require_approval_users, threshold: threshold} => {
                if (has_voted_reject(proposal, user_id)) {
                    remove_rejection_vote(proposal, user_id);
                };
                proposal.approved.insert(user_id);

                if ((proposal.approved.size() as u16) >= threshold) {
                    // proposal.status = PROPOSAL_STATUS_APPROVED;
                    return true
                };
                return false;
            },
        };
        false
    }


    public(package) fun reject_proposal(
        proposal: &mut Proposal, 
        users: &mut Users, 
        user_id: u16 
    ): bool {
        is_user_authorised_vote_proposal(proposal, users, user_id);

        match (proposal.proposal_type) {
            ProposalType::ConfigProposalQuorum{} => {
                if (has_voted_approve(proposal, user_id)) {
                    remove_approval_vote(proposal, user_id);
                };
                proposal.rejected.insert(user_id);

                let quorum_members = users.get_admin_quorum_members();
                let cutoff = quorum_members.length() as u16 - users.get_admin_quorum_threshold() + 1;

                if ((proposal.rejected.size() as u16) >= cutoff) {
                    // proposal.status = PROPOSAL_STATUS_REJECTED;
                    return true;
                };
                return false;
            },
            ProposalType::MpcTxProposalQuorum{} => {
                if (has_voted_approve(proposal, user_id)) {
                    remove_approval_vote(proposal, user_id);
                };
                proposal.rejected.insert(user_id);

                let quorum_members = users.get_admin_quorum_members();
                let cutoff = quorum_members.length() as u16 - users.get_admin_quorum_threshold() + 1;

                if ((proposal.rejected.size() as u16) >= cutoff) {
                    // proposal.status = PROPOSAL_STATUS_REJECTED;
                    return true;
                };
                return false;
            },
            ProposalType::MpcTxProposalSpecific { require_approval_users, threshold } => {
                if (has_voted_approve(proposal, user_id)) {
                    remove_approval_vote(proposal, user_id);
                };
                proposal.rejected.insert(user_id);

                let cutoff = (require_approval_users.length() as u16) - threshold + 1;

                if ((proposal.rejected.size() as u16) >= cutoff) {
                    return true;
                };
                return false
            }
        };
        false
    }



    // internal helper funs 
    fun has_voted_approve(proposal: &Proposal, user_id: u16): bool {
        match (proposal.proposal_type) {
            ProposalType::ConfigProposalQuorum{} => {
                proposal.approved.contains(&user_id)
            },
            ProposalType::MpcTxProposalQuorum{} => {
                proposal.approved.contains(&user_id)
            },
            ProposalType::MpcTxProposalSpecific{..} => {
                proposal.approved.contains(&user_id)
            },
        }
    }

    fun has_voted_reject(proposal: &Proposal, user_id: u16): bool {
        match (proposal.proposal_type) {
            ProposalType::ConfigProposalQuorum{} => {
                proposal.rejected.contains(&user_id)
            },
            ProposalType::MpcTxProposalQuorum{} => {
                proposal.rejected.contains(&user_id)
            },
            ProposalType::MpcTxProposalSpecific{..} => {
                proposal.rejected.contains(&user_id)
            },
        }
    }

    fun remove_approval_vote(proposal: &mut Proposal, user_id: u16) {
        match (proposal.proposal_type) {
            ProposalType::ConfigProposalQuorum{} => {
                proposal.approved.remove(&user_id);
            },
            ProposalType::MpcTxProposalQuorum{} => {
                proposal.approved.remove(&user_id);
            },
            ProposalType::MpcTxProposalSpecific{..} => {
                proposal.approved.remove(&user_id);
            },
        }
    }


    fun remove_rejection_vote(proposal: &mut Proposal, user_id: u16) {
        match (proposal.proposal_type) {
            ProposalType::ConfigProposalQuorum{} => {
                proposal.rejected.remove(&user_id);
            },
            ProposalType::MpcTxProposalQuorum{} => {
                proposal.rejected.remove(&user_id);
            },
            ProposalType::MpcTxProposalSpecific{..} => {
                proposal.rejected.remove(&user_id);
            },
        }
    }


    public(package) fun is_quorum_proposal(
        proposal: &Proposal,
    ): bool {
        match (proposal.proposal_type) {
            ProposalType::ConfigProposalQuorum{} => true,
            ProposalType::MpcTxProposalQuorum{} => true,
            _ => false,
        }
    }

}
