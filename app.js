const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express()
const apikey="4364885e59cea8d29816c10446ca89d2-us18"
const uniqueId="23fd52fc82"

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
  var firstName=req.body.firstName;
  var lastName=req.body.lastName;
  var email=req.body.inputEmail;
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
  var jsonData=JSON.stringify(data);
  const url="https://us18.api.mailchimp.com/3.0/lists/23fd52fc82"
const options={
  method:"POST",
  auth:"manasthejoshi:4364885e59cea8d29816c10446ca89d2-us18"
}

const request=  https.request(url,options,function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");

    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
})







app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running")
})
