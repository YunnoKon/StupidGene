type ESOptions<T extends number[]> = {
    populationSize: number;
    offspringSize: number;
    sigma: number;
    fitness: (ind: T) => number;
    generateIndividual: () => T;
    mutate?: (ind: T, sigma: number) => T;
    selectionType?: "comma" | "plus";
};
declare class EvolutionStrategies<T extends number[]> {
    private population;
    private fitnessScore;
    private generation;
    private options;
    constructor(options: ESOptions<T>);
    private initPopulation;
    private defaultMutate;
    private evaluate;
    private gaussian;
    private selectTop;
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
export default EvolutionStrategies;
//# sourceMappingURL=index.d.ts.map