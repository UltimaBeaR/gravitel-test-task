import { useEffect } from 'react';
import { useAppDispatch } from 'hooks';
import { setIsAuthenticated } from 'store/authSlice';
import { storageService } from 'services';
import Layout from './Layout';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwtAccessToken = storageService.getJwtAccessToken();
    const isAuthenticated = jwtAccessToken !== null;

    dispatch(setIsAuthenticated(isAuthenticated));
  }, [ dispatch ]);

  return (
    <Layout />
  );
}

export default App;
