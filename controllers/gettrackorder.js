module.exports=(req,res)=>{
    if(req.session.is_logged_in)
    {
        res.render("track");
        return;
    }
    else{
        res.redirect("/login");
        return;
    }
}