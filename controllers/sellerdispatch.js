const dbaproduct=require("./dbaproduct");
const changestate=dbaproduct.changestate;
const dbaorders=require("./dbaorders");
const add_date=dbaorders.add_date;
module.exports=(req,res)=>{
    let data=changestate(req.body.id,req.body.email,"Dispatched By Seller",req.userId)
    data.then(function(data)
    {
        if(data==1)
        {
            let data2=add_date(req.body.email,req.body.id,Date())
            data2.then(function(data2)
            {
                if(data2==1)
                {
                    res.end("ok");
                    return;
                }
            })
           
        }
    })
}