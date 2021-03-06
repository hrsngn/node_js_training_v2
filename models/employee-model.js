'use strict';

const mongoose = require('mongoose');
const MODEL_NAME = 'employee';

// Define Employee Schema
const EmployeeSchema = mongoose.Schema({
  // _id:{
  //   type: Number,
  //   // required: true,
  // },
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true
  }
});

const Employee = mongoose.model(MODEL_NAME, EmployeeSchema);

module.exports = Employee;
