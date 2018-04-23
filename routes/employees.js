"use strict";

var express = require("express");
var router = express.Router();
const EmployeesRepository = require(`../repositories/employee-repository`);

const MONGODB_URL = "mongodb+srv://Henri:henri123@mitraiscarrot-2oszm.mongodb.net/MitraisCarrot";

/**
 * Create POST Employee 
 * POST
 * path : /api/employees
 */
router.post("/add", async(req, res, next)=>{
    const repo = new EmployeesRepository(MONGODB_URL);
    try { 
        const createdEmployee = await repo.createEmployee(req.body);
        res.status(200).json(createdEmployee);
      } catch(err) {
        res.status(err.status).json(err);
      }
});

/**
 * Create GetAll Employee 
 * GET
 * path : /api/employees
 */
router.get("/",async(req,res,next)=>{
    const repo = new EmployeesRepository(MONGODB_URL);
    try { 
        const employees = await repo.getAll(req.body);
        res.status(200).json(employees);
      } catch(err) {
        res.status(err.status).json(err);
      }
});

router.get("/:employeeId", async (req, res, next) => {
  const id = req.params.employeeId;
  const repository = new EmployeesRepository(MONGODB_URL);
  try {
    const employees = await repository.getById(id);
    res.status(200).json(employees);
  } catch(err) {
    res.status(err.status).send(err);
  }
});

router.put("/:employeeId", async (req, res, next) => {
  try{
    const changedEmployee = await doUpdate(res, req);
    res.status(200).json(changedEmployee);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

router.patch("/:employeeId", async (req, res, next) => {
  try{
    const changedEmployee = await doUpdate(res, req);
    res.status(200).json(changedEmployee);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

router.delete("/:employeeId", async (req, res, next) => {
  const employeeId = req.params.employeeId;
  const repository = new EmployeesRepository(MONGODB_URL);
  try {
    await repository.delete(employeeId);
    res.status(200).json({});
  } catch(err) {
    return res.status(err.status).send(err);
  }
});

async function doUpdate(res, req) {
  const employeeId = req.params.employeeId;
  const changedEmployee = req.body;
  const repository = new EmployeesRepository(MONGODB_URL);
  return repository.update(employeeId, changedEmployee);
}

module.exports = router;