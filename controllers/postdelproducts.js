const dbaproduct=require("./dbaproduct");
const getpro=dbaproduct.getpro;
const getprod=dbaproduct.getprod;
module.exports=(req,res)=>{
    const arr=[];
    // console.log(req.session.email);
    // console.log(req.userId);
    let data=getpro(req.userId)
    data.then(function(data)
    {
        if(data.length>0)
        {
            for(let i=0;i<data.length;i++)
            {
                // console.log(data[i]);
                arr.push(data[i]);
                // console.log(arr);
            }
            // arr.push(data);
            // console.log(arr);
            // console.log(data);
        }
        res.send(JSON.stringify(arr));
        return;
    })
    // let data2=getprod(req.session.email)
    // data2.then(function(data2)
    // {
    //     if(data2.length>0)
    //     {
    //         for(let i=0;i<data2.length;i++)
    //         {
    //             arr.push(data2[0]);
    //         }
    //         // console.log(data2);
    //         // arr.push(data2);
    //         // console.log(arr);
    //     }
    //     // console.log(arr);
    // res.send(JSON.stringify(arr));
    // return;
    // })
    
}