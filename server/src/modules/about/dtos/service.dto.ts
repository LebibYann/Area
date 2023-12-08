import { ActionDto } from "./action.dto";
import { ReactionDto } from "./reaction.dto";

export class ServiceDto {
    name: string;
    actions: ActionDto[];
    reactions: ReactionDto[];
}
