import * as package_1 from "../_dependencies/onchain/0x1/init";
import * as package_2 from "../_dependencies/onchain/0x2/init";
import * as package_3af8a3597faf9e5a7eb48d4be3ce7a9493d5acea3b8630fb8be9bc8fde2a5ad6 from "../frostend/init";
import {structClassLoaderOnchain as structClassLoader} from "./loader";

let initialized = false; export function initLoaderIfNeeded() { if (initialized) { return }; initialized = true; package_1.registerClasses(structClassLoader);
package_2.registerClasses(structClassLoader);
package_3af8a3597faf9e5a7eb48d4be3ce7a9493d5acea3b8630fb8be9bc8fde2a5ad6.registerClasses(structClassLoader);
 }
