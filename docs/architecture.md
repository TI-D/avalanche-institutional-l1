# Architecture

Northstar Capital runs a permissioned EVM Avalanche L1. Validators run AvalancheGo in private subnets. RPC is a separate tier. The P-Chain remains the source of truth for the validator set.

## Control plane

1. `CreateSubnetTx` creates the Subnet. The tx hash is the `subnetID` forever, including after L1 conversion.
2. `CreateChainTx` installs Subnet-EVM with the Northstar genesis.
3. `ConvertSubnetToL1Tx` converts the Subnet to an L1 and registers the initial validators with BLS keys.
4. `initializeValidatorSet` on `ValidatorManager` consumes the `SubnetToL1ConversionMessage` so contract state matches the P-Chain.

## Node roles

| Role | Binary | Public | Notes |
| --- | --- | --- | --- |
| Validator | AvalancheGo | No | Consensus + Warp signing. `http-host=127.0.0.1`. |
| Archive RPC | AvalancheGo | No | Debug/trace, audit queries. |
| Pruned RPC | AvalancheGo | No | Transaction intake. |
| Relayer | ICM relayer | No | Carries Teleporter messages to Settlement. |
| Jump | SSH bastion | Allowlisted | Only SSH ingress. |

This matches the topology promoted by [avalanche-deploy](https://github.com/ava-labs/avalanche-deploy): Terraform for VPC and hosts, Ansible for AvalancheGo, optional ValidatorManager init and ICM relayer.

## Why P-Chain still matters

ACP-77 moved validator *policy* onto the L1 (ValidatorManager). It did not move the *registry*. Anyone designing an institutional L1 who treats the P-Chain as optional will fail the first add-validator ceremony.
