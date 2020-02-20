# login-signup-sysytem

implement login/signup system  
##Api links
Root link “get request” https://authentcation.herokuapp.com

Local login api : “post request” https://authentcation.herokuapp.com/login >> body must have email , password ,name

Sign up api : “post request” https://authentcation.herokuapp.com/signup >>>> body must have email , password ,name

Facebook login api :

“ redirect to” https://authentcation.herokuapp.com/facebook

Google login api :

“ redirect to ” https://authentcation.herokuapp.com/google/auth

verificaion route : 'post request' https://authentcation.herokuapp.com/verify >> must contain code in body and token in cookies

Private route : “get request” https://authentcation.herokuapp.com/users/private >> must contain token in cookie with name “access-token” and email must be veified
