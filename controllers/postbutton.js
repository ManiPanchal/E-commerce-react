const dbaorders=require("./dbaorders");
const find_state=dbaorders.find_state;
module.exports=(req,res)=>{
    // console.log(req.body);
    let data=find_state(req.body.email,req.body.id)
    data.then(function(data)
    {
        // console.log(data);
        if(data.length==0)
        {
            res.end("okk");
            return;
        }
        else{
            if(data[0].state=="Ordered")
            {
                res.end("ok");
                return;
            }
        }
        
    })
    
}