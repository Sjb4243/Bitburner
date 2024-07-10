/** @param {NS} ns */
/**
 * [Cracks a server]
 * @param  {[array]} arg1 [server array]
 * @param  {[array]} arg2 [percentage array]
 * @param {[string]} arg3 [string array]
 */

export async function distribute(ns, origServ, percentages, target) {
  let totalRam = 0;
  let servers = origServ.slice() // Makes sure we're not working on a pointer - otherwise distribute runs with nothing

  let totalThreads = 0;
  for (var server in servers) {
    totalThreads += Math.floor(ns.getServerMaxRam(servers[server]) / 1.75);
  }
  //let totalThreads = Math.floor(totalRam / 1.75);
  let growThreads = Math.floor(totalThreads * percentages[0]);
  let weakThreads = Math.floor(totalThreads * percentages[1]);
  let hackThreads = Math.floor(totalThreads * percentages[2]);
  servers = await start_distribute(ns, growThreads, servers, "grow.js", target)
  servers = await start_distribute(ns, weakThreads, servers, "weaken.js", target)
  servers = await start_distribute(ns, hackThreads, servers, "hack.js", target)
}

export async function start_distribute(ns, threads, serverlist, script, target) {
  let counter = 0
  const copyList = serverlist.slice();
  while (threads > 0 && counter < copyList.length) {
    let server = copyList[counter];
    let usedThreads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 1.75);
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
