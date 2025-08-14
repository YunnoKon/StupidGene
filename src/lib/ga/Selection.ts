import { SelectionStrategy } from "./types.js";

export class RouletteSelection<T> implements SelectionStrategy<T> {
    select(population:T[], fitness:number[]): T {
        const totalFitness = fitness.reduce((a, b) => a+b, 0)
        let pick = Math.random() * totalFitness; // pick from 0 to totalFitness
        for(let i = 0;i < population.length;i++){
            pick -= fitness[i]
            if(pick < 0) return population[i]
        }
        // fallback
        return population[population.length - 1]
    }
}

export class TournamentSelection<T> implements SelectionStrategy<T> {
    constructor(private tournamentSize: number = 3) {}

    select(population: T[], fitness:number[]): T {
        let bestIndex = -1;
        for(let i = 0;i < this.tournamentSize;i++){
            const idx = Math.floor(Math.random() * population.length) // get a random
            if(bestIndex===-1 || fitness[idx] > fitness[bestIndex]){
                bestIndex = idx
            }
        }

        return population[bestIndex]
    }
}

export class RankSelection<T> implements SelectionStrategy<T> {
    select(population: T[], fitness: number[]): T {
        const ranked = population.map((ind,idx) => ({
            ind, fitness:fitness[idx]
        })).sort((a,b) => a.fitness - b.fitness)

        const n = ranked.length
        const totalRank = (n * (n+1))/2;
        let pick = Math.random() * totalRank
        for(let i = 0;i < n;i++){
            pick -= (i+1)
            if(pick <= 0) return ranked[i].ind;
        }

        // fallback
        return ranked[n-1].ind;
    }
}

export class RandomSelection<T> implements SelectionStrategy<T> {
    select(population: T[]): T {
        return population[Math.floor(Math.random() * population.length)];
    }
}