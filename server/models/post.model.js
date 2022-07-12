import Entity from '../core/Entity.js';
import User from './user.model.js';

export default class Post extends Entity {
  get filePath() {
    return 'data/posts.json';
  }

  postId;
  /** @type {number} */
  userId;
  mdia;
  content;

  definition = {
    fields: {
      userId: {
        name: 'UserId',
        type: 'number',
        required: true
      },
      media: {
        name: 'Media',
        type: 'file',
        required: false,
        // can be: video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif
        regexp: /^video\/(mp4|mkv|avi|mov|flv|wmv|3gp|webm|ts|m4v)|image\/(jpeg|png|jpg|gif|bmp|heic|heif)$/
      },
      content: {
        name: 'Content',
        type: 'text',
        required: true,
        regexp: /^[a-zA-Z0-9 ]+$/
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

  constructor(params) {
    super();
  }

  create(params) {
    this.media = params.media;
    this.content = params.content;
    this.userId = params.userId;
    this.post();
  }

  validateBeforeAdd() {}
}
