import Entity from '../core/Entity.js';
import User from './user.model.js';

export default class Comment extends Entity {
  get filePath() {
    return 'data/comments.json';
  }

  content;
  userId;
  postId;
  replyTo = null;

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

  constructor(params) {
    super();
  }

  

  validateBeforeAdd() {}
}
