import { ReplacementStrategy } from "./types.js";
export declare class FullReplacement<T> implements ReplacementStrategy<T> {
    replace(oldPopulation: T[], newPopulation: T[], fitness: number[]): T[];
}
export declare class ElitismReplacement<T> implements ReplacementStrategy<T> {
    private eliteCount;
    constructor(eliteCount: number);
    replace(oldPopulation: T[], newPopulation: T[], fitness: number[]): T[];
}
export declare class SteadyStateReplacement<T> implements ReplacementStrategy<T> {
    private replaceCount;
    constructor(replaceCount: number);
    replace(oldPopulation: T[], newPopulation: T[], fitness: number[]): T[];
}
//# sourceMappingURL=replacement.d.ts.map