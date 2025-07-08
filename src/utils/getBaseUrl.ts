const getBaseUrl = () => {
  return typeof window !== 'undefined' ? 'http://localhost:8000' : 'http://localhost:8000';
};

export { getBaseUrl };
