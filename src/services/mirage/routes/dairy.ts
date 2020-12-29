import dayjs from "dayjs";
import { Request, Response } from "miragejs";
// import Diary from "../../../components/Diary";
import { Diary } from "../../../Interfaces/diary.interface";
import { User } from "../../../Interfaces/user.interface";
import { handleError } from "../server";

export const create = (
  schema: any,
  req: Request
): { user: User; diary: Diary } | Response => {
  try {
    const { title, type, userId } = JSON.parse(
      req.requestBody
    ) as Partial<Diary>;
    const exUser = schema.users.findBy({ id: userId });
    if (!exUser) {
      return handleError(null, "No such user exists.");
    }
    console.log("Ex User ", exUser);
    const now = dayjs().format();
    const diary = exUser.createDiary({
      title,
      type,
      createdAt: now,
      updatedAt: now,
    });
    console.log("To be dairy ", diary);
    return {
      user: {
        ...exUser.attrs,
      },
      diary: diary.attrs,
    };
  } catch (error) {
    return handleError(error, "Failed to create Diary.");
  }
};

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
  console.log(req.params.id);
  try {
    const user = schema.users.find(req.params.id);
    return user.diary as Diary[];
  } catch (error) {
    return handleError(error, "Could not get user diaries.");
  }
};
export const updateDiary = (schema: any, req: Request): Diary[] | Response => {
  try {
    const specificDiary = schema.diaries.find(req.params.id);
    const data = JSON.parse(req.requestBody);
    console.log("Update diary Content To be==>", data);
    specificDiary.update({
      ...data,
    });
    return specificDiary.attrs;
  } catch (err) {
    return handleError(err);
  }
};
