const {validateTokenHandler} = require('../../middleware/validateTokenHandler');

const express = require('express');

const {candidateRoleHandler} = require('../../middleware/candidate/candidateRoleHandler');

const {getCandidates, createCandidate, getCandidate, updateCandidate, deleteCandidate} = require('../../controllers/candidate/candidateController');

const router = express.Router();

router.use(validateTokenHandler);

router.use(candidateRoleHandler);

router.route('/').get(getCandidates).post(createCandidate);

router.route('/:id').get(getCandidate).put(updateCandidate).delete(deleteCandidate);

module.exports = router;