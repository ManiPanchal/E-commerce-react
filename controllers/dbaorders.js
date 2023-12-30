const { json } = require("express");
const connection=require("./connection");

function insert_item(email,id,data,q,s_email,date)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into orders values("${email}","${id}","${q}","${date}","${s_email}","${data}",null,null,null)`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(1);
              }
            });
          });
    })
}
function find_state(email,id)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`select * from orders where email="${email}" AND product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(JSON.parse(JSON.stringify(result)));
            }
          
          });
        });
  })
}
function del(id,email)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`delete  from orders where email="${email}" AND product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               if(JSON.parse(JSON.stringify(result)).length==0)
               {
                   resolve(2);
               }
               else{
                resolve(1);
               }
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
          con.query(`select * from products join orders on products.product_id=orders.product_id where orders.email="${email}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(JSON.parse(JSON.stringify(result)));
            }
          });
        });
  })
}
function change(id,email,s)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`update orders set state="${s}" where email="${email}" AND product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(1);
            }
          });
        });
  })
}
function find()
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`select * from orders join products on orders.product_id=products.product_id join user_info on orders.email=user_info.email `, function (err, result, fields) {
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
function find_st(email,id)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`select * from products join orders on products.product_id=orders.product_id join user_info on orders.email=user_info.email where orders.email="${email}" AND orders.product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(JSON.parse(JSON.stringify(result)));
            }
          });
        });
  })
}
function add_date(email,id,d)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`update orders set seller_d="${d}" where email="${email}" AND product_id="${id}" AND seller_d is null`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(1);
            }
          });
        });
  })
}
function add_s_date(id,email,d)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`update orders set state_d="${d}" where email="${email}" AND product_id="${id}" AND state_d is null`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(1);
            }
          });
        });
  })
}
function add_c_date(id,email,d)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`update orders set city_d="${d}" where email="${email}" AND product_id="${id}" AND city_d is null`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(1);
            }
          });
        });
  })
}
function find_count(id,email)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`select sum(quantity) as quantity from orders where product_id="${id}" AND s_email="${email}" AND city_d is not NULL AND state_d is not NULL AND seller_d is not NULL`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(JSON.parse(JSON.stringify(result)));
            }
          });
        });
  })
}
function find_orderby(email)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`SELECT * from products join orders on products.product_id=orders.product_id where products.s_email="${email}" group by orders.product_id`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(JSON.parse(JSON.stringify(result)));
            }
          });
        });
  })
}
module.exports={insert_item,find_state,del,find_item,change,find,find_st,add_date,add_s_date,add_c_date,find_count,find_orderby};
