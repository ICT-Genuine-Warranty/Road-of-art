import { Alert, Button, Form } from 'react-bootstrap'
import Camera from './img/camera.png'
import { useState } from 'react'
import PopUp from './modal';

function Search({ setStatus, itemInfo, setItemInfo }) {
  const [itemCode, setItemCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  async function search() {

    await fetch('http://localhost:3065/item/getInfo', {
      method: 'POST', // 또는 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: itemCode }),
    })
      .then((response) => response.json())
      .then((el) => {
        console.log(el)
        setItemInfo(el);
        console.log("getInfo")
        setStatus("item")
      })
      .catch((error) => {
        setModalData({
          title: "오류",
          content: "제품코드를 정확히 입력하세요"
        })
        setShowModal(true);
      });
  }

  function clickCamera() {
    setModalData({
      title: "미구현",
      content: "구현 예정입니다."
    })
    setShowModal(true);
  }

  return (
    <Alert className='Search' style={{ backgroundColor: '#BCABC2', borderColor: "#BCABC2", position: 'fixed', width: '500px' }}>
      <div className='text' style={{ display: 'flex', marginBottom: '10px', color: "#000000" }}>
        제품코드를 직접입력하거나
        QR코드를 스캔하세요.
      </div>
      <Form.Control
        value={itemCode}
        onChange={(e) => {
          setItemCode(e.target.value);
        }
        }
        type="text"
        placeholder="aX9asdnVa"
      />
      <div className='SearchButtons' style={{ marginTop: '15px' }}>
        <Button variant="light" style={{ marginLeft: '10px', marginRight: '10px' }} onClick={() => { clickCamera() }}>
          <img src={Camera} height={'20px'} />
        </Button>
        <Button variant="light" style={{ marginLeft: '10px', marginRight: '10px' }} onClick={() => { search(); }}>
          검색
        </Button>
      </div>
      <PopUp setShowModal={setShowModal} showModal={showModal} modalData={modalData} />
    </Alert>
  )
}

export default Search;