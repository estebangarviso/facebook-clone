import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import GlobalContext from '../../context';
import { IconButton, Box, Typography } from '@mui/material';
import { Brightness7 as Brightness7Icon, Brightness4 as Brightness4Icon } from '@mui/icons-material';

const ThemeSwitcher = () => {
  const theme = useTheme();
  const { colorMode } = useContext(GlobalContext);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3
      }}>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Typography>{theme.palette.mode.toProperCase()} mode</Typography>
    </Box>
  );
};

export default ThemeSwitcher;
