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
const express_1 = __importDefault(require("express"));
const connectToDB_1 = __importDefault(require("./database/connectToDB"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const content_routes_1 = __importDefault(require("./routes/content.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/user', user_routes_1.default);
app.use('/api/v1/content', content_routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Server is running on http://localhost:3000');
    yield (0, connectToDB_1.default)();
}));
