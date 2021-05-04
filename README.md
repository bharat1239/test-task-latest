### Notes

***Due to the time limit, we have not added any further validations i.e on input field and on APIs side.***

***Backend side***:

- For the development pupose, we are not using any 3rd party APIs for sending
the sms to mobile phone. For now, we're genereting the 6 digits random code and 
printing this code on console screen.

- For the temporary cache (not using any 3rd party library), we are using object which store the otpGeneratedTime and otpCode. This information is used for verification purpose.

- jwt token is used for the authentication.

***Frontend side***:

- Normal HTML5 elements is used with styling.

## Available Scripts

You can see two folders in the root directory i.e backend and frontend.

**backend:** We have used nodeJS with typescript for creating an APIs. 

We are exposing the following APIs:
- [POST] http://localhost:4000/auth/code   - For generating the OTP
- [POST] http://localhost:4000/auth/verify - To verifying the OTP code

**frontend:** We have used typescript with react.

### Steps to start the backend and frontend servers

**Note:** As backend API is required for the frontend. So please make sure that you start backend server before frontend.

**backend:**
- Go inside the `/backend` directory.
- Use the command `npm install` and `npm start` to start the server.
- This will start the server on PORT 4000.

**frontend:**
- Go inside the `/frontend` directory.
- Use the command `yarn install` and `yarn start` to start the server.
- This will start the server on PORT 3000.
- On the frontend side, we are using backend APIs.

