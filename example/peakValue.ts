import sg from "../lib/index.ts";

const es = new sg.EvolutionStrategies<number[]>({
    populationSize: 15,
    offspringSize: 60,
    sigma: 0.2,
    fitness: ([x]) => {
        return -Math.pow(x - 3, 2);
        // The function peak at x=3
    },
    generateIndividual: () => [Math.random() * 100 - 50],
    selectionType: "plus"
});

es.run(50, best => {
    console.log(`Iter ${best.generation} | Best Generation: ${best.individual[0]}, Fitness: ${best.fitness}`)
});
