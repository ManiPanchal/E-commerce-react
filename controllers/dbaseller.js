const e = require("express");
const connection=require("./connection");
function insert(name,email,aadhar,pass)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into sellers values("${name}","${email}","${Math.random()}","${aadhar}","NotVerified","${pass}")`, function (err, result, fields) {
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
function all()
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from sellers`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(JSON.parse(JSON.stringify(result)));
              }
            
            });
          });
    })
}
function updation(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`update sellers set is_verified="Verified" where s_email="${email}"`, function (err, result, fields) {
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
function del(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`Delete from sellers where s_email="${email}"`, function (err, result, fields) {
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
function fun_block(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`update sellers set is_verified="NotVerified" where s_email="${email}"`, function (err, result, fields) {
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
function find_seller(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from sellers  where is_verified="Verified" AND s_email="${email}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                if(JSON.parse(JSON.stringify(result)).length>0)
                {
                    resolve(1);
                }
                else{
                  resolve(2);
                }
              }
            
            });
          });
    })
}
function find(email,name,password)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from sellers  where is_verified="Verified" AND s_email="${email}" AND s_name="${name}" AND s_password="${password}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                resolve(JSON.parse(JSON.stringify(result)));
              }
            
            });
          });
    })
}
function find_order(email)
{
  return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * from products join orders on products.product_id=orders.product_id where products.s_email="${email}";`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                resolve(JSON.parse(JSON.stringify(result)));
              }
            
            });
          });
}
  )}
module.exports={insert,all,updation,del,fun_block,find_seller,find,find_order};