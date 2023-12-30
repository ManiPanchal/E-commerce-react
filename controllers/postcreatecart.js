const dbacart=require("./dbacart");
const find_email=dbacart.find_item;
module.exports=(req,res)=>{
    // let items=[];
    // req.session.is_logged_in=true;
    // req.session.user.isvalid=true;
    let userId=req.userId;
    let cart=find_email(userId)
    cart.then(function(cart)
    {
        //    console.log(cart);
        //     for(let i=0;i<cart.length;i++)
        //     {
        //        await find_one(cart[i].product_id)
        //         .then(function(product2)
        //         {

        //              product2[1]={};
        //             product2[1].curr=cart[i].curr_quantity;
        //             items.push(product2);
        //             console.log(product2);
        //         })
        //     }
                res.send(JSON.stringify(cart));
                return;
    },()=>{
        res.end("wrong");
    })  
}