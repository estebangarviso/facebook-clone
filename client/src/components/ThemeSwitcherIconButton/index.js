import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import GlobalContext from '../../context';
import { IconButton, Typography } from '@mui/material';
import { Brightness7 as Brightness7Icon, Brightness4 as Brightness4Icon } from '@mui/icons-material';

const ThemeSwitcherIconButton = ({ hideText, otherProps }) => {
  const theme = useTheme();
  const { colorMode } = useContext(GlobalContext);
  return (
    <>
      <IconButton size='large' aria-label='theme switcher' color='inherit' onClick={colorMode.toggleColorMode}>
        {' '}
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      {!hideText && <Typography component='p'>{theme.palette.mode.toProperCase()} mode</Typography>}
    </>
  );
};
// {!hideText && <Typography component='p'>{theme.palette.mode.toProperCase()} mode</Typography>}

export default ThemeSwitcherIconButton;
