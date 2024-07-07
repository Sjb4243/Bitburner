/** @param {NS} ns */
/**
 * [Cracks a server]
 * @param  {[array]} arg1 [server array]
 * @param  {[array]} arg2 [percentage array]
 */

export async function main(ns, servers, percentages) {
    let totalRam = 0;
    if (servers[0] == "home"){
        servers = servers.shift()
    }



    for (let i = 0; i < servers.length;i++){
         totalRam = totalRam +  ns.getServerMaxRam()
        
    }

    let totalThreads = Math.floor(totalRam / 1.75) 

    let growThreads = Math.floor(totalThreads * percentages[0])
    let weakThreads = Math.floor(totalThreads * percentages[1])
    let hackThreads = Math.floor(totalThreads * percentages[2])
    let slicedArray = servers
    while (growThreads > 0){
        for (let i = 0; i < servers.length;i++){
            server = servers[i]
            let usedThreads = Math.floor(ns.getServerMaxRam(server) - ns.getServerUsedRam(server) / 1.75)
            if (growThreads - usedThreads < 0){
                let over = Math.abs(growThreads - usedThreads)
                usedThreads = usedThreads - over
            }else{
                //server expended
                slicedArray.shift()
            }
            //CALL SCRIPT HERE WITH USED THREADS
            growThreads = growThreads - usedThreads
        }
    }
    //WEAKTHREADS
    //HACKTHREADS
    //BASICALLY THE SAME SO SHOUDL FUNCTIONISE IT
}
  