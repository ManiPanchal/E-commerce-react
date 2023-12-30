module.exports=(req, res) => {
    
    if(req.userId)
    {
        // req.session.destroy();
        // res.redirect("/");
        res.status(402).end();
    }
    else{
        // res.redirect("/login");
        res.status(403).end();
    }

}