const sendMail=require("../methods/sendmail");
const usermodel=require("./dbauser.js");
const finduser=usermodel.finduser;
const createuser=usermodel.createuser;
module.exports=(req, res) => {
    let user=finduser(req.body.email)
    user.then(function(user)
    {
        // console.log(user)
          if(user==1)
          {
            res.end("exist");
            return;
          }
          else if(user==2){
            let user={name:req.body.name,email:req.body.email,password:req.body.password,isvalid:0,mailToken:Date.now(),role:"User"};
            req.session.email=req.body.email;
            req.session.mailToken=user.mailToken;
            req.session.user=user;
            sendMail(req.body.email,user.mailToken,`<h1>Welcome</h1><a href='http://127.0.0.1:8000/verifymail/${user.mailToken}'>clickhere...</a>`,function(err,data)
            {
                if(err)
                {
                    res.render("signup",{data:"something went wrong"});
                    return;
                }
                // req.session.is_logged_in=true;
                let data2=createuser(user)
                 data2.then(function()
                {
                    res.end("check");
                    return;
                })
                .catch(function(err)
                {
                    res.render("signup",{data:"something went wrong"});
                })
                return;
            })
          }
            
    })
            
}
           
    