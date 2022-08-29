import {Button} from 'react-bootstrap';
import Axios from 'axios';
import {useState} from 'react';
import PopUp from './modal';

function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec));
} // 함수정의

function ImageUpload({callback,setImgSrc }){
    const [showModal,setShowModal] = useState(false);
    const [modalData,setModalData] = useState({});

    function upload(imgFile){
        if(imgFile==undefined){
            setModalData({
                title:"이미지오류",
                content:"이미지를 업로드하세요"
            })
            setShowModal(true)
            return;
        }
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", imgFile);
        console.log(imgFile)
        Axios.post('http://localhost:3065/image/uploadfiles', formData, config)
        .then(async (response) => {
            if(response.data.success) {
                setImgSrc(response.data.url)
            } else {
                alert('사진 업로드를 실패했습니다.');
            }
        })
    }
    return (
        <div>
            <input className="UploadImage form-control form-control-lg" type="file" onChange={(e)=>upload(e.target.files[0])}/>
            <Button style={{marginBottom:"30px" ,marginTop:"10px", backgroundColor:'#A66ABB', borderColor:"#A66ABB" }} onClick={()=>{callback()}}>업로드</Button>
            <PopUp setShowModal={setShowModal} showModal={showModal} modalData={modalData}/>
        </div>
    )
}

export default ImageUpload;

