import { ActionInt } from "./action.interface";
import { ReactionInt } from "./reaction.interface";

export class ServiceInt {
    name: string;
    actions: ActionInt[];
    reactions: ReactionInt[];
}