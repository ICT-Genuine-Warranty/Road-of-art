import { useState } from "react";
import { Form,Button } from "react-bootstrap";
import PopUp from "./modal";

function SignUp({userId,SetUserId,setIsSignUp}){
    const [id,setId] = useState("");
    const [pw,setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [name, setName] = useState("");
    const [showModal,setShowModal] = useState(false);
    const [modalData,setModalData] = useState({});
    const [isMaker,setIsMaker] = useState(false);

    async function signUp(){
      if(name===""||id==""||pw===""||pw!==pwCheck){
        setModalData({
          title:"오류",
          content:"정보를 정확히 입력하세요"
        })
        setShowModal(true)
        return;
      }
      const ismaker = isMaker==false ? 0 : 1;
      const data = { name: name, id:id, password:pw, isMaker:ismaker};
      fetch('http://localhost:3065/user/', {
        method: 'POST', // 또는 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        setIsSignUp(false);
      })
      .catch((error) => {
        setModalData({
          title:"에러",
          content:"이미 존재하는 아이디입니다."
        })
        setShowModal(true)
        return;
      });
    }

    return(
        <div>
            <Form>
        <Form.Group className="mb-3" controlId="test_name">
        <Form.Label style={{display:"flex"}}>이름</Form.Label>
        <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="홍길동" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="test_id">
        <Form.Label style={{display:"flex"}}>아이디</Form.Label>
        <Form.Control value={id} onChange={(e)=>setId(e.target.value)} type="text" placeholder="ID" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{display:"flex"}}>비밀번호</Form.Label>
        <Form.Control value={pw} onChange={(e)=>setPw(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{display:"flex"}}>비밀번호를 다시 입력하세요</Form.Label>
        <Form.Control value={pwCheck} onChange={(e)=>setPwCheck(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      {pwCheck!==pw ? <Form.Text style={{display:"flex", color:"#ff0000"}}>
          비밀번호가 일치하지 않습니다.
        </Form.Text>:null}
        <div style={{display:"flex"}}>
        <Form.Check 
        type="switch"
        id="custom-switch"
        onChange={()=>{setIsMaker(!isMaker)}}
      /><div>{isMaker==false ? "일반사용자" : "기업"}</div></div>

      <Button onClick={()=>{signUp()}} variant="primary" type="button" style={{marginLeft:"10px"}}>
        회원가입
      </Button>
    </Form>
    <PopUp showModal={showModal} setShowModal={setShowModal} modalData={modalData}/>
        </div>
    )
}

export default SignUp;