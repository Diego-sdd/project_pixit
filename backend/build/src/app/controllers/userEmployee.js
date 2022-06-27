"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const usersEmployeeModel_1 = __importDefault(require("../models/usersEmployeeModel"));
class UserEmployee {
    async getUsers(request, response) {
        const { userId } = request.res;
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }
        try {
            const result = await usersEmployeeModel_1.default.getUserRegister(userId);
            return response.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }
    async register(request, response) {
        const { phone, office, name } = request.body;
        const { userId } = request.res;
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }
        if (!phone || !office || !name) {
            return response.status(404).json({ body: 'missing information' });
        }
        try {
            const resultInsert = await usersEmployeeModel_1.default.insertUser(phone, office, name, userId);
            return response.status(200).json(resultInsert);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }
    async deleteUserEmployee(request, response) {
        const { idUserData } = request.body;
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(422).json({ errors: errors.array() });
        }
        try {
            const result = await usersEmployeeModel_1.default.deletedUserRegister(idUserData);
            return response.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    }
}
exports.default = new UserEmployee();
