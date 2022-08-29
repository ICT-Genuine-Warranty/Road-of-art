function ItemInfo({itemInfo}){


    return(
        <div>
            <div><h3 style={{fontWeight:'bold'}}>{itemInfo.name}</h3></div>
            <div style={{display:'flex'}}>{itemInfo.detailedName}</div>
            <div style={{display:'flex'}}>제품 코드 : {itemInfo.itemId}</div>
            <div style={{display:'flex'}}>제작 시기 : {itemInfo.maked}</div>
            <div style={{display:'flex'}}>거래 횟수 : {itemInfo.tradeNum}</div>
            <div style={{display:'flex'}}>최초 판매자 : {itemInfo.firstSeller}</div>
            <div style={{display:'flex'}}>현재 소유자 : {itemInfo.owner}</div>
            <div><img  style={{width:'300px'}} src={`http://localhost:3065/image/getimg/${itemInfo.imageSrc}`}/></div>
        </div>
    )
}

export default ItemInfo;