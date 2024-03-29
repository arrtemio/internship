import { PreloadedState } from '@reduxjs/toolkit';
import { RootState, setupStore } from 'app/store';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { BrowserRouter } from 'react-router-dom';

interface ComponentRenderOptions {
    initialState?: PreloadedState<RootState>;
}

export const componentRender = (component: ReactNode, options: ComponentRenderOptions = {}) => {
    const { initialState } = options;
    return render(
        <BrowserRouter>
            <Provider store={setupStore(initialState)}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </Provider>
        </BrowserRouter>,
    );
};
