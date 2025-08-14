"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Selection_js_1 = require("./ga/Selection.js");
const replacement_js_1 = require("./ga/replacement.js");
const index_js_1 = __importDefault(require("./ga/index.js"));
const utils_js_1 = require("./utils.js");
const index_js_2 = __importDefault(require("./es/index.js"));
exports.default = {
    GeneticAlgorithm: index_js_1.default,
    EvolutionStrategies: index_js_2.default,
    Utils: utils_js_1.Utils,
    Selection: {
        RouletteSelection: Selection_js_1.RouletteSelection,
        TournamentSelection: Selection_js_1.TournamentSelection,
        RankSelection: Selection_js_1.RankSelection,
        RandomSelection: Selection_js_1.RandomSelection
    },
    Replacement: {
        FullReplacement: replacement_js_1.FullReplacement,
        ElitismReplacement: replacement_js_1.ElitismReplacement,
        SteadyStateReplacement: replacement_js_1.SteadyStateReplacement
    }
};
