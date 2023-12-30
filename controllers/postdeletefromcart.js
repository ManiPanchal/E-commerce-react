const dbacart=require("./dbacart");
const delete_one=dbacart.delete_one;
module.exports=(req,res)=>
{
    let data=delete_one(req.userId,req.body.value)
     data.then(function(item)
     {
         if(item)
         {
            res.status(402).end();
            return;
         }
     })  
}