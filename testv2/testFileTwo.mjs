import {schedule} from '../src/node-cron.mjs'

schedule("* * * * *", ()=>{
    console.log("ttttttttttttttttttttttttttt")
    console.log(new Date().getMinutes())
})

export default (data)=>{
    console.log(data)
}