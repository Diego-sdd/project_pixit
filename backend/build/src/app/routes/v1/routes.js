"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const usersController_1 = __importDefault(require("../../controllers/usersController"));
const userEmployee_1 = __importDefault(require("../../controllers/userEmployee"));
const router = express_1.default.Router();
router.post('/registerUser', usersController_1.default.index);
router.get('/loginUser', usersController_1.default.login);
router.post('/registerUserEmployee', auth_1.default, userEmployee_1.default.register);
router.get('/getUserEmployee', auth_1.default, userEmployee_1.default.getUsers);
router.delete('/deleteUserEmployee', auth_1.default, userEmployee_1.default.deleteUserEmployee);
exports.default = router.use('/v1', router);
