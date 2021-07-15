const User = require('../db/Shemas/usersModel')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../services/serviceEmail')

const findUserByEmail = async email => {
  return await User.findOne({ email, verify: true })
}

const addUser = async body => {
  const verifyToken = nanoid()
  const { email } = body
  await sendEmail(verifyToken, email)
  const user = await User({ ...body, verifyToken })
  return user.save()
}

const findUserById = async id => {
  return await User.findOne({ _id: id })
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const getCurrentUser = async id => {
  return await User.findOne({ _id: id }, 'email')
}

module.exports = {
  findUserByEmail,
  addUser,
  findUserById,
  updateToken,
  getCurrentUser,
}
