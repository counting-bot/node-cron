import {randomUUID} from 'crypto';

export default class storage {
    constructor(){
        if(!this.scheduledTasks){
            this.scheduledTasks = new Map();
        }
    }
    save(task){
        if(!task.options){
            task.options = {};
            task.options.name = randomUUID();
        }
        this.scheduledTasks.set(task.options.name, task);
    }
    getTasks(){
        return this.scheduledTasks;
    }
}