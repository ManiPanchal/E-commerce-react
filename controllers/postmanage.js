const dbaseller=require("./dbaseller");
const find=dbaseller.all;

module.exports=(req,res)=>{
   let data=find()
   data.then(function(data)
   {
        res.send(JSON.stringify(data));
        return;
   })
   data.catch(function(err)
   {
         console.log(err);
   })
}