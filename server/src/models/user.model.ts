import Entity from '../core/Entity.js';

export default class User extends Entity implements IUser {
  get filePath() {
    return 'data/users.json';
  }
  avatar?: string;
  name?: string;
  email?: string;
  password?: string;

  get definition() {
    return {
      fields: {
        avatar: {
          name: 'Avatar',
          type: 'file',
          uploadFolder: 'avatars',
          required: false,
          // can be: image/*, image/heic, image/heif
          regexp: /^image\/(jpeg|png|jpg|gif|bmp|heic|heif)$/
        },
        name: {
          name: 'Name',
          type: 'name',
          required: true,
          regexp: /^[a-zA-Z ]+$/
        },
        email: {
          name: 'Email',
          type: 'email',
          required: true,
          regexp:
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        },
        password: {
          name: 'Password',
          type: 'password',
          required: true,
          regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        }
      }
    };
  }

  constructor() {
    super();
  }

  validateBeforeAdd() {}
}
