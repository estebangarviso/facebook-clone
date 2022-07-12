import Entity from '../core/Entity.js';

export default class User extends Entity {
  get filePath() {
    return 'data/users.json';
  }
  avatar;
  name;
  email;
  password;

  definition = {
    fields: {
      avatar: {
        name: 'Avatar',
        type: 'file',
        required: false,
        regexp: /^.*\.(jpg|jpeg|png|gif)$/i
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

  constructor(params) {
    super();
  }

  create(params) {
    this.avatar = params.avatar;
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.post();
  }

  validateBeforeAdd() {}
}
