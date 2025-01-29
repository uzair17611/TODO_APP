import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Custom hook to access authentication context.
 * Provides `user`, `token`, `login`, `signup`, `logout`, `isLoading`, and `error`.
 */
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
