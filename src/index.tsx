import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import { Provider } from 'react-redux';
import App from 'app/App';
import { setupStore } from 'app/store';
import { AppThemeProvider } from 'app/providers/AppThemeProvider';
import { ErrorAndLoadingProvider } from 'app/providers/ErrorAndLoadingProvider';

import 'app/firebase/index';
import 'shared/config/i18n/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={setupStore()}>
                <AppThemeProvider>
                    <ErrorAndLoadingProvider>
                        <App />
                    </ErrorAndLoadingProvider>
                </AppThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);
