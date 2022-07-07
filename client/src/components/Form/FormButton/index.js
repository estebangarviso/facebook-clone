import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from '@mui/material';
import { Done, Error, BlurOn, MoreHoriz, ScheduleSend, Send } from '@mui/icons-material';

const FormButton = ({ children, ...otherProps }) => {
  const { formState } = useFormContext();
  return (
    <Button
      InputProps={{
        startAdornment: (
          <>
            {formState.isValidating === true ?? <MoreHoriz color='info' />}
            {formState.isSubmitting === true ?? <ScheduleSend color='info' />}
            {formState.isSubmitted === true ?? <Send color='info' />}
            {formState.isDirty === true ?? <BlurOn color='info' />}
            {formState.isValid === false ?? <Error color='error' />}
            {formState.isValid === true ?? <Done color='success' />}
          </>
        )
      }}
      {...otherProps}>
      {children}
    </Button>
  );
};
export default FormButton;
