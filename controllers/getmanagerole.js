const dbauser=require("./dbauser");
const find_admin=dbauser.find_admin;


module.exports=(req,res)=>{
    if(req.session.is_logged_in)
    {
        let data2=find_admin(req.session.email)
            data2.then(function(data)
            {
              
               if(data==1)
               {
                   res.render("managerole");
                    return;
               }
               else{
                res.redirect("/products");
                return;
               }
            })      
    }
    else{
        res.redirect("/login");
        return;
    }
}