import express from 'express';
import moment from 'moment';
import generateOTP from './utils/generateOTP';
import sendSMS from './utils/sendSMS';
import generateAccessToken from './utils/generateToken';
import checkId from './utils/checkId';
import cors from 'cors';

const app = express();

// As for the development, we are not using the database, so 
// here we are creating the temporary cache
// ex. tokens = {
//   '+9199922222': {
//     tokenGeneratedTime: 
//     otpCode:   
//   }
// }

interface Token {
  [key: string]: {
    tokenGeneratedTime: any;
    otpCode: string;
  }
}

const tokens: Token = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Well done!');
})

// API to generate the OTP code
app.post('/auth/code', async (req: express.Request, res: express.Response) => {
  const phone = req.body.phone;
  // check if otp code is already initiated for this particular phone number
  // if exist then delete the entry from the tokens object
  if (tokens[phone]) {
    delete tokens[phone];
  }

  // Generate 6 digits OTP
  const otpCode = generateOTP();

  // Todo: Sending token to mobile
  try {
    await sendSMS(phone);
  } catch(err) {
    return res.status(500).send({ msg: 'Error while sending sms!'})
  }
  
  // console code 
  console.log(`OTP for mobile '${phone}' is`, otpCode);

  // Storing the otpCode and time in the tokens object (temporary storage)
  tokens[phone] = {
    tokenGeneratedTime: new Date(),
    otpCode
  }

  // generate token used for request id
  const requestId = generateAccessToken(phone); 

  console.log('Stored token', tokens);
  res.status(200).send({
    msg: 'OTP sent to mobile number',
    requestId
  })
})

// API to verify the OTP code
app.post('/auth/verify', checkId, (req: express.Request, res: express.Response) => {
  const otp = req.body['otp'];
  /* @ts-ignore */
  const phone = req.phone;
  
  // Get generated OTP from tokens object
  const data = tokens[phone];

  // Otp generation time should not be more than 60sec 
  const start = moment()
  const end = moment(data.tokenGeneratedTime);
  const seconds = start.diff(end, "seconds");

  if (seconds > 60) {
    console.log('OTP expired!');
    return res.status(403).send({
      msg: 'OTP expired!'
    })
  }

  if (data.otpCode !== otp) {
    console.log('Invalid OTP! Please try again');
    return res.status(403).send({
      msg: 'Invalid OTP! Please try again'
    })
  }

  const token = generateAccessToken(phone); 

  // Deleting the OTP entry
  delete tokens[phone];

  res.status(200).send({
    msg: 'OTP verified!',
    token
  })
})

app.listen(4000, () => {
  console.log('The application is listening on port 4000!');
})
