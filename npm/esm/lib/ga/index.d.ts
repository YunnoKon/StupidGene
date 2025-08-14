import { ReplacementStrategy, SelectionStrategy } from "./types.js";
type Individual = any;
interface GAOptions<T extends Individual> {
    populationSize: number;
    mutationRate: number;
    crossoverRate: number;
    fitness: (ind: T) => number;
    generateIndividual: () => T;
    crossover: (parent1: T, parent2: T) => [T, T];
    mutate: (ind: T, mutationRate: number) => T;
    selection?: SelectionStrategy<T>;
    replacement?: ReplacementStrategy<T>;
}
declare class GeneticAlgorithm<T extends Individual> {
    private population;
    private fitnessScore;
    private generation;
    private options;
    constructor(options: GAOptions<T>);
    private initPopulation;
    private evaluate;
    step(): void;
    getBest(): {
        individual: T;
        fitness: number;
        generation: number;
    };
    run(maxGenerations: number, onGeneration: (best: {
        individual: T;
        fitness: number;
        generation: number;
    }) => boolean | void): void;
}
export default GeneticAlgorithm;
//# sourceMappingURL=index.d.ts.map