import { crawl } from "./helpers/crawler";

export async function main(ns) {
    let serverList = await crawl(ns);
    ns.tprint(serverList[1].hostname);
}