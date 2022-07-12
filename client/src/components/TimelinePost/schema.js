import * as yup from 'yup';

const schema = yup
  .object({
    userId: yup.string().required('UserId is required'),
    content: yup.string().required('Content is required'),
    media: yup.array().optional()
  })
  .required();

export default schema;
