import { User } from "../Interfaces/user.interface";

export interface DiaryType {
  createdAt: string;
  entryIds: null;
  id: string;
  title: string;
  type: string;
  updatedAt: string;
  userId: string;
}
export interface EntryType {
  content: string;
  createdAt: string;
  diaryId: string;
  id: string;
  title: string;
  updatedAt: string;
}
export interface stateType {
  diaries: any;
  authReducer: {};
  dairyReducer: {
    diaries: [];
  };
  entryReducer: {};
  userReducer: {
    user: { User: any };
  };
}
