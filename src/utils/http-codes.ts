export type StatusCode = 200 | 400 | 401 | 404 | 409 | 500;

export const Codes = {
  200: 'OK',
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server Error'
} as { [code in StatusCode]: string };
