# sport-store project

implement login/signup system  
##Api links
Root link “get request” https://sportstore1.herokuapp.com

Local login api : “post request body must have: body:{email , password}” https://sportstore1.herokuapp.com/api/v1/login 
return
success : {status: 200,message: "authenticate success",token: userToken,verified: user.verified}
failed :


Sign up api : “post request body must have: body{email , password,name}” https://sportstore1.herokuapp.com/api/v1/signup 
return
{ status: 200, message: "account created and code is sent" }

Facebook login api :

“send data to link as userData” https://sportstore1.herokuapp.com/api/v1/facebooklogin

Google login api :

“ send data to link as userData ” https://sportstore1.herokuapp.com/api/v1/googlelogin

verificaion route : 'post request' https://sportstore1.herokuapp.com/api/v1/verify >> must contain code in body and token in header as 'x-access-token' property

Private route : “get request” https://sportstore1.herokuapp.com/api/v1/users/private >> must contain token in header with name “x-access-token” and email must be veified

forget password

- send user email: https://sportstore1.herokuapp.com/api/v1/forgetpassword >> will send code for user email

- send user email, code: https://sportstore1.herokuapp.com/api/v1/confirmcode return if code is true or not

- send user email , new password which is sent : https://sportstore1.herokuapp.com/api/v1/newpassword return message is reset
