export async function main(ns, target, delay) {
    await ns.hack(target, {additionalMsec: delay});
}