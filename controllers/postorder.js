const dbacart=require("./dbacart");
const find_price=dbacart.find_item;
const dbaorders=require("./dbaorders");
const find_item=dbaorders.find_item;
const dbauserinfo=require("./dbauserinfo");
const getuser=dbauserinfo.getuser;
module.exports=(req,res)=>{
    const arr=[];
    let info=getuser(req.userId)
    info.then(function(info)
    {
        // console.log(info);
        // console.log("info");
        if(info.length==0)
        {
            res.end("ok");
            return;
        }
        arr.push(info);
    // })
    let data=find_price(req.userId)
    data.then(function(data)
    {
        // console.log(data);
        if(data.length==0)
        {
            let data2=find_item(req.userId)
            data2.then(function(data2)
            {
                arr.push(data2);
                res.send(JSON.stringify(arr));
                return;
            })
        }
        else{
            arr.push(data);
            res.send(JSON.stringify(arr));
            return;
        }
        
    })
    data.catch(function(err)
    {
        console.log(err);
    })
})
}