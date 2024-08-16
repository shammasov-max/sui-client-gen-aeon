

module aeon_custody::registration {
    use std::vector;
    use sui::tx_context::{Self,TxContext};
    use sui::object::{Self, ID, UID};
    use sui::bag::{Self,Bag};
    use sui::event::{Self};
    use std::string::{Self,String};
    use sui::vec_map::{Self,VecMap};
    use sui::vec_set::{Self, VecSet};


    use std::option::{Self,Option};
    use aeon_custody::vault::{Self,Vaults, VaultProfile};
    use aeon_custody::user::{Self,Users,Role,User,UserGroup,UserCap};
    use aeon_custody::address_book::{Self, AddressBook};
    use aeon_custody::policy::{Self,Policy, PolicyRule, PolicyResult};
    use aeon_custody::proposal::{Self, Proposal};
    use aeon_custody::module_interface::{Self, ModuleActionRequest, ModuleActionResult,TxEffectsResult,TxEffects, InitVaultContainerRequest};
    use aeon_custody::settings::{Self, WorkspaceSettings};
    use aeon_custody::errors::{Self};
    use aeon_custody::library::{Self};
        use sui::address;
    use sui::ecdsa_k1;
    use sui::hash;
    use sui::hex;



    /// @param signature: A 65-bytes signature in form (r, s, v) that is signed using
    /// Secp256k1. Reference implementation on signature generation using RFC6979:
    /// https://github.com/MystenLabs/narwhal/blob/5d6f6df8ccee94446ff88786c0dbbc98be7cfc09/crypto/src/secp256k1.rs
    /// The accepted v values are {0, 1, 2, 3}.
    /// see also: https://mystenlabs.com/blog/cryptography-in-sui-cross-chain-signature-verification    
    public fun verify_signature_evm(
        user_address: vector<u8>,
        init_cap_holder_address_opt: Option<address>,
        approve_cap_holder_address_opt: Option<address>,
        approve_cap_holder_public_key_opt: Option<vector<u8>>,
        signature: &vector<u8>
    ): bool {
        let mut msg = b"Link your accounts:\nBrowser:0x";
        let mut raw_msg = b"\x19Ethereum Signed Message:\n";

        // Append the init cap holder address if present
        if (option::is_some(&init_cap_holder_address_opt)) {
            vector::append(&mut msg, hex::encode(address::to_bytes(*init_cap_holder_address_opt.borrow())));
        };

        // Append approve cap holder details if present
        if (option::is_some(&approve_cap_holder_address_opt) && option::is_some(&approve_cap_holder_public_key_opt)) {
            let approve_cap_holder_address = option::borrow(&approve_cap_holder_address_opt);
            let approve_cap_holder_public_key = option::borrow(&approve_cap_holder_public_key_opt);

            vector::append(&mut msg, b"\nMobile Address:0x");
            vector::append(&mut msg, hex::encode(address::to_bytes(*approve_cap_holder_address)));
            vector::append(&mut msg, b"\nMobile Public key:0x");
            vector::append(&mut msg, hex::encode(*approve_cap_holder_public_key));
        };

        // Append the hashed messages
        vector::append(&mut raw_msg, b"263"); // length of msg -> always the same
        vector::append(&mut raw_msg, msg);

        // 1. Recover secp256k1 public key from signature
        let pubkey = ecdsa_k1::secp256k1_ecrecover(signature, &raw_msg, 0);

        //2. Uncompress
        let uncompressed = ecdsa_k1::decompress_pubkey(&pubkey);

        //3. Take the last 64 bytes
        let mut uncompressed_64 = vector::empty<u8>();
        let mut i = 1;
        while (i < 65) {
            let value = vector::borrow(&uncompressed, i);
            vector::push_back(&mut uncompressed_64, *value);
            i = i + 1;
        };

        // Hash it with keccak
        let mut hashed = hash::keccak256(&uncompressed_64);

        // Take the last 20 bytes
        let mut recovered_address = vector::empty();
        let mut i = 0;
        while (i < 20) {
            vector::push_back(&mut recovered_address, vector::pop_back(&mut hashed));
            i = i + 1;
        };
        vector::reverse(&mut recovered_address);

        // Verify the recovered address matches the expected user address
        return recovered_address == user_address
    }




}
