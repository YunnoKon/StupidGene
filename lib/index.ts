import { RandomSelection, RankSelection, RouletteSelection, TournamentSelection } from "./ga/Selection.ts";
import { ElitismReplacement, FullReplacement, SteadyStateReplacement } from "./ga/replacement.ts";
import GeneticAlgorithm from "./ga/index.ts";
import { Utils } from "./utils.ts";
import EvolutionStrategies from "./es/index.ts";

export default {
    GeneticAlgorithm,
    EvolutionStrategies,
    Utils,
    Selection: {
        RouletteSelection,
        TournamentSelection,
        RankSelection,
        RandomSelection
    },
    Replacement: {
        FullReplacement,
        ElitismReplacement,
        SteadyStateReplacement
    }
}