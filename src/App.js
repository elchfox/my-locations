import React from 'react';
import './App.scss';
import "./config/Global";
import { BrowserRouter } from "react-router-dom";
import { useLocalStore, useObserver } from "mobx-react";




import GeneralStore from "./Stores/GeneralStore";
import HomeScreen from './Pages/Home';

const StoreContext = React.createContext();


const StoreProvider = ({ children }) => {

  const General = useLocalStore(() => GeneralStore);
  const store = {General}

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};


function App() {
  return useObserver(() =>
  <StoreProvider>
    <BrowserRouter>
      <div className="App">
        <div className="mainLayout">
            <HomeScreen/>
        </div>
      </div>
    </BrowserRouter>
  </StoreProvider>
  
  );
}

export default App;
