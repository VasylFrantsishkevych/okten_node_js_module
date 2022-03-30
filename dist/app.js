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
const path_1 = __importDefault(require("path"));
// import { engine } from 'express-handlebars';
const router_1 = require("./router");
const config_1 = require("./config/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'static')));
// app.set('views', path.join(__dirname, 'static'));
// app.engine('hbs', engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: 'views/layout' }));
// app.set('view engine', 'hbs');
app.use(router_1.apiRouter);
const { PORT } = config_1.config;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server has started on port: ${PORT}`);
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