export interface SelectionStrategy<T> {
    select(population: T[], fitness: number[]): T;
}