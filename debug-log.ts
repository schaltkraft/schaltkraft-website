import { reader } from './src/lib/cms-server';
import fs from 'fs';

async function testCMS() {
    const log = (msg: string) => {
        console.log(msg);
        fs.appendFileSync('debug-output.txt', msg + '\n');
    };

    log("Starting CMS Test...");

    try {
        log("Fetching Header...");
        const header = await reader.singletons.header.read();
        log("Header Success: " + (header ? "YES" : "NO"));
        if (header) log(JSON.stringify(header));

        log("Fetching Homepage...");
        const homepage = await reader.collections.pages.read('home');
        log("Homepage Success: " + (homepage ? "YES" : "NO"));

    } catch (error: any) {
        log("CMS CRASHED:");
        log(error.message);
        if (error.errors) {
            log("Validation Errors: " + JSON.stringify(error.errors, null, 2));
        }
    }
}

testCMS();
