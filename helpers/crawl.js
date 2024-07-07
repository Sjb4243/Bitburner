/** @param {NS} ns */
/**
 * [crawl crawls through the network and returns an array of servers]
 * @return {[array]}      [array of all servers in the network (not player owned)]
 */

export async function crawl(ns) {
  let visited = [];
  await recurse(ns, "home", visited);
  return visited;
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