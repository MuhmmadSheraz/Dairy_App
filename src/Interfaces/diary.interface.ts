export interface Diary {
  id?: any;
  title: string;
  type: "private" | "public";
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  entryIds: string[] | null;
}
