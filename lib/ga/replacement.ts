import { ReplacementStrategy } from "./types.ts";

export class FullReplacement<T> implements ReplacementStrategy<T> {
    replace(oldPopulation: T[], newPopulation: T[], fitness: number[]): T[]{
        return newPopulation;
    }
}

export class ElitismReplacement<T> implements ReplacementStrategy<T> {
    constructor(private eliteCount: number) {}

    replace(oldPopulation: T[], newPopulation: T[], fitness: number[]): T[]{
        const elites = oldPopulation.map((ind, idx) => ({
            ind, fitness: fitness[idx]
        }))
        .sort((a,b) => b.fitness - a.fitness)
        .slice(0, this.eliteCount)
        .map(e => e.ind)

        return [...elites, ...newPopulation.slice(0, oldPopulation.length-this.eliteCount)]
    }
}

export class SteadyStateReplacement<T> implements ReplacementStrategy<T> {
    constructor(private replaceCount: number) {}

    replace(oldPopulation: T[], newPopulation: T[], fitness: number[]): T[]{
        const survivors = oldPopulation.map((ind, idx) => ({
            ind, fitness: fitness[idx]
        }))
        .sort((a,b) => b.fitness - a.fitness)
        .slice(0, oldPopulation.length-this.replaceCount)
        .map(e => e.ind)

        return [...survivors, ...newPopulation.slice(0, this.replaceCount)]
    }
}