export async function getValid(ns, serverArray) {
    let validArray = []
    const hackingLevel = ns.getHackingLevel(); // Get hacking level once
    for (let server of serverArray) { // Iterate using for...of loop
        if (ns.hasRootAccess(server) && ns.getServerMaxRam(server) > 2 && ns.getServerRequiredHackingLevel(server) < hackingLevel) {
            validArray.push(server)
        }
    }
    return validArray
}
