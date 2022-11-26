const express = require('express');
// storing port number
const PORT=8899;
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/users'));

// setting view engine
app.set("view engine","pug");
app.set('views', './views');

//define routes
app.use("/css",express.static('public'))

//get home
app.get("/",(req,res)=>{
    res.render("home");
})

//get gallery
app.get("/gallery",(req,res)=>{
    res.render("gallery");
})

//get services
app.get("/services",(req,res)=>{
    res.render("services");
})

//get contactUs
app.get("/contactUs",(req,res)=>{
    res.render("contactUS");
})

//get contactDetails
app.get("/contactDetails",(req,res)=>{
var ref = fs.readFileSync('./public/details.txt').toString().split('\n');
    res.render("ContactDetails",{file:ref});
})

app.get("/aboutUs",(req,res)=>{
    res.render("aboutUS");
})

//post data from form
app.post("/postdata",(req,res)=>{
// Importing data from form
    let firstName=req.body.firstName;
    let email=req.body.email;
    let mobileNum=req.body.mobileNum;
    let address=req.body.address;
// Storing data into variable
        var data = firstName+', '+ email+', '+mobileNum+', '+address+'\n';
// Appending data into details txt file
        fs.appendFile('./public/details.txt',data, (err)=>{
            if(err) throw err
        })
//  Sending success message 
        res.send('Data stored successfully');
})
// Running server
app.listen(PORT, (err)=>{
    if(err) throw err;
    else console.log(`server works on ${PORT}`);
})


