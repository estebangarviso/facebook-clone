import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

const FormTextField = ({ name, ...otherProps }) => {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field, fieldState: { error } }) => (
        <TextField helperText={error ? error.message : ''} error={!!error} {...field} {...otherProps} />
      )}
      name={name}
      control={control}
    />
  );
};
export default FormTextField;
