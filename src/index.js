import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { TranslationProvider } from './context/provider/TranslationContext';
import { NotificationProvider } from './context/provider/NotificationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <NotificationProvider>
  <TranslationProvider>
    <App />
  </TranslationProvider>
  </NotificationProvider>
  </BrowserRouter>
);

// For performance measurement (optional):
reportWebVitals();







// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import {BrowserRouter} from 'react-router-dom';
// // import { Provider } from 'react-redux';
// import reportWebVitals from './reportWebVitals';
// // import store from "./store"

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//   {/* <Provider store={store}> */}
//     <App />
//   {/* </Provider> */}
//   </BrowserRouter>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
