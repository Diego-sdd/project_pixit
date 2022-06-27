
import knex from '../../database/knex'

class UserEmployeeModel {
  async getUserRegister(fk_id_user: Number) {
    const resultUser = await knex('tb_employees')
      .select('*')
      .where('fk_id_user', fk_id_user)

    return resultUser
  }

  async insertUser(phone: String, office: String, name: String, fk_id_user: number) {
    const resultRegiterUser = await knex('tb_employees')
      .insert({
        phone,
        office,
        name,
        fk_id_user
      })
    return resultRegiterUser
  }
  async deletedUserRegister(id: number) {
    const resultDeletedUser = await knex('tb_employees')
      .delete("*")
      .where({ id })
    return resultDeletedUser
  }
}

export default new UserEmployeeModel()
