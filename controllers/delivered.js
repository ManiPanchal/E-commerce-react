const dbaorders=require("./dbaorders");
const change=dbaorders.change;
module.exports=(req,res)=>{
    let data=change(req.body.id,req.body.email,"Delivered")
    data.then(function(data)
    {
        if(data==1)
        {
            let data2=dbaorders.add_c_date(req.body.id,req.body.email,Date())
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