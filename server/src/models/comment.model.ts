import Entity from '../core/Entity.js';
import User from './user.model.js';

export default class Comment extends Entity implements IComment {
  get filePath() {
    return 'data/comments.json';
  }

  content?: string;
  userId?: string;
  postId?: string;
  replyTo: null | string = null;

  get definition() {
    return {
      fields: {
        content: {
          name: 'Content',
          type: 'text',
          required: true,
          regexp: /^[a-zA-Z0-9 ]+$/
        },
        userId: {
          name: 'UserId',
          type: 'number',
          required: true
        },
        postId: {
          name: 'PostId',
          type: 'number',
          required: true
        },
        replyTo: {
          name: 'ReplyId',
          type: 'string',
          required: false
        }
      },
      relations: {
        user: {
          type: 'one',
          model: User,
          foreignKey: 'userId'
        }
      }
    };
  }

  constructor() {
    super();
  }

  create(params: any) {
    this.content = params.content;
    this.userId = params.userId;
    this.postId = params.postId;
    this.replyTo = params.replyTo || this.replyTo;
    this.save();
  }

  validateBeforeAdd() {}
}
