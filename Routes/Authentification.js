const router = require("express").Router();
const User = require("../Models/User");


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/login', async(req, res) => {
    console.log("ok")
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body.email)
    const emailExist = await User.findOne({ email: email });
    if (!emailExist) {
        return res.status(400).send({ message: 'invalid email' });
    }
    const user = await User.findOne({ email: email });
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        return res.status(400).send({ message: 'invalid password' });
    }


    const token = jwt.sign({ user }, "oussamaridene", {
        expiresIn: 86400
    });
    console.log(user)
    await res.status(200).send({
        _id: user._id,
        email: user.email,
        accessToken: token,
        name: user.name,


    });

});




router.post('/register', async(req, res) => {

        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            console.log("hi")

            return res.status(400).send({ message: 'email exist' });
        }
        console.log(req.body.email)
        console.log("hiii")
        console.log(req.body.prenom)
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = new User({
            name: req.body.name,

            email: req.body.email,
            password: req.body.password,
        });
        console.log(user)
        try {

            const newUser = await user.save()
            if (newUser) {
                res.status(201).json({ user: newUser })
            }



        } catch (err) {
            if (err.code === 11000) {
                res.json({ isemail: true });
            }
        }
    }),





    router.get('/:id', getUser, (req, res) => {
        console.log("hello", res.user);
        sendmail(res.user.email);
        res.send(res.user);


    });
async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id)
        if (user == null)
            return res.status(404).json({ message: "no data" })


    } catch (err) {
        return res.status(500).json({ message: err.message })

    }

    res.user = user
    next()
}







module.exports = router;