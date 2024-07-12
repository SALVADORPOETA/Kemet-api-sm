import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get route of current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const godsFilePath = path.resolve(__dirname, '../routes/gods.json')

let gods = []

// Load gods from file
const loadGods = () => {
  try {
    const dataBuffer = fs.readFileSync(godsFilePath)
    const dataJSON = dataBuffer.toString()
    gods = JSON.parse(dataJSON)
  } catch (e) {
    gods = []
  }
}

// Save gods to file
const saveGods = () => {
  const dataJSON = JSON.stringify(gods, null, 2)
  fs.writeFileSync(godsFilePath, dataJSON)
}

// Get all
export const getGods = (req, res) => {
  loadGods()
  res.send(gods)
}

// Get by id
export const getGod = (req, res) => {
  const { id } = req.params
  loadGods()
  const foundGod = gods.find((god) => god.id == id)
  res.send(foundGod)
}

// Post
export const createGod = (req, res) => {
  const god = req.body
  loadGods()
  gods.push(god)
  saveGods()
  res.send(`God with the name ${god.name} added to the database!`)
}

// Delete
export const deleteGod = (req, res) => {
  const { id } = req.params
  loadGods()
  gods = gods.filter((god) => god.id != id)
  saveGods()
  res.send(`User with the id ${id} deleted from the database.`)
}

// Patch
export const updateGod = (req, res) => {
  const { id } = req.params
  const { name, form, image, description } = req.body
  loadGods()
  const god = gods.find((god) => god.id == id)

  if (name) god.name = name
  if (form) god.form = form
  if (image) god.image = image
  if (description) god.description = description

  saveGods()
  res.send(`God with the id ${id} has been updated`)
}
