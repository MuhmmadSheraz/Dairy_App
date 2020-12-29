import dayjs from "dayjs";

export const addEntry = (schema: any, req: any) => {
  const { id } = req.params;
  console.log("Param Entry==>", id);
  const { title, content }: any = JSON.parse(req.requestBody);
  let specificDiary = schema.diaries.find(id);
  console.log("specificDiary===>", specificDiary);
  const now = dayjs().format();

  const entry = specificDiary.createEntry({
    title: title,
    content: content,
    createdAt: now,
    updatedAt: now,
  });
  console.log("entry==>", entry);
  specificDiary.update({
    ...specificDiary.attrs,
    updatedAt: now,
  });
  console.log("Scheema Entry===>", schema);
  return {
    diary: specificDiary.attrs,
    entry: entry.attrs,
  };
};
export const getEntries = (schema: any, req: any) => {
  const diary = schema.diaries.find(req.params.id);
  return diary.entry;
};
