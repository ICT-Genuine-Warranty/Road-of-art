import line from './img/line.png'
import {Button} from 'react-bootstrap'

function InfoWithHistory({data, setIsDetail, setChosenData}){
    return(
        <div style={{display:"flex"}}>
            <div style={{display:"block", width:"100px", marginTop:"8px"}}>
                {data.traded}
            </div>
            <div>
                <img src={line} height={'100px'}/>
            </div>
            <div  style={{display:"block", marginTop:"8px"}}>
                <div style={{display:"flex"}}>
                    <div><h5 style={{fontWeight:"bold"}}>{data.type}</h5></div>
                    <div style={{marginLeft:"20px"}}><Button style={{backgroundColor:"#cfcfcf", color:"#ffffff"}}variant="light" size="sm"
                    onClick={()=>{setChosenData(data);setIsDetail(true)}}>
                        정보 더보기</Button></div>
                </div>
                <div style={{display:"flex"}}>
                    판매자: {data.seller}
                </div>
                <div style={{display:"flex"}}>
                    구매자 : {data.buyer}
                </div>
            </div>
        </div>
    )
}

export default InfoWithHistory;