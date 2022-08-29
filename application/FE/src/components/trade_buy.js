import naver from './img/naverLogo.png'
import kream from './img/kreamLogo.png'
import junggo from './img/junggoLogo.png'
import carrot from './img/carrotLogo.png'
import coupang from './img/coupangLogo.png'
import thunder from './img/thunderLogo.png'
import ImageUpload from './imageUpload'
import {Form} from 'react-bootstrap'
import {useEffect, useState} from 'react'

const PLATFORM = ["","자체유통","쿠팡","옥션","번개장터","당근마켓","크림","중고나라"]

function Trade({itemInfo, userInfo}){
    const [mempoolData, setMempoolData] = useState();
    const [isBuyer, setIsBuyer] = useState(false);
    const [comment, setComment] = useState("");
    const [imgSrc,setImgSrc] = useState();

    function buy(){
        let now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth()+1;
        const date = now.getDate()
        let data={}
        if(mempoolData!=undefined){
            data = {
            tradeCode: mempoolData.id,
            itemCode: mempoolData.itemId,
            platform: mempoolData.platform,
            price: mempoolData.price,
            traded: `${year}-${month}-${date}`,
            type: 4,
            sellerId: itemInfo.owner,
            buyerId: userInfo.id,
            sellerComment: mempoolData.comment,
            sellerImg: mempoolData.imgsrc,
            buyerComment: comment,
            buyerImg:imgSrc,
            sellerIdentity:userInfo.identity
        }
                }
        console.log( JSON.stringify(data))
        fetch('http://localhost:3065/mempool/maketx', {
        method: 'POST', // 또는 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((el) => {
        console.log('성공:', el);
        })
        .catch((error) => {
        console.error('실패:', error);
        });
    }

    useEffect(()=>{
        const data = {
            userId:userInfo.identity,
            itemId:itemInfo.itemId
        }
        console.log(data)
        fetch('http://localhost:3065/mempool/get', {
        method: 'POST', // 또는 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((el) => {
        console.log('mempool:', el);
        setMempoolData(el)
        if(el!=null){
            setIsBuyer(true)
        }
        })
        .catch((error) => {
        console.error('mempoolError:', error);
        });
    },[])

    return(
        <div>
           { isBuyer == false ? <div>권한이 없습니다.</div> : <div>
            <div style={{ backgroundColor:"#E9E9E9", width:'500px', borderRadius:'5px'}}>
                <div>
                     <div style={{display:"flex"}}>
                        <h1 style={{ marginLeft:"10px",marginTop:"20px",fontWeight:"bold"}}>구매하기</h1>
                    </div>
                    <div style={{marginLeft:"30px"}}>
                        <div><img  style={{width:'300px'}} src={`http://localhost:3065/image/getimg/${itemInfo.imageSrc}`}/></div>
                        <div><h3 style={{fontWeight:'bold'}}>{itemInfo.name}</h3></div>
                        <div style={{display:'flex'}}>{itemInfo.detailedName}</div>
                        <div style={{display:'flex'}}>제품 코드 : {itemInfo.itemId}</div>
                        <div style={{display:'flex'}}>제작 시기 : {itemInfo.maked}</div>
                        <div style={{display:'flex'}}>거래 횟수 : {itemInfo.tradeNum}</div>
                        <div style={{display:'flex'}}>최초 판매자 : {itemInfo.firstSeller}</div>
                        <div style={{display:'flex'}}>현재 소유자 : {itemInfo.owner}</div>
                        
                    </div>
                </div>
                <div style={{marginTop:"20px", marginLeft:"10px", display:"flex", fontWeight:"bold"}}><h5>사용 플랫폼 : {PLATFORM[mempoolData.platform]}</h5></div>
                <div style={{marginTop:"20px", marginLeft:"10px", display:"flex", fontWeight:"bold"}}><h5>가격 : {mempoolData.price}원</h5></div>
                <div><h3 style={{marginLeft:"10px", marginTop:"20px", display:"flex", fontWeight:"bold"}}>코멘트 작성</h3></div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{margin:'auto' , width:"450px"}}>
            <Form.Control as="textarea" rows={3}  placeholder={"코멘트 작성"} onChange={(e)=>{setComment(e.target.value)}}/>
        </Form.Group>
            <div><h3 style={{marginLeft:"10px", marginTop:"20px", display:"flex", fontWeight:"bold"}}>이미지 등록</h3></div>
            <div style={{margin:'auto' , width:"450px"}}><ImageUpload setImgSrc={setImgSrc} callback={buy}/></div>
            </div>
            </div>}
        </div>
    )
}
export default Trade;