
import { useAuthInit } from 'hooks/auth';
import RouteConfig from './routing/RouteConfig';

function App() {
  const authIsInitialized = useAuthInit();

  if (!authIsInitialized) {
    return (
      <div>Инициализация...</div>
    );
  }

  return (
    <RouteConfig />
  );
}

export default App;
