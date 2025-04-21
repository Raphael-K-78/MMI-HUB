import { CreatorData } from "./creator-data";

export interface EventData {
  id_event: number;
  nom: string;
  img: string;
  date: string;
  content: string;
  creator: CreatorData;
  lieu: string;
  ville: string;
}
