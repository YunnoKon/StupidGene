import sg from "../lib/index.ts";

function generateIndividual() {
    return Array.from({ length: 5 }, () => Math.random() * 10)
}

function fitness(ind: number[]){
    // Distance between 5
    return -ind.reduce((sum,val) => sum + Math.abs(val-5),0)
}

function mutate(ind: number[], mutationRate:number): number[] {
    return ind.map(g => Math.random() < mutationRate ? Math.random()*10 : g)
}

const ga = new sg.GeneticAlgorithm<number[]>({
    populationSize: 60,
    mutationRate: 0.06,
    crossoverRate: 0.7,
    fitness,
    generateIndividual,
    crossover: sg.Utils.singlePointCrossoverArray,
    mutate,
    selection: new sg.Selection.TournamentSelection(4)
})

ga.run(100,(best) => {
    console.log(`Iter ${best.generation} | Best Generation: ${best.individual}, Fitness: ${best.fitness}`)
})