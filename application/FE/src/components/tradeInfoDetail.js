import {useEffect} from 'react'

function TradeInfoDetail({data,setIsDetail}){
    console.log(`http://localhost:3065/image/getimg/${data.comments.sellersComment.commentURI}`)
    return(
        <div>
            <div style={{ width:"80px", marginBottom:"10px",paddingLeft:"5px",paddingRight:"5px", borderRadius:'5px', marginLeft:'420px', marginRight:'20px', backgroundColor:'#E9E9E9', color:'#888888', fontSize:"small"}}
             onClick={()=>{setIsDetail(false)}}>
                &lt; 뒤로가기
            </div>
            <div style={{ backgroundColor:"#E9E9E9", width:'500px', borderRadius:'5px'}}>
                <div>거래 방식:{data.type}</div>
                <div>구매자:{data.seller}</div>
                <div>판매자:{data.buyer}</div>
                <div>사용 플랫폼:{data.platform}</div>
                <div>거래 날짜:{data.traded}</div>
            </div>
            <div style={{ marginTop:"30px", backgroundColor:"#E9E9E9", width:'500px', borderRadius:'5px'}}>
                <div style={{ marginLeft:"10px",  display:"flex", fontWeight:"bold"}}>판매자 : {data.comments.sellersComment.owner}</div>
                <div style={{ marginLeft:"10px",  display:"flex"}}> {data.comments.sellersComment.content}</div>
                <div><img style={{marginBottom:"30px", width:"300px"}} src={`http://localhost:3065/image/getimg/${data.comments.sellersComment.imgSrc}`}/></div>
            </div>
            <div style={{ marginTop:"30px", backgroundColor:"#E9E9E9", width:'500px', borderRadius:'5px'}}>
                <div style={{ marginLeft:"10px",  display:"flex", fontWeight:"bold"}}>구매자 : {data.comments.buyersComment.owner}</div>
                <div style={{ marginLeft:"10px",  display:"flex"}}> {data.comments.buyersComment.content}</div>
                <div><img style={{marginBottom:"30px", width:"300px"}} src={`http://localhost:3065/image/getimg/${data.comments.buyersComment.imgSrc}`}/></div>
            </div>
        </div>
    )
}

export default TradeInfoDetail;