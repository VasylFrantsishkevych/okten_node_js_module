"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, typeorm_1.getManager)().getRepository(user_1.User).find({ relations: ['posts'] });
    console.log(users);
    res.json(users);
    // const users = await getManager().getRepository(User).findOne();
    // console.log(users);
    // res.json(users);
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUser = yield (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
    res.json(createUser);
}));
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    const createdUser = yield (0, typeorm_1.getManager)().getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(createdUser);
}));
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield (0, typeorm_1.getManager)().getRepository(user_1.User)
        .delete({ id: Number(req.params.id) });
    res.json(deleteUser);
}));
app.listen(5500, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Server has started!!!');
    try {
        const connection = yield (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connection');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
}));
//# sourceMappingURL=app.js.map