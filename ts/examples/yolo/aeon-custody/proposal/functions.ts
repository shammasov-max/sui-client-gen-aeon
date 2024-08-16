import {PUBLISHED_AT} from "..";
import {obj, pure} from "../../_framework/util";
import {ID} from "../../sui/object/structs";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface ApproveProposalArgs { proposal: TransactionObjectInput; users: TransactionObjectInput; userId: number | TransactionArgument }

export function approveProposal( tx: Transaction, args: ApproveProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::approve_proposal`, arguments: [ obj(tx, args.proposal), obj(tx, args.users), pure(tx, args.userId, `u16`) ], }) }

export interface CreateConfigProposalQuorumArgs { workspaceId: string | TransactionArgument; userId: number | TransactionArgument }

export function createConfigProposalQuorum( tx: Transaction, args: CreateConfigProposalQuorumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::create_config_proposal_quorum`, arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.userId, `u16`) ], }) }

export interface CreateMpcTxProposalQuorumArgs { workspaceId: string | TransactionArgument; userId: number | TransactionArgument }

export function createMpcTxProposalQuorum( tx: Transaction, args: CreateMpcTxProposalQuorumArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::create_mpc_tx_proposal_quorum`, arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.userId, `u16`) ], }) }

export interface CreateMpcTxProposalSpecificArgs { workspaceId: string | TransactionArgument; userId: number | TransactionArgument; requireApprovalUsers: Array<number | TransactionArgument> | TransactionArgument; threshold: number | TransactionArgument }

export function createMpcTxProposalSpecific( tx: Transaction, args: CreateMpcTxProposalSpecificArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::create_mpc_tx_proposal_specific`, arguments: [ pure(tx, args.workspaceId, `${ID.$typeName}`), pure(tx, args.userId, `u16`), pure(tx, args.requireApprovalUsers, `vector<u16>`), pure(tx, args.threshold, `u16`) ], }) }

export interface HasVotedApproveArgs { proposal: TransactionObjectInput; userId: number | TransactionArgument }

export function hasVotedApprove( tx: Transaction, args: HasVotedApproveArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::has_voted_approve`, arguments: [ obj(tx, args.proposal), pure(tx, args.userId, `u16`) ], }) }

export interface HasVotedRejectArgs { proposal: TransactionObjectInput; userId: number | TransactionArgument }

export function hasVotedReject( tx: Transaction, args: HasVotedRejectArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::has_voted_reject`, arguments: [ obj(tx, args.proposal), pure(tx, args.userId, `u16`) ], }) }

export interface IsProposalApprovedArgs { proposal: TransactionObjectInput; users: TransactionObjectInput }

export function isProposalApproved( tx: Transaction, args: IsProposalApprovedArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::is_proposal_approved`, arguments: [ obj(tx, args.proposal), obj(tx, args.users) ], }) }

export function isQuorumProposal( tx: Transaction, proposal: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::is_quorum_proposal`, arguments: [ obj(tx, proposal) ], }) }

export interface IsUserAuthorisedVoteProposalArgs { proposal: TransactionObjectInput; users: TransactionObjectInput; userId: number | TransactionArgument }

export function isUserAuthorisedVoteProposal( tx: Transaction, args: IsUserAuthorisedVoteProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::is_user_authorised_vote_proposal`, arguments: [ obj(tx, args.proposal), obj(tx, args.users), pure(tx, args.userId, `u16`) ], }) }

export interface RejectProposalArgs { proposal: TransactionObjectInput; users: TransactionObjectInput; userId: number | TransactionArgument }

export function rejectProposal( tx: Transaction, args: RejectProposalArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::reject_proposal`, arguments: [ obj(tx, args.proposal), obj(tx, args.users), pure(tx, args.userId, `u16`) ], }) }

export interface RemoveApprovalVoteArgs { proposal: TransactionObjectInput; userId: number | TransactionArgument }

export function removeApprovalVote( tx: Transaction, args: RemoveApprovalVoteArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::remove_approval_vote`, arguments: [ obj(tx, args.proposal), pure(tx, args.userId, `u16`) ], }) }

export interface RemoveRejectionVoteArgs { proposal: TransactionObjectInput; userId: number | TransactionArgument }

export function removeRejectionVote( tx: Transaction, args: RemoveRejectionVoteArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::proposal::remove_rejection_vote`, arguments: [ obj(tx, args.proposal), pure(tx, args.userId, `u16`) ], }) }
