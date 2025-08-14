"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EvolutionStrategies {
    constructor(options) {
        Object.defineProperty(this, "population", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "fitnessScore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "generation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.options = options;
        this.initPopulation();
    }
    initPopulation() {
        this.population = [];
        for (let i = 0; i < this.options.populationSize; i++) {
            this.population.push(this.options.generateIndividual());
        }
    }
    defaultMutate(ind, sigma) {
        return ind.map(v => v + sigma * this.gaussian());
    }
    evaluate() {
        // Evaluate quality of the solution with user-defined fitness funciton
        this.fitnessScore = this.population.map(this.options.fitness);
    }
    gaussian() {
        // Box muller transform
        let u = Math.random();
        let v = Math.random();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }
    selectTop(population, scores, count) {
        return population
            .map((ind, idx) => ({ ind, score: scores[idx] }))
            .sort((a, b) => b.score - a.score)
            .slice(0, count)
            .map(item => item.ind);
    }
    step() {
        this.evaluate();
        const offspring = [];
        for (let i = 0; i < this.options.offspringSize; i++) {
            const parent = this.population[Math.floor(Math.random() * this.population.length)];
            const mutateFn = this.options.mutate ?? this.defaultMutate.bind(this);
            offspring.push(mutateFn(parent, this.options.sigma));
        }
        const offspringScore = offspring.map(this.options.fitness);
        if (this.options.selectionType == "plus") {
            const combined = [...this.population, ...offspring];
            const combinedScore = [...this.fitnessScore, ...offspringScore];
            this.population = this.selectTop(combined, combinedScore, this.options.populationSize);
        }
        else {
            this.population = this.selectTop(offspring, offspringScore, this.options.populationSize);
        }
        this.generation++;
    }
    getBest() {
        let maxIndex = 0;
        for (let i = 1; i < this.fitnessScore.length; i++) {
            if (this.fitnessScore[i] > this.fitnessScore[maxIndex])
                maxIndex = i;
        }
        return {
            individual: this.population[maxIndex],
            fitness: this.fitnessScore[maxIndex],
            generation: this.generation
        };
    }
    run(maxGenerations, onGeneration) {
        for (let gen = 0; gen < maxGenerations; gen++) {
            this.step();
            const best = this.getBest();
            const stop = onGeneration?.({
                ...best,
            });
            if (stop)
                break;
        }
    }
}
exports.default = EvolutionStrategies;
