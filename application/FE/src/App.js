import {useState} from 'react'
import Main from './pages/main.js';
import StatusBar from './components/statusBar';
import Header from './components/header.js';
import './App.css';

function App() {
  const [status, setStatus] = useState("main");
  const [itemInfo,setItemInfo] = useState("");
  const [tradeInfos, setTradeInfos] = useState("");
  const [userInfo,setUserInfo] = useState();

  return (
    <div className="App">
      <Header setStatus={setStatus} userInfo={userInfo} setUserInfo={setUserInfo}/>
        <StatusBar status={status} setStatus={setStatus} itemInfo={itemInfo} setItemInfo={setItemInfo}/>
        
        <div className='components'>
          <Main userInfo={userInfo} setUserInfo={setUserInfo} status={status} setStatus={setStatus} tradeInfos={tradeInfos} setTradeInfos={setTradeInfos} itemInfo={itemInfo}/>
        </div>

    </div>
  );
}

export default App;
