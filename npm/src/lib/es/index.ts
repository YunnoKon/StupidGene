type ESOptions<T extends number[]> = {
    populationSize: number;
    offspringSize: number;
    sigma: number;
    fitness: (ind: T) => number;
    generateIndividual: () => T;
    mutate?: (ind: T, sigma: number) => T;
    selectionType?: "comma" | "plus";
}

class EvolutionStrategies<T extends number[]> {
    private population: T[] = []
    private fitnessScore: number[] = []
    private generation: number = 0;
    private options: ESOptions<T>;

    constructor(options: ESOptions<T>){
        this.options = options
        this.initPopulation()
    }

    private initPopulation(){
        this.population = [];
        for(let i = 0;i < this.options.populationSize;i++){
            this.population.push(this.options.generateIndividual())
        }
    }

    private defaultMutate(ind: T, sigma: number): T {
        return ind.map(v => v + sigma * this.gaussian()) as T;
    }

    private evaluate(){
        // Evaluate quality of the solution with user-defined fitness funciton
        this.fitnessScore = this.population.map(this.options.fitness)
    }

    private gaussian(){
        // Box muller transform
        let u = Math.random()
        let v = Math.random()
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
    }

    private selectTop(population: T[], scores: number[], count: number): T[] {
        return population
        .map((ind,idx) => ({ ind, score: scores[idx] }))
        .sort((a,b) => b.score - a.score)
        .slice(0,count)
        .map(item => item.ind)
    }

    public step(){
        this.evaluate()

        const offspring: T[] = [];
        for(let i = 0;i < this.options.offspringSize;i++){
            const parent = this.population[Math.floor(Math.random() * this.population.length)]
            const mutateFn = this.options.mutate ?? this.defaultMutate.bind(this)

            offspring.push(mutateFn(parent, this.options.sigma))
        }

        const offspringScore = offspring.map(this.options.fitness)
        if(this.options.selectionType == "plus"){
            const combined = [...this.population,...offspring]
            const combinedScore = [...this.fitnessScore, ...offspringScore]
            this.population = this.selectTop(combined,combinedScore,this.options.populationSize)
        }else{
            this.population = this.selectTop(offspring,offspringScore,this.options.populationSize)
        }

        this.generation++;
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

export default EvolutionStrategies;