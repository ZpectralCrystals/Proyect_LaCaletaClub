import React from 'react';
import Router from './Router/Router'; // Asegúrate que la ruta sea correcta
import SessionLoader from './components/SessionLoader/SessionLoader';

const App: React.FC = () => {
  return <>
      <SessionLoader />
      <Router />
    </>;
};

export default App;
