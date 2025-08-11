type Individual = any;

interface Options<T extends Individual> {
    populationSize: number;
    mutationRate: number;
    crossoverRate: number;
    fitness: (ind: T) => number;
    generateIndividual: () => T;
    crossover: (parent1: T, parent2: T) => [T,T];
    mutate: (ind: T, mutationRate: number) => T;
}

class StupidGene<T extends Individual> {
    private population: T[] = []
    private fitnessScore: number[] = []
    private options: Options<T>

    constructor(options: Options<T>){
        this.options = options;
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

    private selectParent(){
        const totalFitness = this.fitnessScore.reduce((a, b) => a+b, 0)
        let pick = Math.random() * totalFitness; // pick from 0 to totalFitness
        for(let i = 0;i < this.population.length;i++){
            pick -= this.fitnessScore[i]
            if(pick < 0) return this.population[i]
        }
        // fallback
        return this.population[this.population.length - 1]
    }

    public runGeneration(){
        this.evaluate()

        // Generate new population
        const newPopulation: T[] = [];
        while(newPopulation.length < this.options.populationSize){
            const parent1 = this.selectParent()
            const parent2 = this.selectParent()

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

        this.population = newPopulation;
    }

    public getBestIndividual(): { individual: T, fitness: number } {
        this.evaluate()
        let maxIndex = 0;
        for(let i = 1;i < this.fitnessScore.length;i++){
            if(this.fitnessScore[i] > this.fitnessScore[maxIndex]) maxIndex = i;
        }
        return { individual: this.population[maxIndex], fitness: this.fitnessScore[maxIndex] }
    }
}

export default StupidGene;