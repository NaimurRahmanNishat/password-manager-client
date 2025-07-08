const getBaseUrl = () => {
  return typeof window !== 'undefined' ? 'https://password-manager-server-five.vercel.app' : 'https://password-manager-server-five.vercel.app';
};

export { getBaseUrl };
