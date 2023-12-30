const dbadispatch=require("./dbadispatch");
const find=dbadispatch.find_dispatcher;

module.exports=(req,res)=>{
    if(req.session.is_logged_in)
    {
        let data2=find(req.session.email)
            data2.then(function(data)
            {
              
               if(data.length>0)
               {
                 if(data[0].state_name!="haryana")
                 {
                    res.render("city");
                    return;
                 }
                 else{
                    res.render("login",{data:"Enter Valid data"});
                 }
               }
            })
    }
    else{
        res.redirect("/login");
        return;
    }
}