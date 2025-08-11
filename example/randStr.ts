import StupidGene from "../lib.ts";

const target = "COOKIES"
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXTYZ "

function generateIndividual(): string {
    return Array.from({
        length: target.length
    },() => {
        return chars[Math.floor(Math.random() * chars.length)]
    }).join("")
}

function fitness(ind: string): number {
    let score = 0;
    for(let i = 0;i < target.length;i++){
        if(ind[i]==target[i]) score++;
    }
    return score;
}

function crossover(parent1: string, parent2: string): [string, string] {
    const randPoint = Math.floor(Math.random() * target.length)
    const child1 = parent1.slice(0, randPoint) + parent2.slice(randPoint)
    const child2 = parent2.slice(0, randPoint) + parent1.slice(randPoint)
    return [child1, child2];
}

function mutate(ind: string, mutationRate: number): string {
    let result = ""
    for(const char of ind){
        if(Math.random() < mutationRate) result += chars[Math.floor(Math.random() * chars.length)]
        else result += char
    }
    return result
}

const textGenetic = new StupidGene<string>({
    populationSize: 60,
    mutationRate: 0.1,
    crossoverRate: 0.6,
    fitness,
    generateIndividual,
    crossover,
    mutate
})

for(let i = 0;i < 400;i++){
    textGenetic.runGeneration()
    let best = textGenetic.getBestIndividual();
    console.log(`Iter ${i} | Best Generation: ${best.individual}, Fitness: ${best.fitness}`)
}