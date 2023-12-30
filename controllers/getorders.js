// const { json } = require("express");
// const dbaseller=require("./dbaseller");
// const find_order=dbaseller.find_order;
module.exports=(req,res)=>{
    if(req.session.is_logged_in)
    {
        res.render("orderrequest");
        return;
        // console.log("inside getseller");
        // let data2=find_order(req.session.email)
        //     data2.then(function(data)
        //     {
        //         res.send(JSON.parse(data));
        //         return;
            // //   console.log("inside getseller");
            //    if(data==1)
            //    {
            //        res.render("");
            //         return;
            //    }
            //    else{
            //     res.render("notseller");
            //     return;
            //    }
            // })
    }
    else{
        // console.log("inside get seller");
        res.redirect("/login");
        return;
    }
}