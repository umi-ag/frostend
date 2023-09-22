import * as eventEmit from "./event-emit/structs";
import * as shasui from "./shasui/structs";
import * as stakeManager from "./stake-manager/structs";
import * as unstsui from "./unstsui/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(eventEmit.EventDebug);
loader.register(eventEmit.EventVector);
loader.register(stakeManager.StakeProfile);
loader.register(shasui.EventMint);
loader.register(shasui.EventBurn);
loader.register(shasui.SHASUI);
loader.register(unstsui.UNSTSUI);
loader.register(unstsui.UNSTSUI_COIN);
loader.register(unstsui.UnstakeTicket);
loader.register(unstsui.UnstSuiTreasuryCap);
 }
