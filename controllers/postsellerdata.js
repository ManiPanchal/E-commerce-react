const { response } = require("express");
const dbaseller=require("./dbaseller");
const insert=dbaseller.insert;
const dbauser=require("./dbauser");
const check=dbauser.finduser;
module.exports=async(req,res)=>{
    console.log(req.body);
    let data2=await check(req.body.email);
    if(data2==1)
    {
        res.status(202).end();
        return; 
    }
        else{
            let data3=await dbaseller.find_seller(req.body.email);
            console.log(data3);
                if(data3==1)
                {
                    // res.end("okkk");
                    res.status(203).end();
                    return;
                }
                else if(data3==2){
                    console.log("i");
                    let data=await insert(req.body.name,req.body.email,req.body.aadhar,req.body.password);
                        if(data==1)
                        {
                            res.status(204).end();
                            return;
                        }
                    }
                }
}
                    
                
           
    
