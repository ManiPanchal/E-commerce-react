const dbauserinfo=require("./dbauserinfo");
const find_user=dbauserinfo.getuser;
module.exports=(req,res)=>{
    console.log(req.userId);
    let data=find_user(req.userId)
    data.then(function(data){
        res.send(JSON.stringify(data));
        return;
    })
}