/** @param {NS} ns */

import {crawl} from "/helpers/crawl.js";
import {crack} from "/helpers/crack.js";
import {distribute} from "./distribute";
import { getValid } from "/helpers/getValid.js";
//import {findBestTarget} from "/helpers/findBestTarget";

export async function main(ns) {
    let serverList = await crawl(ns);
    let crackedServerList = []
    let hackingScripts = ["/helpers/grow.js", "/helpers/hack.js", "/helpers/weaken.js"]
    let hackingScriptsLoc = ["grow.js", "hack.js", "weaken.js"]
    let threadsAvailable = 0;

    //crack all the servers we can
    for (var server in serverList){
        crack(ns, serverList[server])
    }

    //Figure out which servers we have available to us currently
    serverList = await getValid(ns,serverList)
    let target = serverList.reduce((a, b) => ns.getServerMaxMoney(a) > ns.getServerMaxMoney(b) ? a : b)
    

    //Distribute scripts to cracked servers
    for (server in serverList){
        ns.scp(hackingScripts, serverList[server]);
        for (var file in hackingScripts){
            ns.mv(serverList[server], hackingScripts[file], hackingScriptsLoc[file]);
        }
    }
    
    //Weaken server security before we begin hacking
    while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)){
        if (!ns.isRunning("weaken.js", "n00dles")){
            await ns.sleep(5000)
        await distribute(ns, serverList, [0,1,0], target);
        } else{
            await ns.sleep(5000)
        }
    }
    //Grow available cash to desired level before we begin hacking
    while ((ns.getServerMaxMoney(target)*0.8) > ns.getServerMoneyAvailable(target))
        if (!ns.isRunning("grow.js", "n00dles")){
            await ns.sleep(5000)
            await distribute(ns, serverList, [0.9,0.1,0], target);
        }else{
            await ns.sleep(5000)
        }
    
    //Calculate hack/grow/weaken ratios
    //need 1 weaken thread per 12.5 grow threads (8%)
    //need 1 weaken thread per 25 hack threads  (4%)

    //Distribute instructions to all the servers (loop)
    while (true){
        if (!ns.isRunning("grow.js", "n00dles")){
            await ns.sleep(5000);
            await distribute(ns, serverList, [0.5,0.08,0.42]/*Arbitrary numbers for now, calculate properly later*/, target);
        }else{
            await ns.sleep(5000)
        }
}
}