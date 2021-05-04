import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useHistory } from 'react-router';

function OtpVerify() {
  const history = useHistory();
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value)
    if (error) {
      setError('');
    }
  }

  const submit = async () => {
    try {
      if (!(otp && otp.trim())) {
        return;
      }
      const requestId = localStorage.getItem('requestId');
      const response = await axios({
        method: 'post',
        url: `http://localhost:4000/auth/verify`,
        data: {
          otp: otp
        },
        headers: {
          'Authorization': `Bearer ${requestId}`
        }
      });
      
      const data = response.data;
      // removing request-id from localstorage
      localStorage.removeItem('requestId');
      // setting access_token in localstorage
      localStorage.setItem('token', data.token);
      history.push('/home');
    } catch(err) {
      console.error(err);
      setError('Invalid OTP! Please try again');
    }
  }

  const back = () => {
    localStorage.removeItem('requestId');
    history.push('/');
  }

  return (
    <div className="Otp verify">
      <div className="field">
        <input 
          type='text' 
          value={otp}
          onChange={handleChange} 
          placeholder={'Enter received otp'} />

        <button onClick={submit}> Verify Otp </button>  
         {error && <span style={{color: 'red'}}> {error} </span>}
        <button style={{marginLeft: '12px'}} onClick={back}> Back </button>
      </div>
    </div>
  );
}

export default OtpVerify;
