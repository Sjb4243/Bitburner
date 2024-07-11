/** @param {NS} ns */
/**
 * [crawl crawls through the network and returns an array of servers objects]
 * @return {[array]}      [array of all servers, and their properties, in the network (not player owned)]
 */

export async function crawl(ns, removeHome = true) {
  let visited = [];
  await recurse(ns, "home", visited);

  if (removeHome){
    visited.shift(); //Begone home
  }

  let serverList = [];

  //For reference: https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.server.md
  for (var place in visited){
    serverList.push(ns.getServer(visited[place]))
  }
  return serverList;
}

export async function recurse(ns, start, visited) {
  if (!visited.includes(start)) {
      visited.push(start);
  }
  let servers = ns.scan(start);
  for (let i = 0; i < servers.length; i++) {
      let target = servers[i];
      if (!visited.includes(target)) {
          await recurse(ns, target, visited);
      }
  }
}