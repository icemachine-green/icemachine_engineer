import { createRoot } from 'react-dom/client';
import Router from "./routes/Router.jsx";
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import swRegister from './swRegister.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router />
  </Provider>
);

// 서비스 워커 등록 처리
swRegister();