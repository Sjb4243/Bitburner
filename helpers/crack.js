/** @param {NS} ns */
/**
 * [Cracks a server]
 * @param  {[string]} arg1 [server to be cracked]
 */
export async function crack(ns, server){
    const portCrackers = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
    const tools = [ns.brutessh, ns.ftpcrack, ns.relaysmtp, ns.httpworm, ns.sqlinject]
    const open = 0
    const portsNeeded = ns.getServerNumPortsRequired(server);
    for (let i = 0; i < tools.length(); i++);
        if (ns.fileExists(portCrackers[i])){
            tools[i](server)
            ++open;
        }
    if (portsNeeded <= open){
        ns.nuke(server)
        ns.tprint("New host: ", server)
    }
}