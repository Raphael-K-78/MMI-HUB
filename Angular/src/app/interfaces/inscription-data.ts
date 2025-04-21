import { CreatorData } from "./creator-data";
import { EventData } from "./event-data";

export interface InscriptionData {
    id: number;
    user: CreatorData;
    event: string;
}