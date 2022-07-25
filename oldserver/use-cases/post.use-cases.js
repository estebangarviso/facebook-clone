import Post from '../models/post.model.js';
import User from '../models/user.model.js';

const withDB = (req, res, next) => {
    const post = new Post();
    const colletion = post.readAll();
};
const withoutDB = (req, res) => {
  const postEntity = new Post();
  const userEntity = new User();
  const posts = postEntity.readAll();
  const users = userEntity.readAll();

  const postsWithUser = posts.map((post) => {
    const user = users.find((user) => user.userId === post.userId);
    // Format createdAt to be more readable
    post.createdAt = Formatter.getTimeSince(post.createdAt);
    if (post.updatedAt) {
      post.updatedAt = Formatter.getTimeSince(post.updatedAt);
    }
    return {
      ...post,
      user: {
        name: user.name,
        avatar: user.avatar
      }
    };
  });
  return res.status(200).json(postsWithUser);
};

export default {
  withDB,
  withoutDB
};
