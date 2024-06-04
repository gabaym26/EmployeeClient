// import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Body from './components/body/body';
import { createContext, useState } from 'react';

export const IsOpenned = createContext(null);

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const openned = { isOpened, setIsOpened };
  return (
    <div className="App">
    <IsOpenned.Provider value={openned}>
   <Header></Header>
   {/* <WorkersList></WorkersList> */}
    <Body></Body>
    </IsOpenned.Provider>
    </div>
  );
}

export default App;

