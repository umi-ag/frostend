import * as bank from "./bank/structs";
import * as root from "./root/structs";
import * as stsuiCoin from "./stsui-coin/structs";
import * as vault from "./vault/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(stsuiCoin.STSUI_COIN);
loader.register(bank.Bank);
loader.register(vault.PTCoin);
loader.register(vault.YTCoin);
loader.register(vault.Vault);
loader.register(root.Root);
 }
