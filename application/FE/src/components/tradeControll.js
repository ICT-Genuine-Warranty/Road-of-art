import Trade from "./trade_buy"
import TradeSell from "./trade_sell"

function TradeControll({userInfo,itemInfo}){
    if(userInfo==undefined){
        return (
            <div>로그인을 먼저 해주세요.</div>
        )
    }

    return(
        <div>{itemInfo.ownerId==userInfo.id ?  <TradeSell itemInfo={itemInfo}/> : <Trade itemInfo={itemInfo} userInfo={userInfo}/>}</div>
    )
}

export default TradeControll