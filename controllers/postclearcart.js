const dbacart=require("./dbacart");
const clear_cart=dbacart.clear_cart;
module.exports=(req,res)=>{
    // console.log(req.session.email,req.body.product_id);
    let data2=req.body;
    for(let i=0;i<data2[1].length;i++)
    {
        let data=clear_cart(req.userId,data2[1][i].product_id);
    }
    res.status(402).end();
    return;
    // let data=clear_cart(req.session.email,req.body.product_id)
    // data.then(function(data)
    // {
    //     if(data==1)
    //     {
    //         res.end("ok");
    //     }
    // })
}