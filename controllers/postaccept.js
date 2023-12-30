const dbaproduct=require("./dbaproduct");
const update_flag=dbaproduct.update_flag;
module.exports=(req,res)=>{
    let data=update_flag(req.body.id)
    data.then(function(data)
    {
        // console.log(data);
        if(data==1)
        {
            res.end("ok");
            return;
        }
    })
}