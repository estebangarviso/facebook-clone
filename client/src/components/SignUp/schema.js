import * as yup from 'yup';

const schema = yup
  .object({
    // avatar: yup.object().shape({
    //   name: yup.string().required(),
    //   type: yup.string().required(),
    //   size: yup.number().required(),
    // }).optional(),
    avatar: yup
      .string()
      .required()
      .matches(/\.(jpe?g|png|gif|bmp)$/i, 'File type is not valid (jpg, jpeg, png, gif, bmp)'),
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[a-zA-Z ]+$/, 'Name must contain only letters and spaces'),
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  })
  .defined();

export default schema;
