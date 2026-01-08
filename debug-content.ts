
import { createReader } from '@keystatic/core/reader';
import config from './src/keystatic.config';

const reader = createReader(process.cwd(), config);

async function debug() {
    try {
        console.log('--- DEBUG START ---');

        // 1. Check Homepage
        const pages = await reader.collections.pages.all();
        console.log('Pages found:', pages.map(p => ({ slug: p.slug, isHomepage: p.entry.isHomepage })));

        const home = pages.find(p => p.entry.isHomepage === true);
        if (!home) {
            console.error('ERROR: No homepage found with isHomepage=true');
        } else {
            console.log('Homepage found:', home.slug);
            const homePage = await reader.collections.pages.read(home.slug);
            console.log('Homepage Blocks:', homePage?.blocks?.length);
        }

        // 2. Check Team
        const team = await reader.collections.team.all();
        console.log('Team members found:', team.map(t => t.slug));

        // 3. Check Services
        const services = await reader.collections.services.all();
        console.log('Services found:', services.map(s => s.slug));

        console.log('--- DEBUG END ---');
    } catch (e: any) {
        console.error('Debug failed:', e);
        const fs = require('fs');
        fs.writeFileSync('debug-error.log', `Error: ${e.message}\n${JSON.stringify(e, null, 2)}`);
    }
}

debug();
