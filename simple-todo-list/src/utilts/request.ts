import axios from 'axios';
import config from 'configuration';

const requestUtils = axios.create({
  baseURL: config.apiUrl,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

type Response<S> = { success: true, data: S } | { success: false, error: any };

export const wrapRequest = async <T>(request: Promise<T>): Promise<Response<T>> => {
  try {
    const response = await request;
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

export default requestUtils;