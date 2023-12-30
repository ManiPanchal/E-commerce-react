const connection=require("./connection");
function product_five(x)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM products where flag="A" limit 5 offset ${x}`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })

}
function find_all()
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM products`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })
}
function create_new(ob)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`Insert into products values("${ob.productname}","${ob.price}",${ob.price,ob.quantity},"${ob.product_id}","${ob.details}","${ob.image}","${ob.s_email}","R")`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(1);
              }
            });
          });
    })
}
function delete_one(id)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            
            if (err) throw err;
            con.query(`update products set flag="D" where product_id="${id}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(1);
              }
            });
          });
    })
}
function update_one(id,productname,discription,price,quantity)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`update products set productname="${productname}",details="${discription}",price="${price}",quantity="${quantity}" where product_id="${id}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(1);
              }
            });
          });
    })
}
function find_product(id)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`select * from products where product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(JSON.parse(JSON.stringify(result)));
            }
          });
        });
  })
}
function update_pro(id,q)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`update products set quantity=${q} where product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(JSON.parse(JSON.stringify(result)));
            }
          });
        });
  })
}
function add_q(id,q)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`update products set quantity=quantity+${q} where product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
              resolve(1);
            }
          
          });
        });
  })
}
function getpro(email)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`SELECT * FROM products where s_email="${email}" AND (flag="D" OR flag="R")`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
              // console.log(result);
               resolve(JSON.parse(JSON.stringify(result)));
            }
          
          });
        });
  })
}
function getprod(email)
{
  return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM products where s_email="${email}" AND flag="R"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })
}
function update_flag(id)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`update products set flag="A" where product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(1);
            }
          });
        });
  })
}
function changestate(id,u_e,s,email)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`update orders set state="${s}" where product_id="${id}" AND s_email="${email}" AND email="${u_e}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(1);
            }
          
          });
        });
  })
}
function get_seller(email)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`SELECT * FROM products where s_email="${email}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(JSON.parse(JSON.stringify(result)));
            }
          
          });
        });
  }) 
}
function search(value)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`SELECT * FROM products where productname like "%${value}%"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(JSON.parse(JSON.stringify(result)));
            }
          
          });
        });
  }) 
}

module.exports={product_five,find_all,create_new,delete_one,update_one,find_product,update_pro,add_q,getpro,getprod,update_flag,changestate,get_seller,search};