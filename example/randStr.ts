import sg from "../lib/index.ts";

const target = "COOKIES"
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXTYZ "

function generateIndividual(): string {
    return sg.Utils.randomString(target.length,chars)
}

function fitness(ind: string): number {
    let score = 0;
    for(let i = 0;i < target.length;i++){
        if(ind[i]==target[i]) score++;
    }
    return score;
}

function mutate(ind: string, mutationRate: number): string {
    let result = ""
    for(const char of ind){
        if(Math.random() < mutationRate) result += chars[Math.floor(Math.random() * chars.length)]
        else result += char
    }
    return result
}

const ga = new sg.GeneticAlgorithm<string>({
    populationSize: 60,
    mutationRate: 0.1,
    crossoverRate: 0.6,
    fitness,
    generateIndividual,
    crossover: sg.Utils.singlePointCrossoverString,
    mutate
})

ga.run(400,(best) => {
    console.log(`Iter ${best.generation} | Best Generation: ${best.individual}, Fitness: ${best.fitness}`)
    return best.fitness == target.length
})