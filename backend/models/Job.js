const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company name"],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, "Please provide position"],
    maxlength: 100,
  },
  status: {
    type: String,
    enum:['interview', 'declined', 'pending'],
    default:'pending',
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true, 'Please provide user']
  }
},{timestamps:true});
//!"createdAt": "2023-03-07T16:40:10.958Z", "updatedAt": "2023-03-07T16:40:10.958Z" ---> {timestamps:true} ile geldi

module.exports = mongoose.model('Job', JobSchema)