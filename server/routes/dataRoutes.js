const express = require('express');
const router = express.Router();
const { getProjects, getSkills } = require('../controllers/dataController');

router.get('/projects', getProjects);
router.get('/skills', getSkills);

module.exports = router;
