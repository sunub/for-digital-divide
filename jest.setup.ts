import '@testing-library/jest-dom';
import { server } from './tests/server/node';

beforeAll(() => server.listen());
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());
