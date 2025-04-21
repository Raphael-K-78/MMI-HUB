import { CreatorData } from "./creator-data";

export interface CommentData {
    id_comment: number;
    content: string;
    user: CreatorData;
}