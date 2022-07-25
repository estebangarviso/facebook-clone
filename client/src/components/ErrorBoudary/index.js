import React, { Component } from 'react';
import { Paper, Typography } from '@mui/material';
import { Error } from '@mui/icons-material';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper elevation={3} style={{ padding: '1rem', margin: '1rem' }}>
          <Typography variant='h6' color='error'>
            <Error />
            <span>Something went wrong.</span>
            {this.state.error && (
              <>
                <pre>{this.state.error?.message}</pre>
                <pre>{this.state.error?.stack}</pre>
              </>
            )}
          </Typography>
        </Paper>
      );
    }

    return this.props.children;
  }
}
