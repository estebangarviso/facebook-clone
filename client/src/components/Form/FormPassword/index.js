import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const FormPassword = ({ name, ...otherProps }) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Controller
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          error={!!error}
          type={showPassword ? 'text' : 'password'}
          required
          helperText={error ? error.message : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleClick} edge='end'>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          {...otherProps}
        />
      )}
      name={name}
      control={control}
    />
  );
};
export default FormPassword;
