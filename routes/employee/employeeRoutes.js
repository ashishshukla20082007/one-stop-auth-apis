const {validateTokenHandler} = require('../../middleware/validateTokenHandler');

const express = require('express');

const {employeeRoleHandler} = require('../../middleware/employee/employeeRoleHandler');

const {getEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee} = require('../../controllers/employee/employeeController');

const router = express.Router();

router.use(validateTokenHandler);

router.use(employeeRoleHandler);

router.route('/').get(getEmployees).post(createEmployee);

router.route('/:id').get(getEmployee).put(updateEmployee).delete(deleteEmployee);

module.exports = router;