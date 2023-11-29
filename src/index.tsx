import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';
import App from 'app/App';
import { setupStore } from 'app/store';
import { AppThemeProvider } from 'app/providers/AppThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <Provider store={setupStore()}>
            <AppThemeProvider>
                <App />
            </AppThemeProvider>
        </Provider>
    </React.StrictMode>,
);
