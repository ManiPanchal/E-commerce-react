const dbaseller=require("./dbaseller");
const fun_block=dbaseller.fun_block;
const sendMail=require("../methods/sendmail");
module.exports=(req,res)=>{
    let data=fun_block(req.body.email)
    data.then(function(data){
        if(data==1)
        {
            sendMail(req.body.email,null,`<p>Sorry to inform You but you are Blocked as seller from E-MART your account is restored as soon as possible</p>`,function(err,data)
            {
                if(err)
                {
                    res.end("okk");
                    return;
                }
                else{
                    res.end("ok");
                    return;
                }
            })
           
        }
    })
    data.catch(function(err)
    {
        console.log(err);
    })
}