import { SelectionStrategy } from "./types.js";
export declare class RouletteSelection<T> implements SelectionStrategy<T> {
    select(population: T[], fitness: number[]): T;
}
export declare class TournamentSelection<T> implements SelectionStrategy<T> {
    private tournamentSize;
    constructor(tournamentSize?: number);
    select(population: T[], fitness: number[]): T;
}
export declare class RankSelection<T> implements SelectionStrategy<T> {
    select(population: T[], fitness: number[]): T;
}
export declare class RandomSelection<T> implements SelectionStrategy<T> {
    select(population: T[]): T;
}
//# sourceMappingURL=Selection.d.ts.map