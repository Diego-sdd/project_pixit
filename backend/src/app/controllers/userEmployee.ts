import { validationResult } from 'express-validator'
import UsersEmployeeModel from '../models/usersEmployeeModel'
class UserEmployee {
  async getUsers (request, response) {
    const { userId } = request.res
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() })
    }
    try {
      const result = await UsersEmployeeModel.getUserRegister(userId)

      return response.status(200).json(result)
    } catch (error) {
      console.log(error)
      return response.status(500).json(error)
    }
  }

  async register (request, response) {
    const {
      phone,
      office,
      name
    } = request.body

    const { userId } = request.res

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() })
    }

    if (!phone || !office || !name) {
      return response.status(404).json({ body: 'missing information' })
    }

    try {
      const resultInsert = await UsersEmployeeModel.insertUser(phone,
        office, name, userId)

      return response.status(200).json(resultInsert)
    } catch (error) {
      console.log(error)
      return response.status(500).json(error)
    }
  }

  async deleteUserEmployee (request, response) {
    const {
      idUserData
    } = request.body
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() })
    }
    try {
      const result = await UsersEmployeeModel.deletedUserRegister(idUserData)

      return response.status(200).json(result)
    } catch (error) {
      console.log(error)
      return response.status(500).json(error)
    }
  }
}
export default new UserEmployee()
