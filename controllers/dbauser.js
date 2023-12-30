const connection=require("./connection");
function finduser(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM user where email="${email}"`, function (err, result, fields) {
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
function createuser(user)
{
    
      return new Promise(function(resolve,reject)
      {
        var con=connection();
        con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into user values("${user.name}","${user.email}","${user.password}",${user.isvalid},"${user.mailToken}","${user.role}")`,function (err,result,fields)
            {
                if(err) return reject(err);
                if(result){
                    resolve(1);
                }
               
            });
          });
      })
      
}
function find_token(token)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM user where mailToken="${token}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(1);
              }
            });
          });
    })
   
}
function update_valid(token,t)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`update user set isvalid="${t}" where mailToken="${token}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                resolve(1);
              }
            });
          });
    })
   
}
function data_from_table(token)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from user where mailToken="${token}"`, function (err, result) {
              if (err) return reject(err);
              if(result)
              {
                resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })
   
}
function find_user(name,email,password)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from user where name="${name}" AND email="${email}" AND password="${password}"`, function (err, result) {
              if (err) return reject(err);
              if(result)
              {
                resolve(JSON.parse(JSON.stringify(result)));
              }
              
            });
          });
    })
}
function update_pas(email,p)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`update user set password="${p}" where email="${email}"`, function (err, result) {
              if (err) return reject(err);
              if(result)
              {
                resolve(1);
              }
              
            });
          });
    })
}
function find(email)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from user where email="${email}"`, function (err, result) {
              if (err) return reject(err);
              if(result)
              {
                resolve(JSON.parse(JSON.stringify(result)));
              }
              
            });
          });
    })
}
function findout(token)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from user where mailToken="${token}"`, function (err, result, fields) {
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
          con.query(`select * from user`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(JSON.parse(JSON.stringify(result)));
            }
          
          });
        });
  })
}
function update_role(role,email)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`update user set role="${role}" where email="${email}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
               resolve(1);
            }
          
          });
        });
  })
}
function find_admin(email)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`SELECT * FROM user where email="${email}" AND role="Admin"`, function (err, result, fields) {
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
module.exports={finduser,createuser,find_token,update_valid,data_from_table,find_user,update_pas,find,findout,find_all,update_role,find_admin};
