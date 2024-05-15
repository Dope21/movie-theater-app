import { Router } from 'express'

import controllers from '../controllers'

const router = Router()

router
  .get('/users/:id', controllers.user.getById)
  .get('/movies', controllers.movie.getAll)
  .get('/movies/:id', controllers.movie.getById)

export default router
