import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputBase, Dialog, Alert } from '@mui/material';

const FormInputBase = ({ name, ...otherProps }) => {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field, fieldState: { error } }) => (
        <>
          <InputBase error={!!error} {...field} {...otherProps} />
          <Dialog open={error}>
            <Alert severity='error'>{error ? error.message : ''}</Alert>
          </Dialog>
        </>
      )}
      name={name}
      control={control}
    />
  );
};
export default FormInputBase;
