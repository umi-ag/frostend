import * as package_1 from "../_dependencies/onchain/0x1/init";
import * as package_2 from "../_dependencies/onchain/0x2/init";
import * as package_165eacd90f3bfa192ccbe0fbd512898ea5db088220e3401e213514ec1d21d400 from "../frostend/init";
import {structClassLoaderOnchain as structClassLoader} from "./loader";

let initialized = false; export function initLoaderIfNeeded() { if (initialized) { return } initialized = true; package_1.registerClasses(structClassLoader);
package_2.registerClasses(structClassLoader);
package_165eacd90f3bfa192ccbe0fbd512898ea5db088220e3401e213514ec1d21d400.registerClasses(structClassLoader);
 }
