import { crawl } from "/helpers/crawl.js";

export async function main(ns) {
    let servers = await crawl(ns, false);
    for (var server in servers){
        ns.killall(servers[server]);
    }
}