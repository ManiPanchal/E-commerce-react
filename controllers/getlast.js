const { find_item } = require("./dbaorders");
const dbadispatch=require("./dbadispatch");
const find=dbadispatch.find_dispatcher;
const dbauserinfo=require("./dbauserinfo");
const find_user=dbauserinfo.find_user;
module.exports=(req,res)=>{
    let data=find(req.userId)
    data.then(function(data)
    {
        if(data.length>0)
        {
            let data2=find_user(data[0].state_name)
            data2.then(function(data2)
            {
                if(data2.length>0)
                {
                    // console.log(data2);
                    for(let i=0;i<data2.length;i++)
                    {
                        let data3=find_item(data2[i].email)
                        data3.then(function(data3)
                        {
                            if(data3.length>0)
                            {
                                res.send(JSON.stringify(data3));
                                return;
                            }
    
                        })
                    }
                    
                    // res.send(JSON.stringify(data2));
                    // return;
                }
            })
        }
        // res.send(JSON.stringify(data));
        // return;
    })
}