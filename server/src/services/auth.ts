import { User } from "../types/user";
import { issueToken } from "./jwtToken";
import { toUserFormat } from "../utils/formatUtils";
import { mongodbFindOne, mongodbInsert } from "../data-access/mongodb";

export const signin = async (userData: User) => {
  const isGuest: boolean = await isUserGuest(userData);

  if (isGuest) await signup(userData);

  const user = await mongodbFindOne("user", {
    email: userData.email,
  });

  const token = issueToken(user);

  return token;
};

//회원가입하여 사용자 DB에 추가
const signup = async (user: User) => {
  try {
    const data: User = toUserFormat(user);

    await mongodbInsert<User>("user", data);
  } catch (error) {
    console.log("회원가입 오류");
  }
};

//boolean, 사용자 DB에 사용자가 존재하는지 여부
const isUserGuest = async (user: User): Promise<boolean> => {
  const data = await mongodbFindOne(
    "user",
    { email: user.email },
    { projection: { _id: 1 } }
  );

  return !data;
};
