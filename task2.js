class Fighter {
    /**
     *
     * @param name
     * @param power
     * @param health
     */
    constructor(name, power = 10, health = 100) {
        this.name = name;
        this.power = power;
        this.health = health;
    }

    /**
     *
     * @param value
     */
    setDamage(value) {
        this.health -= value;
        console.log(`Fighter '${this.name}' got ${value} damage. His health: ${this.health}`);
        if (this.health < 1) {
            throw new FighterLostException(this);
        }
    }

    /**
     *
     * @param enemy Fighter
     * @param point
     */
    hit(enemy, point) {
        enemy.setDamage(this.power * point);
    }
}

class ImprovedFighter extends Fighter {
    /**
     *
     * @param enemy
     * @param point
     */
    doubleHit(enemy, point) {
        this.hit(enemy, point * 2);
    }
}

class FighterLostException extends Error {
    /**
     *
     * @param fighter Fighter
     */
    constructor(fighter) {
        super(`Fighter '${fighter.name}' lost. Game over'`);
        this.name = this.constructor.name;
    }
}

/**
 *
 * @param min
 * @param max
 */
let myRand = (min, max) => Math.floor(Math.random() * max) + min;

/**
 *
 * @param fighter
 * @param improvedFighter
 * @param points
 */
let fight = (fighter, improvedFighter, ...points) => {
    try {
        points.forEach((point) => {
            fighter.hit(improvedFighter, point);
            if (Math.round(Math.random())) {
                improvedFighter.doubleHit(fighter, point);
                return;
            }
            improvedFighter.hit(fighter, point);
        });
    } catch (e) {
        console.log(e.message);
    }
};

fight(
    new Fighter('common fighter', myRand(5, 10), myRand(100, 200)),
    new ImprovedFighter('improved fighter', myRand(5, 10), myRand(100, 200)),
    3, 4, 5, 6, 7, 8, 9
);