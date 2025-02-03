import { useState } from 'react';
import { useAuthenticationContext } from './useAuthenticationContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthenticationContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      // Store user info in local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update authentication context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
      // No need for navigation - Home.js will render automatically
    }
  };

  return { login, isLoading, error };
};
