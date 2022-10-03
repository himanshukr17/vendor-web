import React from 'react'
import firebase from '../firebase';

function testing() {

    // const handleClick = () => {


    //     let recaptcha=new firebase.auth.RecaptchaVerifier('recaptcha');
    //     let number ='+917777040224';
    //     firebase.auth().signInWithPhoneNumber(number,recaptcha).then(function(e){
    //         let code=prompt('Enter the OTP','');
    //         if(code==null) return;
    //         e.confirm(code).then(function(result){
    //             console.log(result.user,'user');
    //             document.querySelector('label').textContent=result.user.phoneNumber+"Number Verified";



    //         })
    //     }).catch((error)=>{
    //             console.log(error);
    //         })
    // };
  return (
    <div>
        <label></label>
      {/* <button className="btn btn-primary" onClick={()=>handleClick()}>
        Click me
      </button> */}
      ;
    </div>
  );
}

export default testing