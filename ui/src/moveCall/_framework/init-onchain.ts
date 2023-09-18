import * as package_1 from "../_dependencies/onchain/0x1/init";
import * as package_2 from "../_dependencies/onchain/0x2/init";
import * as package_ef981a72b31f7634e778393a7b048cf9622aa85bdb22bf1ee17a4f71e0fe6784 from "../_dependencies/onchain/0xef981a72b31f7634e778393a7b048cf9622aa85bdb22bf1ee17a4f71e0fe6784/init";
import * as package_b9f67019f1b3a558086a1439f131f988be4e1d45fea98c4be82cbb42a6e32fed from "../frostend/init";
import * as package_77211e3b92ef2c5af6dff7dac08483d41536e746187d9dd92152572ba8689b8 from "../stsui/init";
import {structClassLoaderOnchain as structClassLoader} from "./loader";

let initialized = false; export function initLoaderIfNeeded() { if (initialized) { return } initialized = true; package_1.registerClasses(structClassLoader);
package_2.registerClasses(structClassLoader);
package_77211e3b92ef2c5af6dff7dac08483d41536e746187d9dd92152572ba8689b8.registerClasses(structClassLoader);
package_b9f67019f1b3a558086a1439f131f988be4e1d45fea98c4be82cbb42a6e32fed.registerClasses(structClassLoader);
package_ef981a72b31f7634e778393a7b048cf9622aa85bdb22bf1ee17a4f71e0fe6784.registerClasses(structClassLoader);
 }
