import { rest } from 'msw';
import dataFile from './data.json';

export const handlers = [
  rest.get('https://sometesturl.com/restaurants', (req, res, ctx) => {
    const result = dataFile.data.search;
    return res(ctx.status(200), ctx.json(result), ctx.delay(2000));
  }),
];
