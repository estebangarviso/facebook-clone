import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@mui/material';
import { Done, Error, MoreHoriz, ScheduleSend, Send } from '@mui/icons-material';

const FormButton = ({ children, color, animated, ...otherProps }) => {
  const { formState } = useFormContext();

  const Icon = () => {
    const { isSubmitting, isValidating, isValid, isSubmitted, isSubmitSuccessful } = formState;
    if (isSubmitting) {
      return <ScheduleSend />;
    }
    if (isValidating) {
      return <MoreHoriz />;
    }
    if (isSubmitted && isValid && !isSubmitSuccessful) {
      return <Done />;
    }
    if (isSubmitted && !isValid && !isSubmitSuccessful) {
      return <Error />;
    }
    return <Send />;
  };

  const handleColor = () => {
    const { isValidating, isValid, isSubmitSuccessful, isSubmitted } = formState;
    if (isValidating) {
      return 'secondary';
    }
    if (isSubmitted && isValid && !isSubmitSuccessful) {
      return 'success';
    }
    if (isSubmitted && !isValid && !isSubmitSuccessful) {
      return 'error';
    }
    return color || 'primary';
  };

  return animated ? (
    <Button
      endIcon={<Icon />}
      // disabled={formState.isDirty === false || formState.isValid === false}
      color={handleColor()}
      {...otherProps}>
      {children}
    </Button>
  ) : (
    <Button {...otherProps}>{children}</Button>
  );
};
export default FormButton;
