import './App.css';
import Register from 'pages/register';
import Login from 'pages/login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />
    }
  ])
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
