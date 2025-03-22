export const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' || import.meta.env.MODE_ENV === 'devtest';
