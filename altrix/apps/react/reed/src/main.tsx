import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import '@altrix/shared-styles/shared/_index.scss';

// import '@altrix/shared-styles/themes/base/_index.scss';
// import '@altrix/shared-styles/themes/alt/_index.scss';
import '@altrix/shared-styles/themes/reed/_index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
