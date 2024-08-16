

module aeon_custody::errors {


    // TODO transform into funs 
    /// Errors
    const ENotAuthorized: u64=0;
    const EInvalidPointer: u64=1;
    const EWrongStatus: u64=2;
    const EInvalidExecution: u64=3;


    // TODO
    public fun not_authorized(): u64 {
        0
    }

    public fun invalid_module_id(): u64 {
        1
    }

    public fun effect_action_for_vault_not_authorized(): u64 {
        2
    }

}