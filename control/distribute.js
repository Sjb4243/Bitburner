/** @param {NS} ns */
/**
 * [Cracks a server]
 * @param  {[array]} arg1 [server array]
 * @param  {[array]} arg2 [percentage array]
 * @param {[string]} arg3 [string array]
 */

export async function distribute(ns, servers, percentages, target) {
  let totalRam = 0;
  servers.shift();
  for (let i = 0; i < servers.length; i++) {
    totalRam = totalRam + ns.getServerMaxRam(servers[i])

  }
  let totalThreads = Math.floor(totalRam / 1.75);
  let growThreads = Math.floor(totalThreads * percentages[0]);
  let weakThreads = Math.floor(totalThreads * percentages[1]);
  let hackThreads = Math.floor(totalThreads * percentages[2]);
  servers = await start_distribute(ns, growThreads, servers, "grow.js", target)
  servers = await start_distribute(ns, weakThreads, servers, "weaken.js", target)
  servers = await start_distribute(ns, hackThreads, servers, "hack.js", target)
}
export async function start_distribute(ns, threads, serverlist, script, target){
  let counter = 0
  const copyList = serverlist.slice();
  while (threads > 0){
    let server = copyList[counter];
    let usedThreads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 1.75);
    if (usedThreads == 0) {
      ++counter;
      continue
  } 
  if (threads - usedThreads < 0) {
     //if the max threads use too much, get the amount we're over by and take it off of it
    //That way we can half use servers
      let over = Math.abs(threads - usedThreads);
      usedThreads = usedThreads - over;
      //if not, this server has been expended so we slice it off of sliced array
    } else {
      //server expended
      serverlist.shift();
    }
  await ns.exec(script, server, usedThreads, target);
    threads = threads - usedThreads;
    ++counter;
  }
  return serverlist
}
