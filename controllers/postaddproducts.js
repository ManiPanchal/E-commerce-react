const dbaproduct=require("./dbaproduct");
const findfive=dbaproduct.product_five;
module.exports=(req,res)=>
{
    x=req.body.x;
    // console.log(x);
    let products=findfive(x)
    products.then(function(products)
    {
        res.send(JSON.stringify(products));
    })
}