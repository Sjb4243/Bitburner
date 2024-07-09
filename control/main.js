/** @param {NS} ns */

import {crawl} from "/helpers/crawl.js";
import {crack} from "/helpers/crack.js";
import {distribute} from "./distribute";
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
    for (var server in serverList){
        if (ns.hasRootAccess(serverList[server]) && ns.getServerMaxRam(serverList[server]) >= 2){
            crackedServerList.push(serverList[server]);
        }
    }

    //Find the best server to focus our hacking on
    /*let target = await findBestTarget(ns, crackedServerList);*/
    //This should make the entirety of findBestTarget.js obsolete
    let hackableServerList = [];
    for (server in crackedServerList){
        if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(crackedServerList[server])){
            hackableServerList.push(crackedServerList[server]);
        }
    }
    let target = hackableServerList.reduce((a, b) => ns.getServerMaxMoney(a) > ns.getServerMaxMoney(b) ? a : b)


    //Distribute scripts to cracked servers
    for (server in crackedServerList){
        ns.scp(hackingScripts, crackedServerList[server]);
        for (var file in hackingScripts){
            ns.mv(crackedServerList[server], hackingScripts[file], hackingScriptsLoc[file]);
        }
    }

    //Calculate available ram/threads
    for (server in crackedServerList){
        threadsAvailable += (await ns.getServerMaxRam(crackedServerList[server]) / 1.75)
    }
    
    //Weaken server security before we begin hacking
    while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)){
        await distribute(ns, crackedServerList, [0,1,0], target);
    }
    //Grow available cash to desired level before we begin hacking
    while ((ns.getServerMaxMoney(target)*0.8) > ns.getServerMoneyAvailable(target))
        await distribute(ns, crackedServerList, [1,0,0], target);
    
    //Calculate hack/grow/weaken ratios
    //need 1 weaken thread per 12.5 grow threads (8%)
    //need 1 weaken thread per 25 hack threads  (4%)

    //Distribute instructions to all the servers (loop)
    while (true){
        await distribute(ns, crackedServerList, [0.42,0.08,0.5]/*Arbitrary numbers for now, calculate properly later*/, target);
    }
}