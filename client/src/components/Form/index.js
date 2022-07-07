// https://react-hook-form.com/advanced-usage#FormProviderPerformance
import { useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const Form = ({ children, useFormProps, enterSubmit, onSuccess, serviceCallback, ...otherProps }) => {
  const formRef = useRef();
  const methods = useForm(useFormProps);
  const onSubmit = (data) => console.log(data);
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   let form = e.target;
  //   // Check if not a HTMLFormElement
  //   if (!(form instanceof HTMLFormElement)) form = e.target.form;
  //   if (!(form instanceof HTMLFormElement)) throw new Error('Form element not found');

  //   // https://developer.mozilla.org/en-US/docs/Web/API/FormData
  //   const data = new URLSearchParams();

  //   for (const [key, value] of new FormData(form).entries()) {
  //     data.append(key, value);
  //   }

  //   serviceCallback(data);
  // };

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
