import * as yup from 'yup';

const schema = yup
  .object({
    content: yup.string().required('Content is required'),
    replayId: yup.string().optional()
    // media: yup.array().optional()
  })
  .required();

export default schema;
