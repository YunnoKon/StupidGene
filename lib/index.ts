import { RandomSelection, RankSelection, RouletteSelection, TournamentSelection } from "./genetic/Selection.ts";
import GeneticAlgorithm from "./genetic/index.ts";

export default {
    GeneticAlgorithm,
    Selection: {
        RouletteSelection,
        TournamentSelection,
        RankSelection,
        RandomSelection
    }
}