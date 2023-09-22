import * as eth from "./eth/structs";
import * as sol from "./sol/structs";
import * as usdc from "./usdc/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(eth.ETH);
loader.register(eth.EventMint);
loader.register(eth.EventBurn);
loader.register(sol.EventMint);
loader.register(sol.EventBurn);
loader.register(sol.SOL);
loader.register(usdc.EventMint);
loader.register(usdc.EventBurn);
loader.register(usdc.USDC);
 }
