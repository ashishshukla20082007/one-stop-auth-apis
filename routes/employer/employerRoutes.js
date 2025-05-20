const {validateTokenHandler} = require('../../middleware/validateTokenHandler');

const {employerRoleHandler} = require('../../middleware/employer/employerRoleHandler');

const express = require('express');

const {getEmployers, createEmployer, getEmployer, updateEmployer, deleteEmployer} = require('../../controllers/employer/employerController');

const router = express.Router();

router.use(validateTokenHandler);

router.use(employerRoleHandler);

router.route('/').get(getEmployers).post(createEmployer);

router.route('/:id').get(getEmployer).put(updateEmployer).delete(deleteEmployer);

module.exports = router;