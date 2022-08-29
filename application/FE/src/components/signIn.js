import { useState } from "react";
import { Form,Button } from "react-bootstrap";
import PopUp from "./modal";

function SignIn({userInfo,setUserInfo,setIsSignUp,setStatus}){
    const [id,setId] = useState("");
    const [pw,setPw] = useState("");
    const [showModal,setShowModal] = useState(false);
    const [modalData,setModalData] = useState({});

    async function signIn(){
      if(id==""||pw===""){
        setModalData({
          title:"오류",
          content:"아이디/비밀번호를 정확히 입력하세요"
        })
        setShowModal(true)
        return;
      }
      const data = { id:id, password:pw };
      fetch('http://localhost:3065/user/login', {
        method: 'POST', // 또는 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUserInfo(data)
        setStatus("main")
      })
      .catch((error) => {
        setModalData({
          title:"에러",
          content:"아이디/비밀번호가 틀렸습니다."
        })
        setShowModal(true)
        return;
      });
    }
    return(
        <div>
            <Form>
      <Form.Group className="mb-3" controlId="test_id">
        <Form.Label style={{display:"flex"}}>아이디</Form.Label>
        <Form.Control value={id} onChange={(e)=>setId(e.target.value)} type="text" placeholder="ID" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{display:"flex"}}>비밀번호</Form.Label>
        <Form.Control value={pw} onChange={(e)=>setPw(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      <Button onClick={()=>{signIn()}} variant="primary" type="button" style={{marginRight:"10px"}}>
        로그인
      </Button>
      <Button variant="primary" type="button" style={{marginLeft:"10px"}} onClick={()=>{setUserInfo();setIsSignUp(true)}}>
        회원가입
      </Button>
    </Form>
    <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/>
        </div>
    )
}

export default SignIn;