"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var PORT = process.env.PORT || "8900";
var HOST = process.env.HOST || "localhost";
app.use(body_parser_1["default"].json());
app.get("/", function (_req, res) { return res.send("Hello World!"); });
app.listen(PORT, function () { return console.log("starting app on: ".concat(HOST, ":").concat(PORT)); });
