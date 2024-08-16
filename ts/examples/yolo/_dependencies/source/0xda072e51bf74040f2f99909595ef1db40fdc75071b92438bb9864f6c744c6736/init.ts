import * as dwalletCap from "./dwallet-cap/structs";
import {StructClassLoader} from "../../../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(dwalletCap.DWalletCap);
loader.register(dwalletCap.DWalletNetworkApproveRequest);
loader.register(dwalletCap.DWalletNetworkInitCapRequest);
 }
