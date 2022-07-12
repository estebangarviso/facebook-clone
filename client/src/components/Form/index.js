// https://react-hook-form.com/advanced-usage#FormProviderPerformance
import { useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const Form = ({ children, useFormProps, enterSubmit, onSuccess, serviceCallback, ...otherProps }) => {
  const formRef = useRef();
  const methods = useForm(useFormProps);
  const onSubmit = async (data) => {
    try {
      const res = await serviceCallback(data);
      if (onSuccess) {
        console.log({ res });
        onSuccess(res);
      }
    } catch (err) {
      throw error;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && enterSubmit) {
      e.preventDefault();
      formRef.current.dispatchEvent(new Event('submit'));
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyPress={handleKeyPress}
        {...otherProps}
        noValidate
        ref={formRef}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
