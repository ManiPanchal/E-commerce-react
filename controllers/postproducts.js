const dbaproducts=require("./dbaproduct");
const product=dbaproducts.find_all;
module.exports=(req,res)=>{
    let data=product()
    data.then(function(data)
    {
        res.send(JSON.stringify(data));
        return;
    })
}