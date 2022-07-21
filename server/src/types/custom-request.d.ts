import { Request } from 'express';

interface RequestWithUser extends Request {
  headers: {
    user: DecodedUser;
  };
}

interface RequestWithPost extends RequestWithUser {
  params: {
    id: number;
    commentId: number;
  };
}

export { RequestWithUser, RequestWithPost };
