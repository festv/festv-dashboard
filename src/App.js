import './App.css';
import Register from 'pages/register';
import { Text } from '@mantine/core';
function App() {
  return (
    <div className='app'>
      <Text align='center' component='h4'>Hello from festv.org</Text>
      <Register />
    </div>
  );
}

export default App;
