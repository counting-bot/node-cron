import {schedule} from '../src/node-cron.mjs'
import test from './testFileTwo.mjs'

schedule("* * * * *", ()=>{
    console.log("eeee")
    console.log(new Date().getMinutes())
})
test("asdf")