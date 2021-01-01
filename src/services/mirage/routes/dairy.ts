import dayjs from "dayjs";
import { Request, Response } from "miragejs";
import { useSelector } from "react-redux";
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
    const now = dayjs().format();
    const diary = exUser.createDiary({
      title,
      type,
      createdAt: now,
      updatedAt: now,
      userId,
    });
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
  try {
    const user = schema.users.find(req.params.id);
    return user.diary as Diary[];
  } catch (error) {
    return handleError(error, "Could not get user diaries.");
  }
};
export const updateDiary = (schema: any, req: Request): Diary[] | Response => {
  try {
    const diary = schema.diaries.find(req.params.id);
    const data = JSON.parse(req.requestBody);
    diary.update({
      ...data,
    });
    return diary.attrs;
  } catch (err) {
    return handleError(err);
  }
};
