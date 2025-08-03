export async function main(ns, target, delay) {
    await ns.grow(target, {additionalMsec: delay});
}