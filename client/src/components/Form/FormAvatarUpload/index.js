import { Input, Typography, FormLabel } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useFormContext, Controller } from 'react-hook-form';
import { BigAvatar, Button, UploadIcon, DeleteIcon, CenteredContent } from './styles';

const FormAvatarUpload = ({ name, label, ...otherProps }) => {
  const [image, setImage] = useState(null);
  const theme = useTheme();
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange, ref, ...otherFieldProps }, fieldState: { error } }) => {
        const cleanup = () => {
          URL.revokeObjectURL(image);
          ref.current.value = null;
        };

        const handleSetImage = (newImage) => {
          if (image) {
            cleanup();
          }
          setImage(newImage);
        };

        const handleChange = (event) => {
          const newImage = event.target?.files?.[0];

          if (newImage) {
            handleSetImage(URL.createObjectURL(newImage));
          }
        };

        const handleClick = (event) => {
          if (image) {
            event.preventDefault();
            handleSetImage(null);
          }
        };
        return (
          <CenteredContent {...otherProps}>
            <FormLabel>{label}</FormLabel>
            <BigAvatar $withBorder alt='Avatar' src={image || undefined} theme={theme} />
            <label htmlFor={name}>
              <Input
                accept='image/jpeg, image/jpg, image/png, image/gif'
                hidden
                id={name}
                type='file'
                onChange={(event) => {
                  handleChange(event);
                  onChange(event);
                }}
                error={!!error}
                helperText={error ? error.message : undefined}
                ref={ref}
                {...otherFieldProps}
              />
              <Button variant='contained' color='primary' mb={2} onClick={handleClick}>
                {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
                {image ? 'Clean' : 'Upload'}
              </Button>
            </label>
            <Typography variant='caption' display='block' gutterBottom>
              To best results, use an image of at least 128 x 128 pixels in .jpg format.
            </Typography>
          </CenteredContent>
          // <CenteredContent>
          //   <BigAvatar $withBorder alt='Avatar' src={image || undefined} theme={theme} />
          //   <Input
          //     ref={inputFileRef}
          //     accept='image/*'
          //     hidden
          //     name={name}
          //     id={name}
          //     type='file'
          //     onChange={handleChange}
          //     required={required}
          //   />
          //   <label htmlFor={name}>
          //     <Button variant='contained' color='primary' component='span' mb={2} onClick={handleClick}>
          //       {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
          //       {image ? 'Clean' : 'Upload'}
          //     </Button>
          //   </label>
          //   <Typography variant='caption' display='block' gutterBottom>
          //     To best results, use an image of at least 128 x 128 pixels in .jpg format.
          //   </Typography>
          // </CenteredContent>
        );
      }}
      control={control}
      name={name}
    />
  );
};

export default FormAvatarUpload;
