import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputBase } from '@mui/material';

const FormHiddenField = ({ name, value, ...otherProps }) => {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field, fieldState: { error } }) => (
        <InputBase type='hidden' helperText={error ? error.message : ''} error={!!error} {...field} {...otherProps} />
      )}
      name={name}
      control={control}
    />
  );
};
export default FormHiddenField;
