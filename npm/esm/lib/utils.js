export const Utils = {
    randomString: (length, chars) => {
        return Array.from({ length }, () => { return chars[Math.floor(Math.random() * chars.length)]; }).join("");
    },
    singlePointCrossoverString: (parent1, parent2) => {
        const randPoint = Math.floor(Math.random() * parent1.length);
        return [
            parent1.slice(0, randPoint) + parent2.slice(randPoint),
            parent2.slice(0, randPoint) + parent1.slice(randPoint)
        ];
    },
    singlePointCrossoverArray: (parent1, parent2) => {
        const randPoint = Math.floor(Math.random() * parent1.length);
        return [
            [...parent1.slice(0, randPoint), ...parent2.slice(randPoint)],
            [...parent2.slice(0, randPoint), ...parent1.slice(randPoint)]
        ];
    }
};
