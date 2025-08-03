export async function main(ns, target, delay) {
    await ns.weaken(target, {additionalMsec: delay});
}