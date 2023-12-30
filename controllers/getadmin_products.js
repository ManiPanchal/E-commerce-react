const dbaproduct=require("./dbaproduct");
const find_all=dbaproduct.get_seller;

module.exports=(req,res)=>{
    // console.log(req.userId);
    // console.log(req.header);
    let data=find_all(req.userId)
    data.then(function(data)
    {
        console.log(data);
        res.send(JSON.stringify(data));
    })
}