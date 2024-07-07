/** @param {NS} ns */
/**
 * [Cracks a server]
 * @param  {[string]} arg1 [script]
 * @param  {[string]} arg2 [server target]
 * @param  {[string]} arg3 [args for scripts]
 */

export async function deploy(ns, script, server, threads, target){
    await ns.scp(script, server);
    await ns.killall(server)
    await ns.exec(script, server, threads, target)
}
