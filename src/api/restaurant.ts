import ky from 'ky';
import { Restaurant } from '../data/restaurant';

const apiUrl = import.meta.env.VITE_API_URL ?? 'https://sometesturl.com';

const client = ky.create({
  prefixUrl: `${apiUrl}/`,
});

export interface SearchResponse {
  total: number;
  business: Restaurant[];
}

export const searchRestaurants = async () => {
  const { total, business } = (await client
    .get('restaurants')
    .json()) as SearchResponse;
  return { total, business };
};

export const getRestaurant = async (id: string) => {
  const { total, business } = (await client
    .get('restaurants', {
      searchParams: {
        id,
      },
    })
    .json()) as SearchResponse;
  return { total, business };
};
