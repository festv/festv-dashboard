import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider 
    theme={{
      colorScheme: 'dark',
      colors: {
        dark: ["#4adceb", "#fff", "#fff", "#406981", "#008C86", "#203746", "#234156", "#052a3a", "#000", "#000"],
        main: ['#fff', '#53ddd6', '#1ea494', '#1ea494', '#4adceb', '#1ea494', '#1ea494', '#1ea494', '#1b766c','#1ea494' ],
      },
      primaryColor: 'main'
    }}
    withGlobalStyles 
    withNormalizeCSS
  >
    <App />
  </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
