const userdba = require("./dbauser");
const find_token=userdba.find_token;
const updateuser=userdba.update_valid;
const data_from_table=userdba.data_from_table;
module.exports=function(req,res){
    const {token} =req.params;
 let users=find_token(token)
  users.then(function(users)
  {
              if(req.session.user)
              {
                  req.session.user.isvalid=true;
              }
              else{
                let data2=data_from_table(token);
                data2.then(function(data3)
                {
                    
                    req.session.is_logged_in=true;
                    req.session.user=data3[0];
                    req.session.user.isvalid=true;
                   let u=updateuser(token,1)
                    u.then(function()
                    {
                        res.redirect("/product");
                        return;   
                    },function(err)
                    {
                        res.render("signup",{data:"Something went wrong"});
                        return;
                    })
                })
                 
              }      
  },function(err)
  {
     res.render("signup",{data:"User not found"});
  })
  }
 