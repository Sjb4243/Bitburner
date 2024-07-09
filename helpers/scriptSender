/** @param {NS} ns */
import {crawl} from "/helpers/crawl.js";
import {crack} from "/helpers/crack.js";
export async function main(ns) {
    let crackedServerList = []
    let hackingScripts = ["/helpers/grow.js", "/helpers/hack.js", "/helpers/weaken.js"]
		let hackingScriptsLoc = ["grow.js", "hack.js", "weaken.js"]

	let serverList = await crawl(ns);
	for (var server in serverList){
		crack(ns, serverList[server])
  }

	 for (var server in serverList){
        if (ns.hasRootAccess(serverList[server])){
            crackedServerList.push(serverList[server]);
        }
    }

	for (server in crackedServerList){
        ns.scp(hackingScripts, crackedServerList[server]);
				ns.mv(crackedServerList[server], "/helpers/grow.js", "grow.js");
				ns.mv(crackedServerList[server], "/helpers/hack.js", "hack.js");
				ns.mv(crackedServerList[server], "/helpers/weaken.js", "weaken.js");
    }
}