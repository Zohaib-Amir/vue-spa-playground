import { setupWorker } from 'msw';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);

const hostAllowPattern = /^(fonts\.gstatic\.com)$/;
const pathAllowPattern = /^\/(node_modules|src)/;

export const start = () => {
  worker.start({
    onUnhandledRequest: ({ method, url }) =>
      hostAllowPattern.test(url.host) || pathAllowPattern.test(url.pathname)
        ? undefined
        : console.warn(`[MSW] Unhandled ${method} request to: ${url.href}`),
  });
};
