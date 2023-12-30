const dbaseller=require("./dbaseller");
const find_seller=dbaseller.find_seller;
module.exports=(req,res)=>{
    if(req.session.is_logged_in)
    {
        // console.log("inside getseller");
        let data2=find_seller(req.session.email)
            data2.then(function(data)
            {
            //   console.log("inside getseller");
               if(data==1)
               {
                   res.render("seller");
                    return;
               }
               else{
                res.render("notseller");
                return;
               }
            })
    }
    else{
        // console.log("inside get seller");
        res.redirect("/login");
        return;
    }
}