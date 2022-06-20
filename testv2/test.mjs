import {schedule, getTasks, validate} from '../src/node-cron.mjs'

schedule("* * * * *", ()=>{
    console.log("eeee")
    console.log(new Date().getMinutes())
})