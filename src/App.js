import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReacTotronConfig';
import Header from './components/Header/index';
import StyledGlobal from './styles/global';
import history from './services/history';
import Routes from './routes';
import store from './store/index';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <StyledGlobal />
        <Header />
        <Routes />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}
