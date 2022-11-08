import { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { UserContext } from './Contexts/UserContext';
import router from './Router/Routes/Routes';
import { onAuthStateChangedListener } from './utils/firebase.utils';

function App() {
  const { setUser, setLoading } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <div className='max-w-screen-xl mx-auto'>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
