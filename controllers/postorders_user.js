// const { json } = require("express");
const dbaseller=require("./dbaseller");
const find_order=dbaseller.find_order;
module.exports=(req,res)=>{
    if(req.userId)
    {
        // console.log("inside getseller");
        let data2=find_order(req.userId)
            data2.then(function(data)
            {
                res.send(JSON.stringify(data));
                return;
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
            })
    }
    else{
        // console.log("inside get seller");
        // res.redirect("/login");
        res.status(401).end();
        return;
    }
}