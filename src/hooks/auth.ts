import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsAuthenticated, selectIsAuthenticated } from 'store/authSlice';
import { storageService } from 'services';

export function useAuthInit() {
  const [isInitialized, setIsInitialized] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwtAccessToken = storageService.getJwtAccessToken();
    const isAuthenticated = jwtAccessToken !== null;

    dispatch(setIsAuthenticated(isAuthenticated));

    setIsInitialized(true);
  }, [dispatch]);

  return isInitialized;
}

export function useAuth() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  function login(jwtAccessToken: string) {
    storageService.setJwtAccessToken(jwtAccessToken);
    dispatch(setIsAuthenticated(true));
  }

  function logout() {
    storageService.setJwtAccessToken(null);
    dispatch(setIsAuthenticated(false));
  }

  return {
    isLoggedIn: isAuthenticated,
    login,
    logout
  }
}