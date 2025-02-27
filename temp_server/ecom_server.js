// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});


app.post('/users-username-email', (req, res) => {
     if (req.body.username || req.body.email ) {
         db.query('SELECT (Select count(UID) from users where UserName=?) As UserNameCount,(Select count(UID) from users where Email=?) As EmailCount;',[req.body.username,req.body.email], (err, results) => {
             console.log(err, results);
             if (err) {
                 res.status(500).send(err);
             } else {
                 if(results.length===0)
                 { 
                     res.statusMessage='RNF';
                     res.status(304).send({data:"Not Found"})
                 }
             }
             res.json(results);
         });
     }
});
app.post('/users', (req, res) => {
     if (req.body.username || req.body.email ) {
         db.query('SELECT * FROM users where UserName=? or Email=? ',[req.body.username,req.body.email], (err, results) => {
             console.log(err, results);
             if (err) {
                 res.status(500).send(err);
             } else {
                 if(results.length===0)
                 { 
                     res.statusMessage='RNF';
                     res.status(304).send({data:"Not Found"})
                 }
             }
             res.json(results);
         });
     }

});
app.post('/users-list',(req,res)=>{
	db.query('SELECT * FROM users', (err, results) => {
            console.log(err, results);
            if (err) {
                res.status(500).send(err);
            } else {
                if(results.length<=0)
                    res.status(304).send({data:"Not Found"})
            }
            res.json(results);
    });
});
app.post('/validate-user',(req,res)=>{
    const qry="SELECT UID,UserName,Email,Password from users where Email=? and Password=?";
    db.query(qry,[req.body.Email,req.body.Password],(err,results)=>{
        if(err)
            res.status(500).send(err);
        else
        {
            if(results.length==0)
                return res.status(409).send({data:'Not Found'})
            return res.json(results);
        }
    })
})
app.post('/delete-user',(req,res)=>{
    const qry="DELETE from users where UID=?";
    db.query(qry,[req.body.UID],(err,results)=>{
        if(err)
            res.status(500).send(err);
        else
        {
            if(results.affectedRows==0)
                return res.status(409).send({data:'Not Deleted'})
            return res.status(200).send({message:'deleted',results:results});
        }
    })
})
app.post('/create-user', (req, res) => {
    if(req.body.Form_Valid)
        {
			
    const qry="INSERT INTO `users`(`UserName`, `First_Name`, `Last_Name`, `Gender`, `Dob`, `Phone`, `Country_Code`, `Email`,`Password`, `Address`, `City`, `District`, `State`, `Pincode`, `Country`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
    const values=[req.body.UserName,req.body.First_Name,req.body.Last_Name,req.body.Gender,req.body.Dob,req.body.Phone,req.body.Country_Code,req.body.Email,req.body.Password,req.body.Address,req.body.City,req.body.District,req.body.State,req.body.Pincode,req.body.Country]
    db.query(qry,values,(err, results) => {
        console.log(err,results);
        if (err) {
			if(err.code=='ER_DUP_ENTRY')
				return res.status(409).send({err:err,message:'Account Already Exists'});
			res.status(409).send(err);
			
        } else {
            res.json(results);
        }
        
});
        }
        else
        {
            res.status(403).send({message:'Invalid Request'})
        }
});

app.use((req,res,next)=>{
    res.status(404).send(`<html><head><title>404 Not Found</title>
    </head>
    <style>
        *{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h1
        {
            font-size:5rem;
        }
        body
        {
            display:flex;
            justify-content:center;
            align-items:center;
            width:100%;
            height:80vh;
            overflow:hidden
        }
     
    </style>
    <body>
   <center> <main>
    <h1>404</h1>
    <h4>Page Not Found</h4>
    <b style='color:gray'>The Requested Resource could not be found on this Server!</b>
    </main></center>
    </body>
    </html>`)
})

app.listen(port, () => {
    console.log("Listening on "+port);
})
