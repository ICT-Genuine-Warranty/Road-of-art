import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import {useState} from 'react';

function SignPage ({userInfo,setUserInfo,setStatus}){
    const [isSignUp,setIsSignUp] = useState(false);

    return(
        <div style={{ width:'500px', marginTop:'200px'}}>
            {isSignUp===false ? <SignIn setUserInfo={setUserInfo} setIsSignUp={setIsSignUp} setStatus={setStatus}/>:<SignUp setIsSignUp={setIsSignUp}/>}
        </div>
    )
}

export default SignPage;