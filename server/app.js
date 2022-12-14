// Import All Dependencies
const dotenv = require('dotenv');
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

// Configure ENV File & Require Connection File
dotenv.config({path : './config.env'});
require('./db/conn');
const port = process.env.PORT;

// Require Model
const Users = require('./models/userSchema');
const Message = require('./models/msgSchema');
const Sprs = require('./models/sprSchema');
const Book = require('./models/bookSchema');
// const authenticate = require('./middleware/authenticate')

// These Method is Used to Get Data and Cookies from FrontEnd
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send("Hello World");
})

// Registration Of User
app.post('/register', async (req, res)=>{
    try {
        // Get body or Data
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const createUser = new Users({
            username : username,
            email : email,
            password : password
        });

        // Save Method is Used to Create User or Insert User
        // But Before Saving or Inserting, Password will Hash 
        // Because of Hashing. After Hash, It will save to DB
        const created = await createUser.save();
        console.log(created);
        res.status(200).send("Registered");

    } catch (error) {
        res.status(400).send(error)
    }
})

// Registration Of SPR
app.post('/SPRegister', async (req, res)=>{
    try {
        // Get body or Data
        const fname = req.body.fname;
        const lname = req.body.lname;
        const pnum = req.body.pnum;
        const gender = req.body.gender;
        const service = req.body.service;
        const experience = req.body.experience;
        const email = req.body.email;
        const password = req.body.password;

        const createSpr = new Sprs({
            fname : fname,
            lname : lname,
            pnum : pnum,
            gender : gender,
            service : service,
            experience : experience,
            email : email,
            password : password
        });

        // Save Method is Used to Create User or Insert User
        // But Before Saving or Inserting, Password will Hash 
        // Because of Hashing. After Hash, It will save to DB
        const created = await createSpr.save();
        console.log(created);
        res.status(200).send("Registered");

    } catch (error) {
        res.status(400).send(error)
    }
})

//login of user
app.post('/login', async (req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Find User if Exist
        const user = await Users.findOne({email : email});
        if(user){
            // Verify Password
            const isMatch = await bcryptjs.compare(password, user.password);

            if(isMatch){
                // Generate Token Which is Define in User Schema
                const token = await user.generateToken();
                res.cookie("jwt", token, {
                    // Expires Token in 24 Hours
                    expires : new Date(Date.now() + 86400000),
                    httpOnly : true
                })
                res.status(200).send("LoggedIn")
            }else{
                res.status(400).send("Invalid Credentials");
            }
        }else{
            res.status(400).send("Invalid Credentials");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})




// // login for spr

// app.post('/login', async (req, res)=>{
//     try {
//         const email = req.body.email;
//         const password = req.body.password;

//         // Find User if Exist
//         const spr = await Sprs.findOne({email : email});
//         if(spr){
//             // Verify Password
//             const isMatch = await bcryptjs.compare(password, spr.password);

//             if(isMatch){
//                 // Generate Token Which is Define in User Schema
//                 const token = await spr.generateToken();
//                 res.cookie("jwt", token, {
//                     // Expires Token in 24 Hours
//                     expires : new Date(Date.now() + 86400000),
//                     httpOnly : true
//                 })
//                 res.status(200).send("LoggedIn")
//             }else{
//                 res.status(400).send("Invalid Credentials");
//             }
//         }else{
//             res.status(400).send("Invalid Credentials");
//         }

        



//     } catch (error) {
//         res.status(400).send(error);
//     }
// })

// Message
app.post('/message', async (req, res)=>{
    try {
        // Get body or Data
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        const sendMsg = new Message({
            name : name,
            email : email,
            message : message
        });

        // Save Method is Used to Create User or Insert User
        // But Before Saving or Inserting, Password will Hash 
        // Because of Hashing. After Hash, It will save to DB
        const created = await sendMsg.save();
        console.log(created);
        res.status(200).send("Sent");

    } catch (error) {
        res.status(400).send(error)
    }
})

//Booking
app.post('/booking', async (req, res)=>{
    try {
        // Get body or Data
        const time = req.body.time;
        const add = req.body.add;
        const date = req.body.date;

        const sendBook = new Book({
            time : time,
            add : add,
            date : date
        });

        // Save Method is Used to Create User or Insert User
        // But Before Saving or Inserting, Password will Hash 
        // Because of Hashing. After Hash, It will save to DB
        const created = await sendBook.save();
        console.log(created);
        res.status(200).send("Sent");

    } catch (error) {
        res.status(400).send(error)
    }
})


// // Logout Page
// app.get('/logout', (req, res)=>{
//     res.clearCookie("jwt", {path : '/'})
//     res.status(200).send("User Logged Out")
// })

// // Authentication
// app.get('/auth', authenticate, (req, res)=>{

// })

// Run Server 
app.listen(port, ()=>{
    console.log("Server is Listening")
})


// Our Backend is Done And Store Data in Database
// Now Its Time to Connect Front End With BackEnd