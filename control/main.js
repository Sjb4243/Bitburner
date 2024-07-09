/** @param {NS} ns */

import {crawl} from "/helpers/crawl.js";
import {crack} from "/helpers/crack.js";
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
        if (ns.hasRootAccess(serverList[server]) && ns.getServerMaxRam(serverList[server] >= 2)){
            crackedServerList.push(serverList[server]);
        }
    }

    //Find the best server to focus our hacking on
    /*let target = await findBestTarget(ns, crackedServerList);*/
    //This should make the entirety of findBestTarget.js obsolete
    let target = crackedServerList.reduce((a, b) => ns.getServerMaxMoney(a) > ns.getServerMaxMoney(b) ? a : b)


    //Distribute scripts to cracked servers
    for (server in crackedServerList){
        ns.scp(hackingScripts, crackedServerList[server]);
        for (file in hackingScripts){
            ns.mv(crackedServerList[server], hackingScripts[file], hackingScriptsLoc[file]);
        }
    }

    //Calculate available ram/threads
    for (server in crackedServerList){
        threadsAvailable += (await ns.getServerMaxRam(crackedServerList[server] / 1.75))
    }
    
    //Weaken server security before we begin hacking
    while (ns.getServerSecurityLevel(target) > getServerMinSecurityLevel(target)){
        
    }
    //Grow available cash to desired level before we begin hacking
    //Calculate hack/grow/weaken ratios
    //Distribute instructions to all the servers (loop)
}