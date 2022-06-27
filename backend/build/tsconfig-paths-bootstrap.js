"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsconfig_json_1 = __importDefault(require("./tsconfig.json"));
const tsconfig_paths_1 = __importDefault(require("tsconfig-paths"));
const paths = tsconfig_json_1.default.compilerOptions.paths;
tsconfig_paths_1.default.register({
    baseUrl: tsconfig_json_1.default.compilerOptions.outDir,
    paths: Object.keys(paths).reduce((agg, key) => (Object.assign(Object.assign({}, agg), { [key]: paths[key].map(p => p.replace(tsconfig_json_1.default.compilerOptions.baseUrl, tsconfig_json_1.default.compilerOptions.outDir)) })), {})
});
