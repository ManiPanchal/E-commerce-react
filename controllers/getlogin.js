const { find_admin } = require("./dbauser");
const dbaseller=require("./dbaseller");
const find_seller=dbaseller.find_seller;
const dbadispatch=require("./dbadispatch");
const find_dispatcher=dbadispatch.find_dispatcher;
module.exports=function getlogin(req, res)
 {
    console.log(req.session.is_logged_in);
    if (req.session.is_logged_in) {
      // res.end("200");
      // return;
         let data=find_admin(req.session.email)
         data.then(function(data)
         {
            // console.log(data);
            if(data==1)
            {
                // console.log(data);
               //  res.redirect("/admin");
               res.status(402).end();
                return;
            }
            else{
                // console.log("inelse");
                let data2=find_seller(req.session.email)
                data2.then(function(data2)
                {
                //   console.log(data2);
                   if(data2==1)
                   {
                     //   res.redirect("/seller");
                     res.status(403).end();
                        return;
                   }
                   else{
                      let data3=find_dispatcher(req.session.email)
                      data3.then(function(data)
                      {
                         if(data.length>0)
                         {
                            if(data[0].state_name=="haryana")
                            {
                              //   res.render("/state");
                              res.status(404).end();
                                return;
                            }
                            else{
                              //   res.render("/city");
                              res.status(405).end();
                                return;
                            }
                         }
                         else{
                           res.status(406).end();
                           //  res.render("product",{data:""});
                            return;
                         }
                      })
                    
                   }
                })


                

            }
         })       
    }
    else {
      //   res.render("login",{data:""});
      res.status(407).end();
        return;
    }
}
