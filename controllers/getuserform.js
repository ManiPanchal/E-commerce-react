const dbauserinfo=require("./dbauserinfo");
const getuser=dbauserinfo.getuser;
module.exports=(req,res)=>{
    // res.render("userform");
    // return;
    if(req.session.is_logged_in)
    {
    let data=getuser(req.session.email)
    data.then(function(data)
    {
        if(data.length>0)
        {
            res.render("userform");
            return;
        }
        else{
            res.render("userform");
            return;
        }
    })
}
else{
    res.redirect("/login");
    return;
}
    
}