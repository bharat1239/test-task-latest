import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useHistory } from 'react-router';

const URL: string = (process.env.REACT_APP_BACKEND_URL as string);

function App() {
  const history = useHistory();
  const [phone, setPhone] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  const submit = async () => {
    try {
      if (!(phone && phone.trim())) {
        return;
      }
      const response = await axios({
        method: 'post',
        url: 'http://localhost:4000/auth/code',
        data: {
          phone: phone
        }
      });
  
      const data = response.data;
      // setting request-id in localstorage
      localStorage.setItem('requestId', data.requestId);
      history.push('/otp');
    } catch(err) {
      console.error('Error!')
    }
  }

  return (
    <div className="App">
      <div className="field">
        <input 
          type='number' 
          value={phone}
          onChange={handleChange} 
          placeholder={'Enter phone number Ex. 916782734567'} />

        <button onClick={submit}> Send Otp </button>  
      </div>
    </div>
  );
}

export default App;
