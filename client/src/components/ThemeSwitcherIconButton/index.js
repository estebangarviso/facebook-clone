import React from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material';
import { Brightness7 as Brightness7Icon, Brightness4 as Brightness4Icon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../app/store/themeSlice';

const ThemeSwitcherIconButton = ({ hideText, otherProps }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <>
      <IconButton size='large' aria-label='theme switcher' color='inherit' onClick={() => dispatch(toggleTheme())}>
        {' '}
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      {!hideText && <Typography component='p'>{theme.palette.mode.toProperCase()} mode</Typography>}
    </>
  );
};
// {!hideText && <Typography component='p'>{theme.palette.mode.toProperCase()} mode</Typography>}

export default ThemeSwitcherIconButton;
