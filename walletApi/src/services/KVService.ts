import axios from 'axios';

export class KVService {
  private kvUrl: string;
  private kvToken: string;

  constructor() {
    this.kvUrl = 'https://relieved-yeti-20930.upstash.io';
    this.kvToken = process.env.VERCEL_KV_TOKEN || 'AVHCAAIjcDFiMDk1ZjcxODljOGM0NzNlYjc2NzdlMDFlOWJhYjFmNnAxMA';
  }

  private async makeRequest(path: string): Promise<any> {
    try {
      const response = await axios.get(`${this.kvUrl}${path}`, {
        headers: {
          'Authorization': `Bearer ${this.kvToken}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  async getValue(key: string): Promise<string | null> {
    try {
      const data = await this.makeRequest(`/get/${key}`);
      return data.result;
    } catch (error) {
      console.error('Error in KVService.getValue:', error);
      return null;
    }
  }

  async setValue(key: string, value: string): Promise<void> {
    try {
      await this.makeRequest(`/set/${key}/${value}`);
    } catch (error) {
      console.error('Error in KVService.setValue:', error);
      throw error;
    }
  }
}
