export interface User {
  id: string;
  name: string;
};

export function getUser(): Promise<User> {
  // Typically this will be a request to an API
  return Promise.resolve({ id: '1', name: 'David' });
};
