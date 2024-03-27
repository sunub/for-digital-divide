import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import { setupWorker } from 'msw/browser';

// export const server = setupWorker(...handlers);
export const server = setupServer(...handlers);
