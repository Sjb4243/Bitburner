export async function getValid(ns, serverArray) {
    let validArray = []
    for (let i = 0;i < serverArray.length;i++){
        let server = serverArray[i]
        if(ns.hasRootAccess(server) && ns.getServerMaxRam(server) > 2 && ns.getServerRequiredHackingLevel(server) < ns.getHackingLevel()){
            validArray.push(server)
        }
    }
    return validArray
}