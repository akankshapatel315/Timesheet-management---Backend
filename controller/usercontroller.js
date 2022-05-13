const User = require("../models/user");

exports.register =
 
  (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        res.send({ message: "User already registerd" });
      } else {
        const users = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phone: req.body.phone,
          email: req.body.email,
          country: req.body.country,
          state: req.body.state,
          city: req.body.city,
          position: req.body.position,
          technology: req.body.technology,
          password: req.body.password,
          gender: req.body.gender,
        });
        console.log(users);
        users.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Successfully Registerd, Please Login Now" });
          
          }
        });
      }
    });
  }

exports.login =
  ("/login",
  (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        if (password === user.password) {
          res.status(200).send({ message: "Login Sucessful", user: user });
        } else {
          res.status(401).send({ message: "Wrong password" });
        }
      } else {
        res.status(404).send({ message: "User not registered" });
      }
    });
  });
