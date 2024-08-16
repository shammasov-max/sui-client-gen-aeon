import * as test from "./test/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(test.Auth);
loader.register(test.ConfigTx);
 }
