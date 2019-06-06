const fs = require('fs');
const path = require('path');

function getAllFiles(directory) {
    let results = [];
    fs.readdirSync(directory).forEach(function(result) {
        let resultPath = path.join(directory, result);
        if (result.endsWith('js') && !result.startsWith('index')) {
            results.push(resultPath);
        } else if (fs.lstatSync(resultPath).isDirectory()) {
            Array.prototype.push.apply(results, getAllFiles(resultPath));
        }
    });
    return results;
}

module.exports = {
    getAllFiles
}