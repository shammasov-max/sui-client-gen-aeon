

module aeon_custody::address_book {
    use std::vector;
    use std::option::{Self,Option};
    use sui::table::{Self,Table};
    use std::string::{Self,String};
    use sui::tx_context::{Self,TxContext};
    use sui::vec_set::{Self,VecSet};

    use aeon_custody::library::{Self, NetworkAddress};
    


    public struct Address has store {
        name: String,
        group_ids: VecSet<u16>,
        address_: vector<u8>,
        network_ids: VecSet<String>
    }

    public struct AddressGroup has store {
        name: String,
        address_ids: VecSet<u16>,
    }

    public struct AddressBook has store {
        addresses: Table<u16,Address>,
        address_groups: Table<u16,AddressGroup>, //groups together contacts

        address_entry_id_by_address: Table<vector<u8>, vector<u16>>, // one address could be found in several entries
        address_id_counter: u16, //used to generate contact and contact group ids; starts with index 0
    }


    public(package) fun init_address_book(ctx: &mut TxContext): AddressBook {
        return AddressBook {
            addresses: table::new(ctx),
            address_groups: table::new(ctx),
            address_entry_id_by_address: table::new(ctx),
            address_id_counter: 0,
        }
    }
    

    // TOOD how do we check the network
    public(package) fun get_entry_ids_by_address(book: &AddressBook, address_retrieve: NetworkAddress): Option<vector<u16>>{
        if (table::contains(&book.address_entry_id_by_address, library::get_address_raw(&address_retrieve))) {
            let id_vec = *book.address_entry_id_by_address.borrow(library::get_address_raw(&address_retrieve));
            
            // now iterate over all ids and check if the network id is the same
            let mut result = vector::empty<u16>();
            id_vec.do!(|id| {
                let entry = book.addresses.borrow(id);
                if (entry.network_ids.contains(&library::get_network_id(&address_retrieve))) {
                    result.push_back(id);
                };
            });
            return option::some(result)
        };      
        return option::none()
    }

        

    public(package) fun get_address_group_ids(book: &AddressBook, address_id: u16): vector<u16> {
        if (book.addresses.contains(address_id)) {
            return *book.addresses.borrow(address_id).group_ids.keys()
        };
        return vector::empty<u16>()
        
    }


    public(package) fun execute_config_address_book_add_address(book: &mut AddressBook, name: String, network_address: vector<u8>, network_ids: vector<String>,) {
        let entry = Address {
            name: name,
            group_ids: vec_set::empty<u16>(),
            address_: network_address,
            network_ids: vec_set::from_keys(network_ids),
        };

        book.addresses.add(book.address_id_counter, entry);

        if (book.address_entry_id_by_address.contains(network_address)) {
            let id_vec = book.address_entry_id_by_address.borrow_mut(network_address);
            id_vec.push_back(book.address_id_counter);
        }
        else {
            let vec_new = vector::singleton(book.address_id_counter);
            book.address_entry_id_by_address.add(network_address, vec_new);
        };

        book.address_id_counter = book.address_id_counter+1;
    }


    public(package) fun execute_config_address_book_edit_address(book: &mut AddressBook, address_id: u16, new_name: Option<String>, new_network_ids: Option<vector<String>>) {
        if (book.addresses.contains(address_id)) {
            let entry = table::borrow_mut(&mut book.addresses, address_id);
            if (new_name.is_some()) {
                entry.name = *option::borrow(&new_name);
            };
            if (new_network_ids.is_some()) {
                entry.network_ids = vec_set::from_keys(*new_network_ids.borrow());
            };
        }
    }
    

    // TODO go through all groups and remove the contact from there as well
    public(package) fun execute_config_address_book_delete_address(book: &mut AddressBook, address_id: u16) {
        if (table::contains(&book.addresses, address_id)) {
            let entry = table::remove(&mut book.addresses, address_id);
            
            let Address {name, group_ids, address_, network_ids} = entry;
    
            book.address_entry_id_by_address.remove(address_);
            (*group_ids.keys()).do!(|group_id| {
                let group = table::borrow_mut(&mut book.address_groups, group_id);
                group.address_ids.remove(&address_id);
            });
        }
    }


    // TODO admin quorum would not need to be notified in case an empty group is created
    // TODO enforce name uniqueness onchain??
    public(package) fun execute_config_address_book_add_group(book: &mut AddressBook, name: String, address_ids: vector<u16>,) {
        let group = AddressGroup {
            name: name,
            address_ids: vec_set::from_keys(address_ids),
        };

        table::add(&mut book.address_groups, book.address_id_counter, group);
        
        // iterate over all address_ids and add the group to the contact
        let group_id = book.address_id_counter;

        address_ids.do!(|address_id| {
            let address_entry = book.addresses.borrow_mut(address_id);
            address_entry.group_ids.insert(group_id);
        });
        book.address_id_counter = book.address_id_counter+1;
    }



    // TODO ensure that the address is not in the group already
    public(package) fun execute_config_address_book_edit_group(book: &mut AddressBook, group_id: u16, name_new_opt: Option<String>, address_ids_add: vector<u16>, address_ids_delete: vector<u16>) {
        let group = table::borrow_mut(&mut book.address_groups, group_id);
        
        if (name_new_opt.is_some()){
            group.name = *name_new_opt.borrow();
        };
        address_ids_add.do!(|address_id| {
            group.address_ids.insert(address_id);
            book.addresses.borrow_mut(address_id).group_ids.insert(group_id);
        });

        address_ids_delete.do!(|address_id| {
            group.address_ids.remove(&address_id);
            book.addresses.borrow_mut(address_id).group_ids.remove(&group_id);
        });
    }


    // TODO remove empty groups from the policy engine as well???
    public(package) fun execute_config_address_book_delete_group(book: &mut AddressBook, group_delete_id: u16,) {
        let group_deleted = book.address_groups.remove(group_delete_id);

        let AddressGroup {name, address_ids} = group_deleted;
        (*address_ids.keys()).do!(|address_id| {
            book.addresses.borrow_mut(address_id).group_ids.remove(&group_delete_id);
        });
    }



    // view
    public(package) fun is_address_in_any_group(book: &AddressBook, address_id: u16): bool {
        book.addresses.borrow(address_id).group_ids.is_empty()
    }


}