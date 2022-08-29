import Search from './search.js'
import ItemInfoBar from './itemInfoBar.js'

function StatusBar({status, setStatus,itemInfo,setItemInfo}){
    return(
        <div style={{marginTop:"80px",zIndex:"3"}}>
            {status==="main" ? <Search setStatus={setStatus} setItemInfo={setItemInfo} itemInfo={itemInfo}/> : null}
            {status==="item" ? <ItemInfoBar setStatus={setStatus} itemInfo={itemInfo} setItemInfo={setItemInfo}/>: null}
        </div>
    )
}

export default StatusBar;