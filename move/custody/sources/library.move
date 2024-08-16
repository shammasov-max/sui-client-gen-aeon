
module aeon_custody::library {

    use std::vector;
    use std::string::{Self,String};

    use sui::address;
    use sui::hash;
    use sui::ecdsa_k1;
    use sui::ed25519;
    use sui::bcs;
    use std::hash as std_hash;

 

    public struct NetworkAddress has store, copy,  drop {
        network: String, //this is not chain id, hence renamed to network
        address_raw: vector<u8>,
    }

    public fun get_address_raw(network_address: &NetworkAddress): vector<u8> {
        network_address.address_raw
    }

    public fun get_network_id(network_address: &NetworkAddress): String {
        network_address.network
    }


    public fun create_network_address(network: String, address_raw: vector<u8>): NetworkAddress {
        NetworkAddress { network: network, address_raw: address_raw }
    }

    public fun address_equals(a: &NetworkAddress, b: &NetworkAddress):  bool {
        return a.network == b.network && a.address_raw == b.address_raw
    }

    //todo: just use vector::contains instead!!
    public fun is_address_in_vector(network_address: &NetworkAddress, network_address_vector: &vector<NetworkAddress>): bool {
        let mut i = 0;
        while (i < vector::length(network_address_vector)) {
            if (address_equals(network_address, vector::borrow(network_address_vector, i))) {
                return true;
            };
            i = i + 1;
        };
        false
    }


    public fun parse_namespace_colon_chain_id(network_id: String): (String, String) {
        let idx_colon = string::index_of(&network_id, &string::utf8(b":")); 
        let namespace = string::sub_string(&network_id, 0, idx_colon);
        let chain_id = string::sub_string(&network_id, idx_colon+1, string::length(&network_id));
        (namespace, chain_id)

    }


}
