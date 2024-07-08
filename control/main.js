/** @param {NS} ns */

import {crawl} from "/helpers/crawl.js";
import {crack} from "/helpers/crack.js";
//import {findBestTarget} from "/helpers/findBestTarget";

export async function main(ns) {
    let serverList = await crawl(ns);
    let crackedServerList = []
    let hackingScripts = ["/helpers/grow.js", "/helpers/hack.js", "/helpers/weaken.js"]

    //crack all the servers we can
    for (var server in serverList){
        crack(ns, serverList[server])
    }

    //Figure out which servers we have available to us currently
    for (var server in serverList){
        if (ns.hasRootAccess(serverList[server])){
            crackedServerList.push(serverList[server]);
        }
    }

    //Find the best server to focus our hacking on
    //let target = await findBestTarget(ns, crackedServerList);

    //This should make the entirety of findBestTarget.js obsolete
    let target = crackedServerList.reduce((a, b) => ns.getServerMaxMoney(a) > ns.getServerMaxMoney(b) ? a : b)


    //Distribute scripts to cracked servers
    for (server in crackedServerList){
        ns.scp(hackingScripts, crackedServerList[server]);
    }

    //Distribute instructions to all the servers
}