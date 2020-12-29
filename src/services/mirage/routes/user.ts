import { Request, Response } from "miragejs";
import { handleError } from "../server";
import { User } from "../../../Interfaces/user.interface";
import { randomBytes } from "crypto";

const generateToken = () => randomBytes(8).toString("hex");
export interface AuthResponse {
  token: string;
  user: User;
}
//        Login...
const login = (schema: any, req: Request): AuthResponse | Response => {
  console.log("Schema===>", schema);
  console.log("Schema Data Base From Login===>", JSON.parse(req.requestBody) );
  const { userName, password,email } = JSON.parse(req.requestBody);
  const user = schema.users.findBy({ userName }); // Will bring User Obj if Exits !
  if (!user) {
    return handleError(user, "No user with that username exists");
  }
  if (password !== user.password) {
    return handleError(null, "Incorrect Password, Please Try Again.");
  }
  const token = generateToken(); //Token Will Generate..

  return {
    user: user.attrs as User,
    token,
  };
};

//              Sign Up...
const signup = (schema: any, req: Request): any => {
  const data = JSON.parse(req.requestBody);
  const exUser = schema.users.findBy({ userName: data.userName });
  console.log("Sign Up Schema===>", schema.users);
  console.log("Sign Up data===>", data);
  console.log("found User", exUser);
  if (exUser) {
    return handleError(null, "A user with that username already exists.");
  }
  const user = schema.users.create(data);
  console.log("suspect User ==>",user)
  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
};
export default {
  login,
  signup,
};
