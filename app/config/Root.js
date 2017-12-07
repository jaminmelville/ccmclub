import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGa from 'react-ga';
import App from '../components/App';

ReactGa.initialize('UA-110451547-1');

function logPageView() {
  ReactGa.set({ page: window.location.pathname + window.location.search });
  ReactGa.pageview(window.location.pathname + window.location.search);
}

logPageView();

const Root = () => {
  return (
    <Router onUpdate={logPageView}>
      <App />
    </Router>
  );
};

export default Root;
