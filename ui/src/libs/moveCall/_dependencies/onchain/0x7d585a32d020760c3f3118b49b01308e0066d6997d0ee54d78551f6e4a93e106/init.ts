import * as fixedPoint64 from "./fixed-point64/structs";
import {StructClassLoader} from "../../../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(fixedPoint64.FixedPoint64);
 }
