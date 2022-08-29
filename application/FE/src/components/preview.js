import { Card,Row,Col } from 'react-bootstrap';
import logo from './img/logo.png'
import tradeIcon from './img/tradeIcon.png'
import kream from './img/kream.png'
import carrot from './img/carrot.png'
import coupang from './img/coupang.png'
import junggo from './img/junggo.png'


function Preview(){
    return(
        <div style={{ backgroundColor:"#E9E9E9", width:'500px', marginTop:'260px', borderRadius:'5px'}}>
            <div className='introduce'>
                <div className="Title" style={{display:"flex", padding:'10px'}}>
                    <img src={logo} width={'45px'} height={'45px'}/>
                    <h2>Road Of Art</h2>
                </div>
                <div className='content'   style={{display:"contents"}}>
                    <div  style={{display:"flex", marginLeft:'15px'}}>‘Road Of Art’는 유통과정을 추적하여</div>
                    <div  style={{display:"flex", marginLeft:'15px'}}>제품의 정품여부를 판별할 수 있도록 도와주는 플랫폼입니다.</div>
                </div>
            </div>
            <div className='platforms'>
                <div className="Title" style={{display:"flex", padding:'10px'}}>
                    <img src={tradeIcon} width={'45px'} height={'45px'}/>
                    <h2>Road Of Art</h2>
                </div>
                <div className='content'   style={{display:"contents"}}>
                    <div  style={{display:"flex", marginLeft:'15px'}}>아래의 플랫폼을 사용하여 거래하면</div>
                    <div  style={{display:"flex", marginLeft:'15px', marginBottom:'15px'}}>유통경로를 보증받을 수 있습니다.</div>
                </div>
                <div className='content'   style={{display:"contents"}}>
                    <Row style={{paddingLeft:'25px', paddingRight:'25px'}}>
                        <Col>
                            <Card className='platformIntroduce'>
                                <Card.Img src={kream}/>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='platformIntroduce'>
                                <Card.Img src={junggo}/>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{padding:'25px'}}>
                        <Col>
                            <Card className='platformIntroduce'>
                                <Card.Img src={coupang}/>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='platformIntroduce'>
                                <Card.Img src={carrot}/>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Preview;