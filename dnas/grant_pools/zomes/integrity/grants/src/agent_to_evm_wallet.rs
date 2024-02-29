use hdi::prelude::*;
pub fn validate_create_link_agent_to_evm_wallet(
    _action: CreateLink,
    _base_address: AnyLinkableHash,
    _target_address: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    // TODO: validate agentpubkey and evm_wallet
    // try constructing Address from target bytes
    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_link_agent_to_evm_wallet(
    _action: DeleteLink,
    _original_action: CreateLink,
    _base: AnyLinkableHash,
    _target: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
