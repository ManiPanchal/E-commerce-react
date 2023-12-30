const { saveuserinfo } = require("./dbauserinfo");

module.exports=(req,res)=>{
    // console.log(req.body);
    let data=saveuserinfo(req.userId,req.body.name,req.body.pincode,req.body.phone,req.body.state,req.body.city,req.body.add)
    data.then(function(data)
    {
        if(data==1)
        {
            res.status(401).end();
            return;
        }
        else{
            res.status(402).end();
            return;
        }
    })
}