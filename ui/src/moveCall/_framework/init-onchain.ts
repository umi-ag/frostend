import * as package_1 from "../_dependencies/onchain/0x1/init";
import * as package_2 from "../_dependencies/onchain/0x2/init";
import * as package_3 from "../_dependencies/onchain/0x3/init";
import * as package_ef981a72b31f7634e778393a7b048cf9622aa85bdb22bf1ee17a4f71e0fe6784 from "../_dependencies/onchain/0xef981a72b31f7634e778393a7b048cf9622aa85bdb22bf1ee17a4f71e0fe6784/init";
import * as package_fb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286 from "../frostend/init";
import * as package_19925dd737bfcf899f8eda836a204b4da661cbea40591610e73026a6b9f79b18 from "../sharbet/init";
import {structClassLoaderOnchain as structClassLoader} from "./loader";

let initialized = false; export function initLoaderIfNeeded() { if (initialized) { return } initialized = true; package_1.registerClasses(structClassLoader);
package_2.registerClasses(structClassLoader);
package_3.registerClasses(structClassLoader);
package_19925dd737bfcf899f8eda836a204b4da661cbea40591610e73026a6b9f79b18.registerClasses(structClassLoader);
package_ef981a72b31f7634e778393a7b048cf9622aa85bdb22bf1ee17a4f71e0fe6784.registerClasses(structClassLoader);
package_fb5075d2c8cee0810eab47d90ff41206dcbc1409b6fa404eafacbcd2aea61286.registerClasses(structClassLoader);
 }
