"use strict";

const mongoose = require('mongoose');
const Employee = require(`../models/employee-model`);

class EmployeesRepository {
  constructor(mongodbUrl) {
    this.mongodbUrl = mongodbUrl;
  }

  /**
   * A helper method for creating Product record on mongoDB
   * @param {*} request - Request body containing JSON object which represent a new Product record to be saved.
   */
  createEmployee(request) {
    return new Promise((resolve, reject) => {
      // Instantiate Product Model by specified request body
      const newEmployee = new Employee(request);

      // Validate the model instance and handle the validation error's response.
      const errValidation = newEmployee.validateSync();
      if (errValidation) {
        console.log(`[ERROR] - <EmployeesRepository.createEmployee> details: \n`, errValidation);
        return reject({ error: errValidation, message: 'Unable to create a new Employee.', status: 400});
      }

      // Connect to MongoDB using mongoose
      mongoose.connect(this.mongodbUrl);
      const db = mongoose.connection;

      db.on(`error`, (err) => {
        console.log(`[ERROR] - <EmployeesRepository.createEmployee> details: \n`, err);
        return reject({ error: err, message: 'Unable to connect to database.', status: 500});
      });

      // Save the Employee instance into MongoDB server
      newEmployee.save((err, createdEmployee) => {
        // Disconnect from mongoDB
        mongoose.disconnect();

        // Handle error's response
        if (err) {
          console.log(`[ERROR] - <EmployeesRepository.createEmployee> details: \n`, err);
          return reject({ error: err, message: 'Unable to create a new Employee.', status: 400});
        }

        console.log(`[INFO] - <EmployeesRepository.createEmployee> Returning created record.`);
        resolve(createdEmployee);
      });
    });
  }

  getAll(filter={}) {
    return new Promise((resolve, reject) => {
      // Connect to MongoDB using mongoose
      mongoose.connect(this.mongodbUrl);
      const db = mongoose.connection;

      db.on(`error`, (err) => {
        console.log(`[ERROR] - <EmployeesRepository.getAll> details: \n`, err);
        return reject({ error: err, message: 'Unable to connect to database.', status: 500});
      });

      // findall
      Employee.find((err, employees) => {
        // Disconnect from mongoDB
        mongoose.disconnect();

        // Handle error's response
        if (err) {
          console.log(`[ERROR] - <EmployeesRepository.getAll> details: \n`, err);
          return reject(err);
        }

        resolve(employees);
      });
    });
  }

  getById(id){
    return new Promise((resolve, reject) => {
      // Connect to MongoDB using mongoose
      mongoose.connect(this.mongodbUrl);
      const db = mongoose.connection;

      db.on(`error`, (err) => {
        console.log(`[ERROR] - <EmployeesRepository.get> Details: \n`, err);
        reject({ error: err, message: 'Unable to connect to database.', status: 500});
      });

      Employee.findById(id, (err, employees) => {
        // console.log(id);
        // Disconnect from mongoDB
        mongoose.disconnect();

        if (err) {
          console.log(`[ERROR] - <EmployeesRepository.get> Details: \n`, err);
          return reject(err);
        }

        resolve(employees);
      });
    });
  }

  update(id, changedData) {
    return new Promise((resolve, reject) => {
      // console.log("oke");
      // Instantiate Product Model by specified request body
      const changedEmployee = new Employee(changedData);
      // Validate the model instance and handle the validation error's response.
      const errValidation = changedEmployee.validateSync();
      if (errValidation) {
        console.log(`[ERROR] - <ProductsRepository.update> details: \n`, errValidation);
        return reject({ error: errValidation, message: 'Unable to update a Product.', status: 400});
      }
      
      // Connect to MongoDB using mongoose
      mongoose.connect(this.mongodbUrl);
      const db = mongoose.connection;
      db.on(`error`, (err) => {
        console.log(`[ERROR] - <ProductsRepository.update> Details: \n`, err);
        reject({ error: err, message: 'Unable to connect to database.', status: 500});
      });
      
      Employee.findByIdAndUpdate(id, changedData, { new: true }, (err, updatedEmployee) => {
        // Disconnect from mongoDB
        mongoose.disconnect();

        if (err) {
          console.log(`[ERROR] - <ProductsRepository.update> Details: \n`, err);
          return reject(err);
        }
        console.log(`[DEBUG] - <ProductsRepository.update> updatedEmployee: \n`, updatedEmployee);
        return resolve(updatedEmployee);
      });
    });
  }

  delete(employeeId) {
    return new Promise((resolve, reject) => {
      // Connect to MongoDB using mongoose
      mongoose.connect(this.mongodbUrl);
      const db = mongoose.connection;

      db.on(`error`, (err) => {
        console.log(`[ERROR] - <EmployeeRepository.delete> Details: \n`, err);
        reject({ error: err, message: 'Unable to connect to database.', status: 500});
      });

      Employee.remove( { _id: employeeId }, (err)=>{
        // Disconnect from mongoDB
        mongoose.disconnect();

        if (err) {
          console.log(`[ERROR] - <EmployeeRepository.delete> Details: \n`, err);
          return reject(err);
        }

        resolve(null);
      });
    });
  }

}

module.exports = EmployeesRepository;