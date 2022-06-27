"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../../database/knex"));
class UserModel {
    async getUserRegister(email) {
        const resultUser = await (0, knex_1.default)('tb_users')
            .select('*')
            .where('email', email);
        return resultUser;
    }
    async insertUser(email, password, name) {
        const resultRegiterUser = await (0, knex_1.default)('tb_users')
            .insert({
            email,
            password,
            name
        });
        return resultRegiterUser;
    }
}
exports.default = new UserModel();
