import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'constants/theme';
import './index.css';
import { store, persistor } from 'redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename="/goit-react-hw-08-phonebook">
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>{' '}
  </React.StrictMode>
);
