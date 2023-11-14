const {existsSync, readFileSync, writeFileSync} = require('fs');
module.exports = function(path) {
    const tasksStatus = existsSync(path)
        ? JSON.parse(readFileSync(path)) : {};
    return {
        getTasksByStatus() {
            return tasksByStatus;
        },
        changeTaskStatus(task, old, news) {
            if (tasksStatus[old] instanceof Array && tasksStatus[news] instanceof Array) {
                let index = tasksStatus[old].findIndex(t => t === task);
                if (index) {
                    tasksStatus[old].splice(index, 1);
                    tasksStatus[news].push(task);
                    writeFileSync(path, JSON.stringify(tasksStatus));
                    return true;
                }
            }
            return false;
        }
    };
};