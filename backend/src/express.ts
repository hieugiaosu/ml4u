import { Types } from "mongoose";
import { UserAccountStatusEnum, UserRoleEnum } from "./modules/user/enum/user.enum";

declare global {
  interface AuthUserInfo {
    sub: Types.ObjectId;
    accountStatus: UserAccountStatusEnum;
    role: UserRoleEnum;
  }
  namespace Express {
    interface Request {
      user?: AuthUserInfo;
    }
  }
}

export { };

