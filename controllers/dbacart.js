const connection=require("./connection");
function find(id,email)
{
    return new Promise(function(resolve,reject)
    {
          var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM cart where email="${email}" AND product_id="${id}" `, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(result);
              }
            });
          });
    })
}
function addtocart(email,id,q)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into cart values("${email}","${id}",${q})`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(1);
              }
            });
          });
    })
}
function find_item(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from products join cart on products.product_id=cart.product_id where cart.email="${email}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })
}
function delete_one(email,id)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`delete from cart where email="${email}" AND product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(1);
            }
          });
        });
  })
}
function update_one(email,id,q)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`update cart set curr_quantity="${q}" where email="${email}" AND product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(1);
            }
          });
        });
  })  
}
function clear_cart(email,id)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`delete from cart where email="${email}" AND product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
              if(JSON.parse(JSON.stringify(result)).length!=0)
              {
                resolve(1);
              } 
            }
          });
        });
  })
}
module.exports={find,addtocart,find_item,delete_one,update_one,clear_cart};