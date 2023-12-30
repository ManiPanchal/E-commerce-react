const express = require("express");
const session = require("express-session");
const cors=require("cors");
const jwt=require("jsonwebtoken");
const bodyParser = require('body-parser');
// const db=require("./models/db");
const ejs=require("ejs");
const multer=require("multer");
const sql=require("mysql");
const dba=require("./sql/db");
const app=express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true

}))
app.use(bodyParser.json());
app.use(cors());
app.get("/",(req,res)=>{
    
    res.send("Hlo");
})
const verifyJWT=(req,res,next)=>{
    const token=req.headers['x-access-token'];
    // console.log(token);
    if(!token)
    {
        res.send("we need token");
    }
    else{
        jwt.verify(token,"jwtSecret",(err,decoded)=>{
            // console.log(token);
            if(err)
            {
                // res.json({auth:false,message:"failed"});
                return res.status(401).json({ auth: false, message: 'Invalid token' });
            }
            else{
                req.userId=decoded.id;
                next();
            }
            
        })
    }
}

app.listen(8000,()=>
    {
        console.log("server at 8000");
    });
    const getlogin=require("./controllers/getlogin");
const postlogin=require("./controllers/postlogin");
// const getsignup=require("./controllers/getsignup");
const postsignup=require("./controllers/postsignup");
const getlogout=require("./controllers/getlogout");
// const getchangepassword=require("./controllers/getchangepassword");
const postchange=require("./controllers/postchange");
// const getforgot=require("./controllers/getforgot");
const postforgot=require("./controllers/postforgot");
const getproduct=require("./controllers/getproduct");
// const getviewcart=require("./controllers/getviewcart");
const postcreatecart=require("./controllers/postcreatecart");
const postcart=require("./controllers/postcart");
const postdeletefromcart = require("./controllers/postdeletefromcart");
const postplus=require("./controllers/postplus");
const postminus=require("./controllers/postminus");
// const getadmin = require("./controllers/getadmin");
const postadminproduct = require("./controllers/postadminproduct");
const postdeleteproduct = require("./controllers/postdeleteproduct");
const postupdateproduct = require("./controllers/postupdateproduct");
// const notfound = require("./controllers/notfound");
const getadmin_products = require("./controllers/getadmin_products");
const postaddproducts = require("./controllers/postaddproducts");
// const getverifymail = require("./controllers/getverifymail");
const forgot_token = require("./controllers/forgot_token");
// const homepage = require("./controllers/homepage");
const placeorder=require("./controllers/getplaceorder");
const postorder=require("./controllers/postorder");
const saveto_table=require("./controllers/saveto_table");
const updateproduct=require("./controllers/updateproducts");
// const getmanagerole=require("./controllers/getmanagerole");
const postmanage=require("./controllers/postmanage");
const update_role=require("./controllers/update_role");
// const postbutton=require("./controllers/postbutton");
// // const postcancelorder=require("./controllers/postcancelorder");
const postclearcart=require("./controllers/postclearcart");
// const getsignupseller=require("./controllers/getsignupseller");
const postsellerdata=require("./controllers/postsellerdata");
const rejectseller=require("./controllers/rejectseller");
// const blockseller=require("./controllers/blockseller");
// const getseller=require("./controllers/getseller");
const postproducts=require("./controllers/postproducts");
const postblockproducts=require("./controllers/postblockproducts");
// const getsellerdeleted=require("./controllers/getsellerdeleted");
const postdelproduct=require("./controllers/postdelproducts");
// const getexisting=require("./controllers/getexisting");
const postaccept=require("./controllers/postaccept");
// const getuserform=require("./controllers/getuserform");
const postsaveuser=require("./controllers/postuserinfo");
const postmyorders=require("./controllers/postmyorders");
// const getmyorders=require("./controllers/getmyorders");
// const getorder=require("./controllers/getorders");
const postorders_user = require("./controllers/postorders_user");
const postsellerdispatch=require("./controllers/sellerdispatch");
const postcancel=require("./controllers/postcancelorder");
// const getstate=require("./controllers/getstate");
// const getcity=require("./controllers/getcity");
const getProduct=require('./controllers/getproductdis');
const dispatchstate = require("./controllers/dispatchstate");
const getlast=require("./controllers/getlast");
const delivered = require("./controllers/delivered");
const rejectproduct=require("./controllers/rejectproduct");
const postgetuserinfo=require("./controllers/postgetuserinfo");
const updateuserinfo=require("./controllers/updateuserinfo");
const search=require("./controllers/search");
// const trackorder=require("./controllers/trackorder");
// const gettrackorder=require("./controllers/gettrackorder");
const gettrackproduct=require("./controllers/gettrackproduct");
// const sellerreport=require("./controllers/sellerreport");
// const findcount=require("./controllers/findcount");
const postorderfind=require("./controllers/postorderfind");
const postfinduser=require("./controllers/postfinduser");
// // const app = express();
// app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use('/',express.static('uploads'))
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true

// }))
// // app.use(function(req,res,next)
// // {
// //     console.log(req.method,req.url);
// //     next();
// // });
const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"uploads/profile");
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname);
    }
})

const upload=multer({storage:storage});
app.use(express.json());
// app.get("/", homepage);
app.get("/login",getlogin);
app.post("/login",postlogin);
// app.get("/signup",getsignup);
app.post("/signup",postsignup);
app.post("/logout", verifyJWT,getlogout);
// app.get("/changepassword",getchangepassword);
app.post("/addproducts",postaddproducts);
app.get("/admin_products",verifyJWT,getadmin_products);
// app.get("/forgot",getforgot);
app.post("/forgot",postforgot);
app.post("/change_password",verifyJWT,postchange);
app.get("/product",getproduct);
// app.get("/verifymail/:token",getverifymail);
app.get("/forgot/:token",forgot_token);
// app.get("/view_cart",getviewcart);
app.post("/create_cart",verifyJWT,postcreatecart);
app.post("/cart",verifyJWT,postcart);   
app.post("/delete_from_cart",verifyJWT,postdeletefromcart);
app.post("/plus",verifyJWT,postplus);
app.post("/minus",verifyJWT,postminus);
// app.get("/admin",getadmin);
app.post("/adminproduct",upload.single("pic"),verifyJWT,postadminproduct);
app.post("/deleteproduct",postdeleteproduct);
app.post("/updateproduct",postupdateproduct);
app.get("/placeorder",placeorder);
app.post("/postorder",verifyJWT,postorder);
app.post("/saveto_table",saveto_table);
app.post("/update_product",updateproduct);
// app.get("/managerole",getmanagerole);
app.post("/manage",postmanage);
app.post("/update_role",update_role);
// app.post("/button",postbutton);
// // app.post("/cancel_order",postcancelorder);
app.post("/clear_cart",verifyJWT,postclearcart);
// app.get("/signupas_seller",getsignupseller);
app.post("/seller_data",postsellerdata);
app.post("/reject",rejectseller);
// app.post("/block",blockseller);
// app.get("/seller",getseller);
app.post("/products",postproducts);
app.post("/blockproduct",postblockproducts);
// app.get("/deleted",getsellerdeleted);
app.post("/getdelproduct",verifyJWT,postdelproduct);
// app.get("/existing",getexisting);
app.post("/acceptproduct",postaccept);
// app.get("/buynow",getuserform);
app.post("/saveuser",verifyJWT,postsaveuser);
// app.get("/myorders",getmyorders);
app.post("/myorders",verifyJWT,postmyorders);
// app.get("/orderrequest",getorder);
app.post("/postorderrequest",verifyJWT,postorders_user);
app.post("/dispatchseller",verifyJWT,postsellerdispatch);
app.post("/cancelorder",verifyJWT,postcancel);
// app.get("/state",getstate);
// app.get("/city",getcity);
app.post("/getProduct",getProduct);
app.post("/dispatchstate",dispatchstate);
app.post("/getlast",verifyJWT,getlast);
app.post("/delivered",delivered);
app.post("/rejectproduct",rejectproduct);
app.post("/getuserinfo",verifyJWT,postgetuserinfo);
app.post("/updateuserinfo",verifyJWT,updateuserinfo);
app.post("/search",search);
// app.post("/trackorder",trackorder);
// app.get("/track",gettrackorder);
app.post("/gettrackproduct",verifyJWT,gettrackproduct);
// app.get("/report",sellerreport);
// app.post("/findcount",findcount);
app.post("/postorderfind",verifyJWT,postorderfind);
// app.get("*",notfound);
app.post("/finduser",verifyJWT,postfinduser);