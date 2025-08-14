export const Utils = {
    randomString: (length: number, chars: string): string => {
        return Array.from({ length },() => { return chars[Math.floor(Math.random() * chars.length)] }).join("")
    },
    singlePointCrossoverString: (parent1: string, parent2: string): [string,string] => {
        const randPoint = Math.floor(Math.random() * parent1.length)
        return [
            parent1.slice(0, randPoint) + parent2.slice(randPoint),
            parent2.slice(0, randPoint) + parent1.slice(randPoint)
        ];
    },
    singlePointCrossoverArray: (parent1: any[], parent2: any[]): [any,any] => {
        const randPoint = Math.floor(Math.random() * parent1.length)
        return [
            [...parent1.slice(0,randPoint),...parent2.slice(randPoint)],
            [...parent2.slice(0,randPoint),...parent1.slice(randPoint)]
        ]
    }
}