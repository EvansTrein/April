import axios, { type AxiosInstance } from 'axios';
import { type City } from '~/types/city';
import type { Links } from '~/types/city';

const BASE_URL = 'https://wft-geo-db.p.rapidapi.com';
let path = 'v1/geo/cities?minPopulation=1&limit=10';

export class ApiCities {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'x-rapidapi-key': 'cc7f9748bamshfe43ea2a67a7b21p1a4ed8jsna87cf540262d',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      },
    });
  }

  async getCities(): Promise<City[]> {
    try {
      const response = await this.axiosInstance.get(path);

      if (response.data.links && Array.isArray(response.data.links)) {
        const nextLink = response.data.links.find((link: Links) => link.rel === 'next');

        if (nextLink && nextLink.href) {
          path = nextLink.href;
          console.log('Updated path:', path);
        } else {
          console.warn('No "next" link found in the response.');
					return []
        }
      }

			console.log(response)
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch cities:', error);
      throw error;
    }
  }
}
