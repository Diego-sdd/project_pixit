"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../../database/knex"));
class UserEmployeeModel {
    async getUserRegister(fk_id_user) {
        const resultUser = await (0, knex_1.default)('tb_employees')
            .select('*')
            .where('fk_id_user', fk_id_user);
        return resultUser;
    }
    async insertUser(phone, office, name, fk_id_user) {
        const resultRegiterUser = await (0, knex_1.default)('tb_employees')
            .insert({
            phone,
            office,
            name,
            fk_id_user
        });
        return resultRegiterUser;
    }
    async deletedUserRegister(id) {
        const resultDeletedUser = await (0, knex_1.default)('tb_employees')
            .delete("*")
            .where({ id });
        return resultDeletedUser;
    }
}
exports.default = new UserEmployeeModel();
