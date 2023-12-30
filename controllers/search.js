const dbaproduct=require("./dbaproduct");
const find=dbaproduct.search;
module.exports=(req,res)=>{
    // console.log(req.body);
    let data=find(req.body.value)
    data.then(function(data)
    {
        res.send(JSON.stringify(data));
        return;
    })
   
}