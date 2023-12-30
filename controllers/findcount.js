const dbaorders=require("./dbaorders");
const find=dbaorders.find_count;
module.exports=(req,res)=>{
    let data=find(req.body.id,req.session.email)
    data.then(function(data){
        res.send(JSON.stringify(data));
        return;
    })
}