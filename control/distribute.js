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
    //While we still have threads left to allocate
    while (growThreads > 0){
        for (let i = 0; i < servers.length;i++){
            server = servers[i]
            //get the amount of usable threads vs our ram cost
            let usedThreads = Math.floor(ns.getServerMaxRam(server) - ns.getServerUsedRam(server) / 1.75)
            //if the max threads use too much, get the amount we're over by and take it off of it
            //That way we can half use servers
            if (growThreads - usedThreads < 0){
                let over = Math.abs(growThreads - usedThreads)
                usedThreads = usedThreads - over
            //if not, this server has been expended so we slice it off of sliced array
            }else{
                //server expended
                slicedArray.shift()
            }
            //Call script using usedthreads and then take it off of growthreads
            //CALL SCRIPT HERE WITH USED THREADS
            growThreads = growThreads - usedThreads
        }
    }
    //WEAKTHREADS
    //HACKTHREADS
    //BASICALLY THE SAME SO SHOUDL FUNCTIONISE IT
}
  