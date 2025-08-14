import { RandomSelection, RankSelection, RouletteSelection, TournamentSelection } from "./ga/Selection.js";
import { ElitismReplacement, FullReplacement, SteadyStateReplacement } from "./ga/replacement.js";
import GeneticAlgorithm from "./ga/index.js";
import { Utils } from "./utils.js";
import EvolutionStrategies from "./es/index.js";
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
};
