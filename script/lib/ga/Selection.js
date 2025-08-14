"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomSelection = exports.RankSelection = exports.TournamentSelection = exports.RouletteSelection = void 0;
class RouletteSelection {
    select(population, fitness) {
        const totalFitness = fitness.reduce((a, b) => a + b, 0);
        let pick = Math.random() * totalFitness; // pick from 0 to totalFitness
        for (let i = 0; i < population.length; i++) {
            pick -= fitness[i];
            if (pick < 0)
                return population[i];
        }
        // fallback
        return population[population.length - 1];
    }
}
exports.RouletteSelection = RouletteSelection;
class TournamentSelection {
    constructor(tournamentSize = 3) {
        Object.defineProperty(this, "tournamentSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tournamentSize
        });
    }
    select(population, fitness) {
        let bestIndex = -1;
        for (let i = 0; i < this.tournamentSize; i++) {
            const idx = Math.floor(Math.random() * population.length); // get a random
            if (bestIndex === -1 || fitness[idx] > fitness[bestIndex]) {
                bestIndex = idx;
            }
        }
        return population[bestIndex];
    }
}
exports.TournamentSelection = TournamentSelection;
class RankSelection {
    select(population, fitness) {
        const ranked = population.map((ind, idx) => ({
            ind, fitness: fitness[idx]
        })).sort((a, b) => a.fitness - b.fitness);
        const n = ranked.length;
        const totalRank = (n * (n + 1)) / 2;
        let pick = Math.random() * totalRank;
        for (let i = 0; i < n; i++) {
            pick -= (i + 1);
            if (pick <= 0)
                return ranked[i].ind;
        }
        // fallback
        return ranked[n - 1].ind;
    }
}
exports.RankSelection = RankSelection;
class RandomSelection {
    select(population) {
        return population[Math.floor(Math.random() * population.length)];
    }
}
exports.RandomSelection = RandomSelection;
