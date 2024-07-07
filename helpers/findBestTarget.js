/** @param {NS} ns */
/**
 * [Finds the optimal taget to focus our hacking on]
 * @return {[string]}      [Server name of target]
 */


import {crawl} from "/helpers/crawl.js";

export async function findBestTarget(ns) {
	let serverList = await crawl(ns);
    let target = "null";
    target = await BestTarget(ns, serverList);
    return target;
}

async function BestTarget(ns, serverList){
    let hackingLevel = ns.getHackingLevel();
    let potentialTargets = []

    for (var server in serverList){
        var serverSecurity = ns.getServerRequiredHackingLevel(serverList[server]);
        if (hackingLevel >= serverSecurity){
            potentialTargets.push(serverList[server])
            //ns.print(potentialTargets);
        }
    }

    let bestTarget = "home"
    for (var target in potentialTargets){
        if (ns.getServerMaxMoney(potentialTargets[target]) > ns.getServerMaxMoney(bestTarget)){
            bestTarget = potentialTargets[target]
            ns.print("hello");
        }
    }
    return bestTarget;
}
