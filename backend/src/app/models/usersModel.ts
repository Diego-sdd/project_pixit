
import knex from '../../database/knex'

class UserModel {
  async getUserRegister (email: String) {
    const resultUser = await knex('tb_users')
      .select('*')
      .where('email', email)

    return resultUser
  }

  async insertUser (email: String, password: String, name: String) {
    const resultRegiterUser = await knex('tb_users')
      .insert({
        email,
        password,
        name
      })
    return resultRegiterUser
  }
}

export default new UserModel()
