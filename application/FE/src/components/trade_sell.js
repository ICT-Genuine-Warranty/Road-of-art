import naver from './img/naverLogo.png'
import kream from './img/kreamLogo.png'
import junggo from './img/junggoLogo.png'
import carrot from './img/carrotLogo.png'
import coupang from './img/coupangLogo.png'
import thunder from './img/thunderLogo.png'
import ImageUpload from './imageUpload'
import {Form} from 'react-bootstrap'
import { useState } from 'react'

const PLATFORM = ["","자체유통","쿠팡","옥션","번개장터","당근마켓","크림","중고나라","네이버"]

function TradeSell({itemInfo}){
    const [platform,setPlatform] = useState();
    const [buyer,setBuyer] = useState();
    const [imgSrc,setImgSrc] = useState();
    const [comment,setComment]= useState();
    const [price,setPrice]=useState();

    function sell(){
        const data = {
            itemId:itemInfo.itemId,
            platform:platform,
            price:price,
            comment:comment,
            imgSrc:imgSrc,
            buyerId:buyer,
            type:4
        }
        console.log(data)
        fetch('http://localhost:3065/mempool/sell', {
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

    return(
        <div>
            <div style={{ backgroundColor:"#E9E9E9", width:'500px', borderRadius:'5px'}}>
                <div>
                     <div style={{display:"flex"}}>
                        <h1 style={{ marginLeft:"10px",marginTop:"20px",fontWeight:"bold"}}>판매하기</h1>
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
                <div style={{display:"flex"}}>
                    <h3 style={{ marginLeft:"10px",marginTop:"20px",fontWeight:"bold"}}>거래 플랫폼 선택</h3>
                </div>
                <div style={{display:"flex"}}>
                <div><img style={{width:"100px", margin:"10px"}} src={kream} onClick={()=>{setPlatform(6)}}/></div>
                <div><img style={{width:"100px", margin:"10px"}}  src={junggo} onClick={()=>{setPlatform(7)}}/></div>
                <div><img style={{width:"100px", margin:"10px"}}  src={carrot} onClick={()=>{setPlatform(5)}}/></div>
                <div><img style={{width:"100px", margin:"10px"}}  src={coupang} onClick={()=>{setPlatform(2)}}/></div>
                </div>
                <div style={{display:"flex"}}>
                <div><img style={{width:"100px", margin:"10px"}}  src={naver} onClick={()=>{setPlatform(8)}}/></div>
                <div><img style={{width:"100px", margin:"10px"}}  src={thunder} onClick={()=>{setPlatform(4)}}/></div>
                </div>
                <div style={{marginLeft:"10px", display:"flex"}}>사용 플랫폼 : {PLATFORM[platform]}</div>
                <div><h3 style={{marginLeft:"10px", marginTop:"20px", display:"flex", fontWeight:"bold"}}>판매 가격(원)</h3></div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{margin:'auto' , width:"450px"}}>
                    <Form.Control type="text"  placeholder={"0(원)"} onChange={(e)=>{setPrice(Number(e.target.value))}}/>
                </Form.Group>
                <div><h3 style={{marginLeft:"10px", marginTop:"20px", display:"flex", fontWeight:"bold"}}>구매자 아이디</h3></div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{margin:'auto' , width:"450px"}}>
                    <Form.Control type="text"  placeholder={"ID"} onChange={(e)=>{setBuyer(e.target.value)}}/>
                </Form.Group>
                <div><h3 style={{marginLeft:"10px", marginTop:"20px", display:"flex", fontWeight:"bold"}}>코멘트 작성</h3></div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{margin:'auto' , width:"450px"}}>
                    <Form.Control as="textarea" rows={3}  placeholder={"코멘트 작성"} onChange={(e)=>{setComment(e.target.value)}}/>
                </Form.Group>
            <div><h3 style={{marginLeft:"10px", marginTop:"20px", display:"flex", fontWeight:"bold"}}>이미지 등록</h3></div>
            <div style={{margin:'auto' , width:"450px"}}><ImageUpload setImgSrc={setImgSrc} callback={sell}/></div>
            </div>
        </div>
    )
}
export default TradeSell;