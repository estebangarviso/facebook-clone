interface IPost {
  postId?: string;
  userId?: string;
  title?: string;
  content?: string;
  createdAt?: number;
  updatedAt: number | null;
}
