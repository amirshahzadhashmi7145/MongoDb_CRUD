const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const Item = require('./model/Item');
const User = require('./model/user');
const db = require('./db')
const secret = process.env.SECRET_KEY;

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

db()

//user routes
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await new User({name,email,password:hashedPassword}).save()
        res.status(201).json({"User Created Successfully": user.email})
    } catch (error) {
        res.status(400).json({"Error": error.message})
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            res.status(401).json({"Error": "User Not Found"})
        }
        if (user && await bcrypt.compare(password,user.password)){
            req.session.user = { id: user._id, name: user.name, email: user.email }; // Store minimal data in session
            res.status(200).json({ message: 'Login successful', user: req.session.user });
        } else {
            res.status(401).json({message: "Invalid Credentials"})
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Internel Server Error"})
    }
})

app.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) {
            res.status(500).json({message: 'Logout failed'})
        } else {
            res.clearCookie('connect.sid'); // Clear session cookie
            res.json({message: "Logout successfully"})
        }
    });
})

app.get('/session', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});


app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

app.put('/items/:id', async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
});

app.delete('/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
});

// Start Server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
