const dbauser=require("./dbauser");
const find_admin=dbauser.find_admin;

module.exports=function getplaceorder(req, res)
 {
    
    if (req.session.is_logged_in) {
    
        let data2=find_admin(req.session.email)
        data2.then(function(data)
        {
          
           if(data==1)
           {
               res.redirect("/admin");
                return;
           }
           else{
            res.render("placeorder");
            return;
           }
        })
        // if(req.session.email=="manishapanchal5591@gmail.com")
        // {
        //     res.redirect("/admin");
        //     return;
        // }
        // else{
        //     res.render("placeorder",{data:""});
        //     return;
        // }
        
    }
    else {
        // res.render("login",{data:""});
        res.redirect("/login");
        return;
    }
}
