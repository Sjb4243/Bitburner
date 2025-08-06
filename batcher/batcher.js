import { crawl } from "batcher/helpers/crawler";
import { CrackServerList } from "/helpers/crack.js";
import { distribute } from "./distribute";
import { getValid } from "/helpers/getValid.js";

export async function main(ns) {
  let serverList = crawl(ns);
  let crackedServerList = [];
  let hackingScripts = ["/batcher/workers/growWorker.js", "/batcher/workers/hackWorker.js", "/batcher/workers/weakWorker.js"]
  let hackingScriptsLoc = ["growWorker.js", "hackWorker.js", "weakWorker.js"]
  let targetHackTime;
  let targetGrowTime;
  let targetWeakTime;

  //Initialize variables and establish target(s)

  //Take over remote machines, and add them to network
  CrackServerList(ns, serverList);
  crackedServerList = await getValid(ns, serverList);
  DistributeWorkers(ns, serverList, hackingScripts, hackingScriptsLoc);

  //Calculate optimal targer server
  serverList = await getValid(ns, serverList);
  let target = serverList.reduce((a, b) => ns.getServerMaxMoney(a) > ns.getServerMaxMoney(b) ? a : b);

  //Calculate threads needed to remain in the optimal security and growth zones, and the time it takes for each command to finish
  //TODO:Can't be done here, as times change with security level. Do in loop.

  if(ns.getServerMinSecurityLevel(target) < ns.getServerSecurityLevel(target)){
    ns.tprint("Entering weakening phase")
    while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
      
      await distribute(ns, serverList, [0, 1, 0], target);
      await ns.sleep(ns.getWeakenTime(target)+200)
    }
  }

  //Prep targets with grow(), ideally scheduling weaken to hit shortly after, to keep security low
  if(ns.getServerMaxMoney(target) > ns.getServerMoneyAvailable(target)){
    //TODO:Implement scheduler and insert here
  }
  //Distribute threads to network, and ensure they finish in the order hack>weaken>grow>weaken, within at least 20ms of each other

  //Re-evaluate network, bringing in any new machines available into the fold

  //Loop back to distribute phase

  //Notes: It may be optimal to focus on only one target, scheduling several smaller batches rather than one big batch
  //Oh, actually that seems to be the entire idea behind it..
  //Look into automating purchasing darkweb programs between batches
}

export async function DistributeWorkers(ns,serverList, hackingScripts, hackingScriptsLoc){
    for (let server in serverList) {
    ns.scp(hackingScripts, serverList[server]);
      for (let file in hackingScripts) {
      ns.mv(serverList[server], hackingScripts[file], hackingScriptsLoc[file]);
    }
  }
}