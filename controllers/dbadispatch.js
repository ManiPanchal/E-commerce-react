const { json } = require("express");
const connection=require("./connection");
function find_dispatcher(email)
{
    return new Promise(function(resolve,reject)
    {
          var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM dispatchers where email="${email}"  `, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(JSON.parse(JSON.stringify(result)));
              }
            });
          });
    })
}
module.exports={find_dispatcher};