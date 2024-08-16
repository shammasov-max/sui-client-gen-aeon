import * as package_0 from "../_dependencies/source/0x0/init";
import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_963b0d62872089ae28a2f3046a9d547d357681d32958f8769f4e5c37cdc8fe52 from "../aeon-custody/init";
import * as package_2 from "../sui/init";
import {structClassLoaderSource as structClassLoader} from "./loader";

let initialized = false; export function initLoaderIfNeeded() { if (initialized) { return }; initialized = true; package_0.registerClasses(structClassLoader);
package_1.registerClasses(structClassLoader);
package_2.registerClasses(structClassLoader);
package_963b0d62872089ae28a2f3046a9d547d357681d32958f8769f4e5c37cdc8fe52.registerClasses(structClassLoader);
 }
