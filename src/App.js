import './App.css';
import Register from 'pages/register';
import Login from 'pages/login';
import { createHashRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createHashRouter([{
    path: "/",
    // element: <h2>Hello World</h2>,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }])
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
