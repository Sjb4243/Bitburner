/** @param {NS} ns */
/**
 * [Cracks a server]
 * @param  {[string]} server [server to be cracked]
 */
export async function crack(ns, server) {
    const portCrackers = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
    const tools = [ns.brutessh, ns.ftpcrack, ns.relaysmtp, ns.httpworm, ns.sqlinject];
    let open = 0;
    const portsNeeded = ns.getServerNumPortsRequired(server);

    for (let i = 0; i < tools.length; i++) {
        if (ns.fileExists(portCrackers[i])) {
            tools[i](server);
            open++;
        }
    }

    if (portsNeeded <= open && !ns.hasRootAccess(server)) {
        ns.nuke(server);
        ns.tprint("New host: " + server);
    }
}


/** @param {NS} ns */
/**
 * [Cracks a server]
 * @param  {[Array]} serverList [List of servers to be cracked]
 */
export async function CrackServerList(ns, serverList){
  for (let server in serverList) {
    crack(ns, serverList[server])
  }
}