function getLevel(experience) {
    let level = 0;
    while (experience >= getNeededExp(level)) {
        experience -= getNeededExp(level);
        level++;
    }
    return level;
}

function getNeededExp(level) {
    if (level < 0) {
        return 0.0;
    }
    return (6 * Math.pow(level, 3) + 119 * level + 100);
}

function getRemainingExp(exp) {
    let experience = exp;
    let level = getLevel(experience);

    for (var i = 0; i < level; i++) {
        experience -= getNeededExp(i);
    }
    return experience;
}

module.exports = {
    getLevel,
    getRemainingExp,
    getNeededExp
}