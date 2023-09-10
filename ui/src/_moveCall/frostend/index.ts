import {
  TransactionArgument,
  TransactionBlock,
} from "@mysten/sui.js/transactions";
import { VerifierInputs } from "src/types";

/// https://suiexplorer.com/txblock/8uPByUMYANggyB3brbqFaNjpCPKe2AEpcMADy4TUMVCV?network=testnet

export const PACKAGE_ID =
  "0x7b8ac42e1ea99b33491b72630ad79f8a7da2acf6f84650d286e9cf928cf5506d";

export const STSUI_TREASURY_CAP =
  "0x2a5305b839da3b7d0776913d8c3b95bf342d1ed7b3fe001a693ab47778654cfc"


export const mintSTSUI = (props: {
  txb: TransactionBlock;
  volume: number;
}) => {
  const { txb } = props;
  const hero = txb.moveCall({
    target: `${PACKAGE_ID}::stsui_coin::mint`,
    arguments: [
      txb.pure(STSUI_TREASURY_CAP),
      txb.pure(BigInt(props.volume * 1e8))
    ],
  });
  return hero;
};

export const swapSyToPt = async (props: {
  txb: TransactionBlock;
  hero: any;
}) => {
  const { txb } = props;
  txb.moveCall({
    target: `${PACKAGE_ID}::zk_safe::offer`,
    typeArguments: [
      `${PACKAGE_ID}::my_hero::Hero`,
    ],
    arguments: [
    ],
  });
};

export const attachProofPolicy = async (props: {
  txb: TransactionBlock;
  type: string;
  policy_id: string;
  policy_cap_id: string;
}) => {
  const { txb } = props;
  txb.moveCall({
    target: `${PACKAGE_ID}::proof_policy::add`,
    typeArguments: [
      props.type,
    ],
    arguments: [
      txb.pure(props.policy_id),
      txb.pure(props.policy_cap_id),
    ],
  });
};

const verifiedInputsSample: VerifierInputs = {
  vk:
    "54960d14faa27bf4d825dd0330114cdd2048e9eeabb9f7193d0db8e01fb9d698df4981dea04c113061f759fc1c72af208d76121dbde37e386fc15a03d5dbda1d75c66a4e88b30b95abddb3343d76e7606ea5f8487b3eef24617c020d0c058e9e2798b037430bd315fd91bcac3119a3bcc2e8b82d06b3757e8dbf7734e2c81d13d5008c6bf2f11ffa7e2a8d63d50e726394b88ddc2b9349879b842f57851ff8931651c002158e71de0e7990d355e2759db47f41d1399cca287191025d6860e425b6ce53f78704e4e209834355b47b5326943a2a0eaa58b28e15c178295bd5d3870200000000000000ca390ca3f0c8b91d02b6a886c3d9b7bd625952cf060db1ef5444b188a2c1e0a192519c96d02885f1cc1a3a61400001777dc3580a225045259d1c87f23ba18307",
  public_inputs:
    "0000000000000000000000000000000000000000000000000000000000000000",
  proof_points:
    "77528f22ce98f070a2848d9842eb0f610d56dbb418f2341642ab6397781a1b08725cfdc49d0fffd2a0e8b72823623a267354c702877bdad2dbd86ff35e82ef00158c02075d2a256aecd7aaa95d189e6f45d7c0bc0cac91b745b8073da5ffff2f0d24d86e5f0efae1e1bd316ffcd3e6e9a3edcee17a5aaae27891fbc2834d7c15",
};

export const resolveProofPolicy = async (props: {
  txb: TransactionBlock;
  type: string;
  policy_id: string;
  transferRequest: TransactionArgument;
}) => {
  const { txb } = props;
  txb.moveCall({
    target: `${PACKAGE_ID}::proof_policy::prove`,
    typeArguments: [
      props.type,
    ],
    arguments: [
      txb.pure(props.policy_id),
      props.transferRequest,
      txb.pure(
        Array.from(Buffer.from(verifiedInputsSample.vk, "hex")),
        "vector<u8>",
      ),
      txb.pure(
        Array.from(Buffer.from(verifiedInputsSample.public_inputs, "hex")),
        "vector<u8>",
      ),
      txb.pure(
        Array.from(Buffer.from(verifiedInputsSample.proof_points, "hex")),
        "vector<u8>",
      ),
    ],
  });
};

export const resolveProofPolicyAndConfirmRequest = async (props: {
  txb: TransactionBlock;
  type: string;
  policy_id: string;
  transferRequest: TransactionArgument;
  verifierInputs: VerifierInputs;
}) => {
  const { txb } = props;
  txb.moveCall({
    target: `${PACKAGE_ID}::helpers::prove_and_claim`,
    typeArguments: [
      props.type,
    ],
    arguments: [
      txb.pure(props.policy_id),
      props.transferRequest,
      txb.pure(
        Array.from(Buffer.from(props.verifierInputs.vk, "hex")),
        "vector<u8>",
      ),
      txb.pure(
        Array.from(Buffer.from(props.verifierInputs.public_inputs, "hex")),
        "vector<u8>",
      ),
      txb.pure(
        Array.from(Buffer.from(props.verifierInputs.proof_points, "hex")),
        "vector<u8>",
      ),
    ],
  });
};

export const resolveProofPolicyAndConfirmRequestWithCorrectProof = async (
  props: {
    txb: TransactionBlock;
    type: string;
    policy_id: string;
    transferRequest: TransactionArgument;
  },
) => {
  resolveProofPolicyAndConfirmRequest({
    ...props,
    verifierInputs: verifiedInputsSample,
  });
};

/// SHOULD BE
// moveCallfrostend.resolveProofPolicy({
//   txb,
//   type: `${moveCallfrostend.PACKAGE_ID}::my_hero::Hero`,
//   policy_id: "0xf20628c5e1472acbf54b3c3635322922b2aec649fd77e593f245ea901d3c1d80",
//   transferRequest,
// })
// moveCallKiosk.confirmRequest(
//   txb,
//   `${moveCallfrostend.PACKAGE_ID}::my_hero::Hero`,
//   "0xf20628c5e1472acbf54b3c3635322922b2aec649fd77e593f245ea901d3c1d80", // policy_id
//   transferRequest,
// )

export const resolveProofPolicyAndConfirmRequestWithBrokenProof = async (
  props: {
    txb: TransactionBlock;
    type: string;
    policy_id: string;
    transferRequest: TransactionArgument;
  },
) => {
  const { txb } = props;
  txb.moveCall({
    target: `${PACKAGE_ID}::helpers::prove_and_claim`,
    typeArguments: [
      props.type,
    ],
    arguments: [
      txb.pure(props.policy_id),
      props.transferRequest,
      txb.pure([], "vector<u8>"),
      txb.pure([], "vector<u8>"),
      txb.pure([], "vector<u8>"),
    ],
  });
};
