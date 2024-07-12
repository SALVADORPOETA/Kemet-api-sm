import express from 'express'
import {
  getGods,
  getGod,
  createGod,
  deleteGod,
  updateGod,
} from '../controllers/gods.js'

const router = express.Router()

router.get('/', getGods)

router.get('/:id', getGod)

router.post('/', createGod)

router.delete('/:id', deleteGod)

router.patch('/:id', updateGod)

export default router
