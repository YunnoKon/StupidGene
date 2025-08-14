export interface SelectionStrategy<T> {
    select(population: T[], fitness: number[]): T;
}
export interface ReplacementStrategy<T> {
    replace(oldPopulation: T[], newPopulation: T[], fitness: number[]): T[];
}
//# sourceMappingURL=types.d.ts.map