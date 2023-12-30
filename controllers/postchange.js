const sendMail=require("../methods/sendmail");
// const { find_seller } = require("./dbaseller");
const dbauser=require("./dbauser");
const dbaseller=require("./dbaseller");
const find_seller=dbaseller.find;
const findemail=dbauser.finduser;
const updatepass=dbauser.update_pas;
module.exports=(req,res)=>
{
  console.log(req.body);
  // const decodeJWT = (token) => {
  //   try {
  //     // Decode the JWT token
  //     const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
  //     return decoded;
  //   } catch (error) {
  //     console.error('Error decoding JWT:', error);
  //     return null;
  //   }
  // };
  //   const decodedToken = decodeJWT(token); // Assuming you have a jwt_decode function
  //   const userEmail = decodedToken.id;
  //   console.log(userEmail);
  console.log(req.userId);
  
    let user=findemail(req.userId)
    user.then(function(user)
    {
        if(user)
        {
            let user2=updatepass(req.userId,req.body.value)
            user2.then(function(user2)
            {
              sendMail(req.userId,user.mailToken,"<h1>Password change successfully</h1>",function(err,data)
              {
                  if(err)
                  {
                      res.render("changepassword",{data:"something went wrong"});
                      return;
                  }
                  req.session.is_logged_in=true;
                  // req.session.user.isvalid=true;
                  let data3=dbauser.find_admin(req.userId)
                  data3.then(function(data3)
                  {
                    if(data3==1)
                    {
                      // res.end("okk");
                      res.status(402).end();
                      return;
                    }
                    else {
                        let data2=find_seller(req.userId)
                        data2.then(function(data2)
                        {
                            if(data2==1)
                            {
                              // res.end("okkk");
                              res.status(403).end();
                              return;
                            }
                            else{
                              // res.end("ok");
                              res.status(404).end();
                              return;
                            }
                        })
                    }
                  })
                  // if(req.session.email=="manishapanchal5591@gmail.com")
                  // {
                  //   res.end("okk");
                  //   return;
                  // }
                  // else
                  // {
                  //   res.end("ok");
                  //   return;
                  // } 
              })
            },()=>{
              res.send("something went wrong");
              return;
            }) 
        }
        else{
            res.render("changepassword",{data:"something went wrong"});
            return;
        }   
    })
 }
