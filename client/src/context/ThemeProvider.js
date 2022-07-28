import React, { useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from '../app/theme';
import { useSelector } from 'react-redux';

const ThemeProvider = ({ children, themeMode }) => {
  const mode = useSelector((state) => themeMode || state.theme);

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
