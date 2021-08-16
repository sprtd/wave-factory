import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from "./components/global-style/global-style";
import ContractContextProvider from './contexts/contract-functions.context';
import UserAccountContextProvider from './contexts/user-account.context';


ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <UserAccountContextProvider>
      <ContractContextProvider>
        <App />

      </ContractContextProvider>
    </UserAccountContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

