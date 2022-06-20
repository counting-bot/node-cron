import uuid from './uuid/v4.mjs'
export default (() => {
    if(!global.scheduledTasks){
        global.scheduledTasks = new Map();
    }
    
    return {
        save: (task) => {
            if(!task.options){
                task.options = {};
                task.options.name = uuid();
            }
            global.scheduledTasks.set(task.options.name, task);
        },
        getTasks: () => {
            return global.scheduledTasks;
        }
    };
})();