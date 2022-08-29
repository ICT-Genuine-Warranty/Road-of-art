import Preview from "../components/preview";
import ItemPage from "./itemPage";
import SignPage from "./sign";

function Main({status,setStatus,setUserInfo,userInfo,itemInfo}){
       return(
        <div style={{zIndex:"1"}}>
            {status==="main" ? <Preview/>:null}
            {status==="item" ? <ItemPage itemInfo={itemInfo} userInfo={userInfo}/>:null}
            {status==="sign" ? <SignPage userInfo={userInfo} setUserInfo={setUserInfo} setStatus={setStatus}/>:null}

        </div>
       )
}

export default Main;