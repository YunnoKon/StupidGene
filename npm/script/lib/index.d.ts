import { RandomSelection, RankSelection, RouletteSelection, TournamentSelection } from "./ga/Selection.js";
import { ElitismReplacement, FullReplacement, SteadyStateReplacement } from "./ga/replacement.js";
import GeneticAlgorithm from "./ga/index.js";
import EvolutionStrategies from "./es/index.js";
declare const _default: {
    GeneticAlgorithm: typeof GeneticAlgorithm;
    EvolutionStrategies: typeof EvolutionStrategies;
    Utils: {
        randomString: (length: number, chars: string) => string;
        singlePointCrossoverString: (parent1: string, parent2: string) => [string, string];
        singlePointCrossoverArray: (parent1: any[], parent2: any[]) => [any, any];
    };
    Selection: {
        RouletteSelection: typeof RouletteSelection;
        TournamentSelection: typeof TournamentSelection;
        RankSelection: typeof RankSelection;
        RandomSelection: typeof RandomSelection;
    };
    Replacement: {
        FullReplacement: typeof FullReplacement;
        ElitismReplacement: typeof ElitismReplacement;
        SteadyStateReplacement: typeof SteadyStateReplacement;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map