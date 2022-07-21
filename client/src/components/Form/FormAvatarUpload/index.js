import { Badge, IconButton, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useFormContext, Controller } from 'react-hook-form';
import { BigAvatar, Button, UploadIcon, DeleteIcon } from './StyledComponents';
import { Box } from '@mui/material';

const FormAvatarUpload = ({ name, label, ...otherProps }) => {
  const [avatar, setAvatar] = useState('');
  const theme = useTheme();
  const { control, setValue } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState: { error } }) => {
        const handleReset = () => {
          setValue(name, '');
          setAvatar('');
        };

        const handleChange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target.result; // blob://adadasdasd
            setAvatar(dataUrl);
          };
          reader.readAsDataURL(file);

          return field.onChange(e);
        };

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Badge
              badgeContent={
                field.value ? (
                  <IconButton onClick={handleReset}>
                    <DeleteIcon />
                  </IconButton>
                ) : null
              }>
              <BigAvatar src={avatar || undefined} $withBorder theme={theme} />
            </Badge>
            <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            <Button
              color='primary'
              aria-label='upload picture'
              component='label'
              {...otherProps}
              disabled={!!field.value}>
              <input hidden accept='image/*, image/heic, image/heif' type='file' {...field} onChange={handleChange} />
              <UploadIcon mr={2} />
              Upload
            </Button>
          </Box>
        );
      }}
      control={control}
      name={name}
    />
  );
};

export default FormAvatarUpload;
