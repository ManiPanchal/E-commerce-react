const dbacart=require("./dbacart");
const update_one=dbacart.update_one;
const dbaproduct=require("./dbaproduct");
const findunique=dbaproduct.find_product;
module.exports=(req,res)=>{
    let value=parseInt(req.body.q);
    let products=findunique(req.body.id)
    products.then(function(product)
    { 
        if(product[0].quantity>=value)
        {
            let data=update_one(req.userId,req.body.id,value)
            data.then(function()
            {
                    res.status(401).end();
                    return;
            });
        }
        else{
            // res.end("okk");
            res.status(402).end();
            return;
        }
    }) 
}