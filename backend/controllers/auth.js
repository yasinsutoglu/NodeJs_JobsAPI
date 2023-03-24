const User =require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken')

//!REGISTER CASE
const register = async (req,res)=>{
  // const {name,email,password} = req.body;

  //? bunun yerine mongoDB validator kullanmayı tercih ettik
  // if(!name || !email || !password){
  //   throw new BadRequestError('Please provide name,email and password')
  // }

  //? user model icinde pre middleware ile hallettik
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password,salt)
  // const tempUser = {name,email,password:hashedPassword}

  // const user = await User.create({...tempUser})

  const user = await User.create({ ...req.body });
  // const token = jwt.sign({userId:user._id, name:user.name},'jwtSecret',{expiresIn:'30d'})
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

//!LOGIN CASE
const login = async (req, res) => {
  const {email,password} = req.body;

  if(!email || !password){
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({email}); 
  
  if(!user){
    throw new UnauthenticatedError('Invalid Credentials');
  }
  
  const isPasswordCorrect = await user.comparePassword(password)
  //compare password
   if (!isPasswordCorrect) {
     throw new UnauthenticatedError("Invalid Credentials");
   }

const token = user.createJWT();
res.status(StatusCodes.OK).json({ user: { name: user.name }, token });

};


module.exports={register,login}