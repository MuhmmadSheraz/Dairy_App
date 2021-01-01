import dayjs from "dayjs";
import { Diary } from "../../../Interfaces/diary.interface";
import { Entry } from "../../../Interfaces/entry.interface";
import { EntryType } from "../../../types/types";
import { handleError } from "../server";
export const addEntry = (
  schema: any,
  req: any
): { diary: Diary; entry: Entry } | Response => {
  const { id } = req.params;
  const { title, content }: any = JSON.parse(
    req.requestBody
  ) as Partial<EntryType>;
  let specificDiary = schema.diaries.find(id);
  const now = dayjs().format();
  const entry = specificDiary.createEntry({
    title: title,
    content: content,
    createdAt: now,
    updatedAt: now,
    diaryId: id,
  });
  specificDiary.update({
    ...specificDiary.attrs,
    updatedAt: now,
  });
  return {
    diary: specificDiary.attrs,
    entry: entry.attrs,
  };
};
export const getEntries = (
  schema: any,
  req: any
): { entries: Entry[] } | Response => {
  const diary = schema.diaries.find(req.params.id);
  return diary.entry;
};
export const updateEntry = (schema: any, req: any) => {
  try {
    const entry = schema.entries.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<any>;
    const now = dayjs().format();
    entry.update({
      ...data,
      updatedAt: now,
    });
    return entry.attrs as Entry;
  } catch (error: any) {
    return handleError(error, "Failed to update entry.");
  }
};
