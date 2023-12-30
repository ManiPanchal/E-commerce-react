// const connection=require("./connection");
const dbaorders=require("./dbaorders");
const insert_item=dbaorders.insert_item;
module.exports=(req,res)=>{
    let data=req.body,count=0;
   for(let i=0;i<data[1].length;i++)
   {
       let date=Date();
       let promise=insert_item(data[1][i].email,data[1][i].product_id,"Ordered",data[1][i].curr_quantity,data[1][i].s_email,date)
       promise.then(function(data)
       {
        // console.log(count);
        count=count+data;
       })
       promise.catch(function(err)
       {
         res.end(err);
         return;
       })
   }
    res.status(402).end();
    
}