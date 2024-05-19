const express = require('express')
const router = express.Router()
const artifactsController = require('../controller/artifactsController')

router.route('/')
.get(artifactsController.getAllArtifacts)
.post(artifactsController.createNewArtifact)
.patch(artifactsController.updateArtifact)
.delete(artifactsController.deleteArtifact)

router.route('/:id')
.get(artifactsController.getArtifactById)

module.exports = router