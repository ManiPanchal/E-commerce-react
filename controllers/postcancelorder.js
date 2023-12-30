const dbaorders=require("./dbaorders");
const del=dbaorders.del;
const dbaproduct=require("./dbaproduct");
const add_q=dbaproduct.add_q;
const changestate=dbaorders.change;
module.exports=(req,res)=>{
    let data=changestate(req.body.id,req.userId,"Cancelled")
    data.then(function(data)
    {
        if(data==1)
        {
            let data2=add_q(req.body.id,req.body.q)
            data2.then(function(data2){
                if(data2==1)
                {
                    res.status(402).end();
                    return;
                }
            })
           
        }
    })
    // let data=change()
    // let data=del(req.body.name,req.session.email)
    // data.then(function(data)
    // {
    //     if(data==1)
    //     {
    //         let data2=add_q(req.body.id,req.body.q)
    //         data2.then(function(data2)
    //         {
    //             if(data2==1)
    //             {
    //                 res.end("ok");
    //                 return;
    //             }
    //         })
            
    //     }
        
    // })
}