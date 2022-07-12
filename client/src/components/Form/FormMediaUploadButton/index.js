import { Input } from '@mui/material';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { PermMedia as PermMediaIcon } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Label = styled('label')``;

const FormMediaUploadButton = ({ name, label, iconProps, labelProps, ...otherProps }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState: { error } }) => {
        return (
          <Label htmlFor={name} {...labelProps}>
            <Input
              sx={{
                display: 'none'
              }}
              accept='video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif'
              hidden
              id={name}
              type='file'
              error={!!error}
              helperText={error ? error.message : undefined}
              {...field}
            />
            <IconButton color='primary' aria-label='upload picture' component='span' {...otherProps}>
              <PermMediaIcon {...iconProps} />
              {label && <Typography {...labelProps}>{label}</Typography>}
            </IconButton>
          </Label>
        );
      }}
      control={control}
      name={name}
    />
  );
};

export default FormMediaUploadButton;
