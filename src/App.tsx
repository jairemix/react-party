import React from 'react';
import './App.css';
import { PartyManagementPage } from './party-management/party-management-page/party-management-page';

const App: React.FC = () => {
  return (
    <div className="App">
      <PartyManagementPage />
    </div>
  );
}

export default App;
