import * as stsuiCoin from "./stsui-coin/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(stsuiCoin.STSUI_COIN);
 }
