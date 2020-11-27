const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const {OAuth2Client} = require('google-auth-library');

class UserController {

  static async register(req, res, next) {
    try {
      const {email, password} = req.body;
      const payload = {
        email,
        password
      };
      const user = await User.create(payload);
      res.status(201).json({
        id: user.id,
        email: user.email
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const payload = {
        email,
        password
      };
      const user = await User.findOne({ where: {email: payload.email} });
      
      if (!user) {
        throw { msg: `Invalid email or password!`, status: 401 };
      } else if (!comparePassword(payload.password, user.password)) {
        throw { msg: `Invalid email or password!`, status: 401 };
      } else {
        console.log('sampe')
        const access_token = signToken({
          id: user.id,
          email: user.email
        });
        res.status(201).json({ access_token });
       
      }
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req,res,next){
    const client = new OAuth2Client(process.env.CLIENT_ID);
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.access_token,
        audience: process.env.CLIENT_ID, 
      });
      let payload = ticket.getPayload()
      let isRegistered = await User.findOne({
          where:{
              email: payload.email
          }
      })
      if(isRegistered){
        let access_token = signToken({id: isRegistered.id , email: isRegistered.email})
        console.log('login');
        res.status(200).json({access_token})
      }else{
          console.log('register');
          let newUser = await User.create({
              email: payload.email,
              password: process.env.GOOGLE_PASSWORD
          })
          let access_token = signToken({id: newUser.id , email: newUser.email})
          res.status(200).json({access_token})
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = UserController;