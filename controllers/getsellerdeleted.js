const { find_seller } = require("./dbaseller");

module.exports=(req,res)=>{
    if(req.session.is_logged_in)
    {
          let data=find_seller(req.session.email)
          data.then(function(data)
          {
            if(data==1)
            {
                res.render("deleted");
                return;
            }
            else{
                res.render("login",{data:"Enter valid data"});
                return;
            }
          })
    }
    else{
        res.redirect("/login");
        return;
    }
}