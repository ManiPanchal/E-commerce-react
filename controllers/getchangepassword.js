module.exports=(req,res)=>{
    if(req.session.is_logged_in)
    {
        res.render("changepassword",{data:""});
    }
    else
    {
        res.redirect("/login");
    }
     
}