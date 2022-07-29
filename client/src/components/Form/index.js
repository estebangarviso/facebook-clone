// https://react-hook-form.com/advanced-usage#FormProviderPerformance
import { useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormHelperText, Dialog, Alert } from '@mui/material';
import { useValidationResolver } from './../../custom-hook/useValidationResolver';
import { styled } from '@mui/material/styles';

const StyledForm = styled('form')``;

const Form = ({
  children,
  validationSchema,
  enterSubmit,
  onSuccess,
  serviceCallback,
  popUpError = false,
  ...otherProps
}) => {
  const resolver = useValidationResolver(validationSchema);
  const formRef = useRef();
  const methods = useForm({ resolver });
  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    setError(false);
    console.log('onSubmit from Form', data);
    try {
      const formData = new FormData(formRef.current);
      const res = await serviceCallback(formData);
      console.log('onSubmit from Form try', res);
      if (onSuccess) {
        if (res.success || res.status === 200) {
          console.log('onSuccess success', { res });
          onSuccess(res);
        }
      }
      if (res.status >= 400) {
        console.log('onSuccess error', { res });
        setError(res.data.message);
      }
      if (res.sucess || res.status === 200) {
        formRef?.current?.reset();
        methods.reset();
      }
    } catch (err) {
      console.log('onSubmit from Form catch', err);
      setError(err.message);
      throw err;
    }
  };

  const handleKeyPress = (e) => {
    if (!e.shiftKey && e.key === 'Enter' && enterSubmit) {
      e.preventDefault();
      formRef?.current?.submit();
    }
  };

  return (
    <FormProvider {...methods}>
      <StyledForm
        ref={formRef}
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyPress={handleKeyPress}
        noValidate
        {...otherProps}>
        {children}
      </StyledForm>
      {popUpError ? (
        <Dialog open={error} onClose={() => setError(false)}>
          <Alert severity='error'>{error}</Alert>
        </Dialog>
      ) : (
        <FormHelperText error={error}>{error}</FormHelperText>
      )}
    </FormProvider>
  );
};

export default Form;
