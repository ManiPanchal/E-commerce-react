const dbacart=require("./dbacart");
const find_one=dbacart.find;
const create_new=dbacart.addtocart;
module.exports=(req,res)=>{
            if(req.userId)
            {
              
                let product=find_one(req.body.product_id,req.userId)
                product.then(function(product)
                {
                  
                    if(product.length!=0)
                      {
                        res.status(402).end();
                        //  res.end("already");
                         return;
                      }
                      else {
                        let data=create_new(req.userId,req.body.product_id,1)
                         data.then(function()
                         {
                            // res.end("okk");
                            res.status(403).end();
                            return;
                          })
                        }
                  })   
            }
            else{
                // res.end("ok");
                res.status(404).end();
                return;
            }
    }
    