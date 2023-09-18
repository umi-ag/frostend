import * as package_1 from "../_dependencies/onchain/0x1/init";
import * as package_2 from "../_dependencies/onchain/0x2/init";
import * as package_fb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286 from "../frostend/init";
import {structClassLoaderOnchain as structClassLoader} from "./loader";

let initialized = false; export function initLoaderIfNeeded() { if (initialized) { return } initialized = true; package_1.registerClasses(structClassLoader);
package_2.registerClasses(structClassLoader);
package_fb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286.registerClasses(structClassLoader);
 }
