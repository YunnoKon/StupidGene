import { ReplacementStrategy, SelectionStrategy } from "./types.js";
import { RouletteSelection } from "./Selection.js";
import { FullReplacement } from "./replacement.js";

type Individual = any;

interface GAOptions<T extends Individual> {
    populationSize: number;
    mutationRate: number;
    crossoverRate: number;
    fitness: (ind: T) => number;
    generateIndividual: () => T;
    crossover: (parent1: T, parent2: T) => [T,T];
    mutate: (ind: T, mutationRate: number) => T;
    selection?: SelectionStrategy<T>;
    replacement?: ReplacementStrategy<T>;
}

class GeneticAlgorithm<T extends Individual> {
    private population: T[] = []
    private fitnessScore: number[] = []
    private generation: number = 0
    private options: Omit<GAOptions<T>, "selection" | "replacement"> & { 
        selection: SelectionStrategy<T>,
        replacement: ReplacementStrategy<T>
    }

    constructor(options: GAOptions<T>){
        this.options = {
            ...options,
            selection: options.selection ?? new RouletteSelection<T>(),
            replacement: options.replacement ?? new FullReplacement<T>()
        }
        this.initPopulation();
    }

    private initPopulation() {
        this.population = [];
        for(let i = 0;i < this.options.populationSize;i++){
            this.population.push(this.options.generateIndividual())
        }
    }

    private evaluate(){
        // Evaluate quality of the solution with user-defined fitness funciton
        this.fitnessScore = this.population.map(this.options.fitness)
    }

    public step(){
        this.evaluate()

        // Generate new population
        const newPopulation: T[] = [];
        while(newPopulation.length < this.options.populationSize){
            const parent1 = this.options.selection.select(this.population, this.fitnessScore)
            const parent2 = this.options.selection.select(this.population,this.fitnessScore)

            let [child1, child2] = [parent1,parent2]
            // Crossover - recombine genetic info
            if(Math.random() < this.options.crossoverRate){
                [child1,child2] = this.options.crossover(parent1, parent2)
            }

            // Mutate - random shit ahh
            newPopulation.push(this.options.mutate(child1, this.options.mutationRate))
            // catch odd number of population
            if(newPopulation.length < this.options.populationSize){
                newPopulation.push(this.options.mutate(child2, this.options.mutationRate))
            }
        }

        this.population = this.options.replacement.replace(
            this.population,
            newPopulation,
            this.fitnessScore
        )
        this.evaluate();
        this.generation++
    }

    public getBest(): { individual: T, fitness: number, generation: number } {
        let maxIndex = 0;
        for(let i = 1;i < this.fitnessScore.length;i++){
            if(this.fitnessScore[i] > this.fitnessScore[maxIndex]) maxIndex = i;
        }
        return { 
            individual: this.population[maxIndex], 
            fitness: this.fitnessScore[maxIndex],
            generation: this.generation
        }
    }

    public run(maxGenerations: number, onGeneration:(best: { individual: T, fitness: number, generation: number }) => boolean | void){
        for(let gen = 0; gen < maxGenerations;gen++){
            this.step();
            const best = this.getBest()
            
            const stop = onGeneration?.({
                ...best,
            })

            if(stop) break;
        }
    }
}

export default GeneticAlgorithm;