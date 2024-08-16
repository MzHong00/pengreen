import { type ObjectId } from "mongodb";

export interface Vote extends VoteForm {
  _id?: ObjectId;
  like_member: Array<string>;
  participant_member: Participant[];
  start_time: Date;
}

export interface VoteForm {
  title: string;
  choice: ChoiceItem[];
  max_choice: number;
  category: Category;
  description: string;
}

export type SortType = "like" | "participant" | "latest";
export type Category =
  | "음식"
  | "영화"
  | "음악"
  | "여행"
  | "스포츠"
  | "책"
  | "기술"
  | "게임"
  | "패션"
  | "건강"
  | "교육"
  | "비즈니스"
  | "경제"
  | "환경"
  | "사회"
  | "문화"
  | "예술"
  | "과학"
  | "우주"
  | "자동차"
  | "애완동물"
  | "취미"
  | "역사"
  | "인물"
  | "장소";

export interface ChoiceItem {
  content: string,
  count: number
}

export interface Participant {
  user_id: string;
  pick: Array<string>;
}

export interface Liker {
  _id?: ObjectId;
  user_id: string;
  vote_id: string;
}