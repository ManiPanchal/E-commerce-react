module.exports=(req,res)=>{
    if(req.session.is_logged_in)
    {
        res.render("report");
        return;
    }
    else{
        res.redirect("/login");
        return;
    }
}