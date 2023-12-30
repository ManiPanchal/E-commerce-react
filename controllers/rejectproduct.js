const { delete_one } = require("./dbaproduct")

module.exports=(req,res)=>{
    let data=delete_one(req.body.id)
    data.then(function(data)
    {
        if(data==1)
        {
            res.end("ok");
            return;
        }
    })
}