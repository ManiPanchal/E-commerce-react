const dbauser=require("./dbauser");
const find_admin=dbauser.find_admin;

module.exports=(req,res)=>{
    if(req.userId)
    {
        let data2=find_admin(req.userId)
        data2.then(function(data)
        {
          
           if(data==1)
           {
            //    res.redirect("/admin");
              res.status(201).end();
                return;
           }
           else{
            // res.render("product",{data:req.session.user.name});
            res.status(202).end();
            return;
           }
        })

        // if(req.session.email=="manishapanchal5591@gmail.com")
        // {
        //     res.redirect("/admin");
        //     return;
        // }
        // else{
        //     res.render("product",{data:req.session.user.name});
        //     return;
        // }  
    }
    else
    {
        // res.render("product",{data:"User"});
        res.status(202).end();
        return;
    }
}