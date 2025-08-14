"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SteadyStateReplacement = exports.ElitismReplacement = exports.FullReplacement = void 0;
class FullReplacement {
    replace(oldPopulation, newPopulation, fitness) {
        return newPopulation;
    }
}
exports.FullReplacement = FullReplacement;
class ElitismReplacement {
    constructor(eliteCount) {
        Object.defineProperty(this, "eliteCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: eliteCount
        });
    }
    replace(oldPopulation, newPopulation, fitness) {
        const elites = oldPopulation.map((ind, idx) => ({
            ind, fitness: fitness[idx]
        }))
            .sort((a, b) => b.fitness - a.fitness)
            .slice(0, this.eliteCount)
            .map(e => e.ind);
        return [...elites, ...newPopulation.slice(0, oldPopulation.length - this.eliteCount)];
    }
}
exports.ElitismReplacement = ElitismReplacement;
class SteadyStateReplacement {
    constructor(replaceCount) {
        Object.defineProperty(this, "replaceCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: replaceCount
        });
    }
    replace(oldPopulation, newPopulation, fitness) {
        const survivors = oldPopulation.map((ind, idx) => ({
            ind, fitness: fitness[idx]
        }))
            .sort((a, b) => b.fitness - a.fitness)
            .slice(0, oldPopulation.length - this.replaceCount)
            .map(e => e.ind);
        return [...survivors, ...newPopulation.slice(0, this.replaceCount)];
    }
}
exports.SteadyStateReplacement = SteadyStateReplacement;
