const sendSMS = (phone: string) => {
  // Here, we can write code for sending sms to particular phone number
  // We can integrate Plivo’s or Twilio’s API
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('success'), 600);
  })
}

export default sendSMS;
