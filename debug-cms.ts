import { reader } from './src/lib/cms-server';

async function testCMS() {
    console.log("Testing CMS Data Fetching...");

    try {
        console.log("Fetching Header...");
        const header = await reader.singletons.header.read();
        console.log("Header Data:", header ? "Found" : "NULL");
        if (header) console.log(JSON.stringify(header, null, 2));

        console.log("Fetching Homepage...");
        const homepage = await reader.collections.pages.read('home');
        console.log("Homepage Data:", homepage ? "Found" : "NULL");
        if (homepage) console.log(JSON.stringify(homepage, null, 2));

        console.log("Listing Pages...");
        const pages = await reader.collections.pages.list();
        console.log("Pages found:", pages);

    } catch (error) {
        console.error("CMS Error:", error);
    }
}

testCMS();
