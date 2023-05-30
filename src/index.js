import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from 'components/App/App';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'constants/theme';
import './index.css';
import { store } from 'redux/store';
import { Provider } from 'react-redux';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Provider store={store}>
          <App />
        </Provider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
