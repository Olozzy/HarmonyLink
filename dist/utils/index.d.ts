import { HarmonyLinkConfiguration } from "../typings/HarmonyLink";
import { NodeGroup, NodeOptions } from "../typings/node";
export declare function parseOptions(options: NodeGroup, harmonyLinkOptions: HarmonyLinkConfiguration): Required<NodeOptions>;
export declare function snakeToCamel<T>(obj: Record<string, any>): Record<string, unknown> | T;
export declare function camelToSnake(obj: Record<string, unknown>): Record<string, unknown>;
