import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import '@altrix/shared-styles/_reset.scss';
import '@altrix/shared-styles/themes/reed/_theme.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
