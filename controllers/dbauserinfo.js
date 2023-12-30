const connection=require("./connection");
function saveuserinfo(email,name,pincode,phone,state,city,add)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`insert into user_info values("${email}","${name}","${pincode}","${phone}","${state}","${city}","${add}")`, function (err, result, fields) {
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
}
 )}
 function getuser(email)
 {
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`select * from user_info where email="${email}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                resolve(JSON.parse(JSON.stringify(result)));  
              }
            });
          });
})
 }
 function find_user(city)
 {
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`select email from user_info where city="${city}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
              resolve(JSON.parse(JSON.stringify(result)));
               
            }
          });
        });
 })
}
function updateuserinfo(email,name,pincode,phone,state,city,add){
  return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`update user_info set name="${name}",pincode="${pincode}",phone="${phone}",state_name="${state}",city="${city}",street_add="${add}" where email="${email}"`, function (err, result, fields) {
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
 module.exports={saveuserinfo,getuser,find_user,updateuserinfo};