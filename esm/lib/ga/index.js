import { RouletteSelection } from "./Selection.js";
import { FullReplacement } from "./replacement.js";
class GeneticAlgorithm {
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
        this.options = {
            ...options,
            selection: options.selection ?? new RouletteSelection(),
            replacement: options.replacement ?? new FullReplacement()
        };
        this.initPopulation();
    }
    initPopulation() {
        this.population = [];
        for (let i = 0; i < this.options.populationSize; i++) {
            this.population.push(this.options.generateIndividual());
        }
    }
    evaluate() {
        // Evaluate quality of the solution with user-defined fitness funciton
        this.fitnessScore = this.population.map(this.options.fitness);
    }
    step() {
        this.evaluate();
        // Generate new population
        const newPopulation = [];
        while (newPopulation.length < this.options.populationSize) {
            const parent1 = this.options.selection.select(this.population, this.fitnessScore);
            const parent2 = this.options.selection.select(this.population, this.fitnessScore);
            let [child1, child2] = [parent1, parent2];
            // Crossover - recombine genetic info
            if (Math.random() < this.options.crossoverRate) {
                [child1, child2] = this.options.crossover(parent1, parent2);
            }
            // Mutate - random shit ahh
            newPopulation.push(this.options.mutate(child1, this.options.mutationRate));
            // catch odd number of population
            if (newPopulation.length < this.options.populationSize) {
                newPopulation.push(this.options.mutate(child2, this.options.mutationRate));
            }
        }
        this.population = this.options.replacement.replace(this.population, newPopulation, this.fitnessScore);
        this.evaluate();
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
export default GeneticAlgorithm;
