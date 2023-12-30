const dbaorders=require("./dbaorders");
const findall=dbaorders.find_item;
module.exports=(req,res)=>{
    if(req.userId)
    {
        let data=findall(req.userId)
        data.then(function(data)
        {
            res.send(JSON.stringify(data));
            return;
        })
    }
    else{
        res.status(401).end();
        return;
    }
}