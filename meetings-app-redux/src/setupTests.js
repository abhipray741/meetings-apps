import '@testing-library/jest-dom';
import server from './mocks/server';

beforeAll(() => server.listen());

// after the last test completes...
afterAll(() => server.close());