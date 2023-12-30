const dbaorders=require("./dbaorders");
const find=dbaorders.find;
module.exports=(req,res)=>{
    let data=find()
    data.then(function(data)
    {
        res.send(JSON.stringify(data));
        return;
    })
}