# sport-store project

  
##Api links
Root link “get request” https://sportstore1.herokuapp.com

# authentiction system
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



# Items apis 

- create item 
    - post : https://sportstore1.herokuapp.com/api/v1/admin/items : just admin can create item
        - body: {size,price,type,category,team,discount,brand,gender,season,main photo with name "main"  , photos with name "photos"}
        - return: {status:201,message:"item created",item}
- get items 
    - get : https://sportstore1.herokuapp.com/api/v1/items
        - query :  
            - filter:  team,category,type,size,brand ,gender,season
            - sort : sortBy , orderBy : (asc,desc) default desc, limit, skip
        - return: {status:200,[{item:object,fav:boolean}]}  
        - main image property  name :"mainImage":url  , other images :"imagesURL": [{imageURL}]

- popular or new items : 
    - get : https://sportstore1.herokuapp.com/api/v1/items?sortBy=likesNumber or createdAt
        - query :  
            - filter:  team,category,type,size,brand 
            - sort : sortBy , orderBy : (asc,desc) default desc, limit, skip
        - return: {status:200,items}  
        - main image property  name :"mainImage":url  , other images :"imagesURL": [{imageURL}]  
- get one Item  by id
    - get :  https://sportstore1.herokuapp.com/api/v1/items/:id
    - return:  {status:200,item}  
    - main image property  name :"mainImage":url  , other images :"imagesURL": [{imageURL}]
- home page
    - get :   https://sportstore1.herokuapp.com/api/v1/items/home
    - return : {status:200,popular,new,sales}  
    - main image property  name :"mainImage":url  , other images :"imagesURL": [{imageURL}]
- add favorit to user: 
    - post : localhost:4000/api/v1/favorite 
    - body: itemId
    - header : x-access-token:token
    - return {status:200,message:"item added to favorite"}
- get favorite to user 
    - get :https://sportstore1.herokuapp.com/api/v1/favorite 
    - return : [favorites]
- remove favorite from user : 
    - delete : localhost:4000/api/v1/favorite 
    - return : {status:200,message:"removed from favorite"}    


# payments      

    - payment user detailes 
        - post : https://sportstore1.herokuapp.com/api/v1/payments/userDetailes 
        - body : email,phoneNumber , fullName , country, city, state, pistolCode 
        - response : {status:200, "userDetailes": {
                                                    "_id": "5f913b08574f1a117c30283b",
                                                    "userId": "5f7df87c65951300177e3719",
                                                    "orderEamil": "paymentEmail@asad.com",
                                                    "phone": "794646667",
                                                    "fullName": "ibrahim",
                                                    "country": "palestine",
                                                    "state": "gaza",
                                                    "city": "gaza",
                                                    "pistolCode": "4566",
                                                    "createdAt": "2020-10-22T07:55:52.216Z",
                                                    "updatedAt": "2020-10-22T07:55:52.216Z",
                                                
                                                }}

    - payment process : 
        - post : https://sportstore1.herokuapp.com/api/v1/payments
        - body : items[{_id:itemId,season,price,type,category,discount,season,team,mainImage,playerName,size,quantity:quantity}],userDetailesId , amount:amount
        - response : {status:200,clientSecret:"payment Intent client_secret"}

    - get user payments 
        - get : https://sportstore1.herokuapp.com/api/v1/payments 
        - response : {status:200,orders:[{orderObject}]}
        - orderObject = {items:[{item}],chargeId,userId,totalAmount,orderUserDetailesId}

    - get user payments 
        - get : https://sportstore1.herokuapp.com/api/v1/payments/:id 
        - response : {status:200,order:{orderObject}}
        - orderObject = {items:[{item}],chargeId,userId,totalAmount,orderUserDetailesId}