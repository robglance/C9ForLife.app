const path = require('path');

const express = require('express');

const madController = require('../controllers/mad');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/dashboard', isAuth, madController.getDashboard)
router.get('/contact', madController.getContact)
router.get('/about', madController.getAbout)
router.get('/activities', isAuth, madController.getActivities)
router.get('/motivation', isAuth, madController.getMotivation)
router.post('/bucket', isAuth, madController.postBucket)
router.post('/bucket-delete-item', isAuth, madController.postBucketDeleteActivity)
router.post('/create-toDo', isAuth, madController.postToDo)
router.post('/toDo-delete', isAuth, madController.postToDoDelete)
router.post('/completed', isAuth, madController.postCompleted)
router.post('/archive', isAuth, madController.postArchive)
router.post('/archives', isAuth, madController.postUserArchives)
router.post('/user-idea', isAuth, madController.postUserIdea)

module.exports = router;