export const URL =
  process.env.NODE_ENV === 'production'
    ? 'http://myProductionURL'
    : 'http://localhost:3001';
