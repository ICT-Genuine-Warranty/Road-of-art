import { Alert, Button } from 'react-bootstrap'

function ItemInfoBar({ itemInfo, setItemInfo, setStatus }) {
    return (
        <Alert className='Search' style={{ backgroundColor: '#BCABC2', borderColor: "#BCABC2", position: 'fixed', width: '500px' }}>
            <div style={{ display: "flex" }}>
                <a style={{ display: 'flex', color: '#646464' }}>현재 조회중인 제품</a>
                <div style={{ paddingLeft: "5px", paddingRight: "5px", borderRadius: '5px', marginLeft: '305px', marginRight: '20px', backgroundColor: '#A797AD', color: '#000000', fontSize: "small" }}
                    onClick={() => { setItemInfo({}); setStatus("main") }}>
                    &lt;
                </div>
            </div>
            <div style={{ borderRadius: '5px', marginTop: "5px", marginLeft: '20px', marginRight: '20px', backgroundColor: '#ffffff', color: '#000000' }}>
                <h4>{itemInfo.name}</h4>
            </div>
            <a style={{ display: 'flex', color: '#646464' }}>세부 정보</a>
            <div style={{ borderRadius: '5px', marginLeft: '20px', marginRight: '20px', backgroundColor: '#DED5E0', color: '#000000' }}>
                <div style={{ display: 'flex', marginLeft: '8px' }}>세부 제품명 : {itemInfo.detailedName}</div>
                <div style={{ display: 'flex', marginLeft: '8px' }}>제조일 : {itemInfo.maked}</div>
                <div style={{ display: 'flex', marginLeft: '8px' }}>거래 횟수 : {itemInfo.tradeNum}</div>
                <div style={{ display: 'flex', marginLeft: '8px' }}>최초 판매점 : {itemInfo.firstSeller}</div>
                <div style={{ display: 'flex', marginLeft: '8px' }}>현재 소유자 : {itemInfo.owner}</div>
            </div>

        </Alert>
    )
}

export default ItemInfoBar;