import Entity from '../core/Entity.js';
import User from './user.model.js';

export default class Post extends Entity {
  get filePath() {
    return 'data/posts.json';
  }
  postId;
  title;
  content;
  userId;

  constructor(params) {
    super();
  }

  create(params) {
    this.title = params.title;
    this.content = params.content;
    this.userId = params.userId;
    this.post();
  }

  validateBeforeAdd() {
    if (!this.title) {
      throw new Error('Title is required');
    }
    if (!this.content) {
      throw new Error('Content is required');
    }
    if (!this.userId) {
      throw new Error('UserId is required');
    }
    // check if user exists
    const data = new User().readAll();
    if (!data.find((item) => item.userId === this.userId)) {
      throw new Error('User does not exist');
    }
  }
}
