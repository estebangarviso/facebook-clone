interface IComment {
  commentId?: string;
  content?: string;
  userId?: string;
  postId?: string;
  replyTo: null | string;
  createdAt?: number;
  updatedAt: number | null;
}
