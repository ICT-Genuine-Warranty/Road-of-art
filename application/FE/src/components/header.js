import {Alert, Button,Form} from 'react-bootstrap'

function Header({setStatus, userInfo, setUserInfo}){
    return(
        <Alert className='Search' style={{display:"flex", height:"60px", backgroundColor:'#BCABC2', borderColor:"#BCABC2", position : 'fixed', width:'500px'}}>
            {userInfo===undefined ? <div style={{display:"flex", width:"400px", color:"#555555"}}>로그인을 해주세요</div> : <div style={{display:"flex", width:"400px", color:"#000000", fontWeight:"bold"}}>{userInfo.name}님</div>}
            <Button  variant='' onClick={()=>{setStatus("main")}} >Home</Button>
            {userInfo===undefined ? <Button  variant='' onClick={()=>{setStatus("sign")}} >SignIn</Button> : <Button  variant='' onClick={()=>{ setStatus("main");setUserInfo()}} >SignOut</Button>}
        </Alert>
    )
}

export default Header;