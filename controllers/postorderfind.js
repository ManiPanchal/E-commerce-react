const dbaorders=require("./dbaorders");
const find_orderby=dbaorders.find_orderby;
module.exports=(req,res)=>{
    let data=find_orderby(req.userId)
    data.then(function(data)
    {
        res.send(JSON.stringify(data));
        return;
    })
}