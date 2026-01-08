import 'server-only';
import { createReader } from '@keystatic/core/reader';
import config from '@/keystatic.config';
import Markdoc, { Node, Tag } from '@markdoc/markdoc';
import { markdocConfig } from '@/lib/markdoc';
import React from 'react';

// Create Reader Instance
export const reader = createReader(process.cwd(), config);

// ==============================================
// HELPER: MARKDOC RENDERER
// ==============================================
async function renderMarkdoc(node: any) {
  if (!node) return '';

  try {
    // Unwrap if it detects the wrapper pattern
    if (node.node && typeof node.node === 'object') {
      node = node.node;
    }

    if (node && typeof node === 'object') {
      if (node instanceof Node) {
        // Good
      } else {
        // If it's a plain object (AST), try to use it directly or hydrate
        // Markdoc.transform accepts a Node OR a plain object representing the AST (if valid).
        // It does NOT require hydration to Node instance strictly, unless custom tags/nodes need prototype methods.
        // However, let's try to hydrate for consistency.

      }
    }

    // If node is a string (e.g. manually edited JSON with HTML), return it directly to support HTML injection
    if (typeof node === 'string') {
      return node;
    }

    const errors = Markdoc.validate(node, markdocConfig);
    if (errors.length) {
      console.error('Markdoc Validation Errors:', errors);
    }

    const transformed = Markdoc.transform(node, markdocConfig);
    return Markdoc.renderers.html(transformed);
  } catch (e) {
    console.error("renderMarkdoc CRASHED:", e);
    const fs = require('fs');
    try {
      fs.writeFileSync('markdoc-crash.log', `Error: ${e}\nNode: ${JSON.stringify(node, null, 2)}`);
    } catch (err) { }
    return ''; // specific fallback to prevent white page
  }
}


// ==============================================
// DATA FETCHING
// ==============================================

export async function getHeader() {
  try {
    const data = await reader.singletons.header.read();
    return data;
  } catch (e) {
    console.error("Failed to read Header singleton", e);
    return null;
  }
}

export async function getFooter() {
  try {
    const data = await reader.singletons.footer.read();
    return data;
  } catch (e) {
    console.error("Failed to read Footer singleton", e);
    return null;
  }
}

export async function getPage(slug: string) {
  // Pattern check: Keystatic v0.5+ usually creates collections.
  let page;
  try {
    page = await reader.collections.pages.read(slug);
  } catch (e) {
    console.error(`Keystatic Reader failed to read page '${slug}'`, e);
    return null;
  }

  if (!page) return null;

  // Resolve blocks
  // page.blocks is the list of blocks.
  // If block is richText, we must render it.

  try {
    const resolvedBlocks = await Promise.all((page.blocks || []).map(async (block: any) => {


      if (block.discriminant === 'richText' && block.value.content) {
        let node = block.value.content;
        if (typeof node === 'function') {
          node = await node();
        }
        return {
          ...block,
          value: {
            ...block.value,
            content: await renderMarkdoc(node)
          }
        }
      }
      return block;
    }));

    return {
      ...page,
      blocks: resolvedBlocks
    };
  } catch (err) {
    console.error('CRITICAL ERROR resolving blocks for slug:', slug, err);
    try {
      const fs = require('fs');
      fs.writeFileSync('cms-error.log', `Error resolving blocks for ${slug}: ${err}\n${JSON.stringify(err, null, 2)}\n`);
    } catch (e) { }
    return null; // or throw
  }
}

export async function getAllPages() {
  const pages = await reader.collections.pages.list();
  // list() returns slugs array strings
  return pages.map(slug => ({ slug }));
}


// ==============================================
// SEO DEFAULTS
// ==============================================
export async function getSEODefaults() {
  const data = await reader.singletons.seoDefaults.read();
  return data;
}

// ==============================================
// HOMEPAGE
// ==============================================
export async function getHomepage() {
  let pages;
  try {
    pages = await reader.collections.pages.all();
  } catch (e) {
    console.error("Keystatic Reader failed to list pages", e);
    return null;
  }
  const homepage = pages.find((p) => p.entry.isHomepage === true);

  if (!homepage) return null;

  // We need to verify if pages.all() returns the entry structure correctly
  // usually [{ slug: string, entry: ... }]
  // and we need to call getPage(slug) to get Resolved blocks if we want them?
  // Or render blocks here?

  // The 'entry' contains the raw blocks data (unresolved markdoc promises probably).
  // So best is to find the slug, then call getPage(slug).

  return getPage(homepage.slug);
}


// ==============================================
// TEAM MEMBERS
// ==============================================
export async function getTeamMembers() {
  const members = await reader.collections.team.all();
  // members: { slug: string, entry: ... }[]

  const resolvedMembers = await Promise.all(members.map(async (m) => {
    // Cast entry to any to avoid TS errors with inferred schema
    const entry = m.entry as any;

    let bio = entry.bio;
    if (typeof bio === 'function') bio = await bio();

    const bioHtml = await renderMarkdoc(bio);

    return {
      ...entry,
      slug: m.slug,
      bio: bioHtml
    };
  }));

  return resolvedMembers.sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : 999;
    const orderB = typeof b.order === 'number' ? b.order : 999;
    return orderA - orderB;
  });
}

// ==============================================
// SERVICES
// ==============================================
export async function getAllServices() {
  const services = await reader.collections.services.all();
  return services.map(s => ({
    ...s.entry,
    slug: s.slug
  }));
}

export async function getService(slug: string) {
  try {
    const service = await reader.collections.services.read(slug);
    if (!service) return null;

    const s = service as any;
    let content = s.content;

    try {
      const fs = require('fs');
      fs.appendFileSync('cms-debug.log', `\n[${slug}] RAW content type: ${typeof content}\n`);
      fs.appendFileSync('cms-debug.log', `[${slug}] RAW content value sample: ${JSON.stringify(content)?.substring(0, 100)}\n`);
    } catch (e) { }

    if (typeof content === 'function') content = await content();

    try {
      const fs = require('fs');
      fs.appendFileSync('cms-debug.log', `[${slug}] PROCESSED content type: ${typeof content}\n`);
    } catch (e) { }

    return {
      ...service,
      content: await renderMarkdoc(content)
    };
  } catch (e) {
    console.error(`Failed to read service ${slug}`, e);
    return null;
  }
}



// ==============================================
// JOBS
// ==============================================
export async function getAllJobs() {
  const jobs = await reader.collections.jobs.all();

  const resolvedJobs = await Promise.all(jobs.map(async (j) => {
    const entry = j.entry as any;

    // We don't need to render description for list view, but let's be safe
    // Just return necessary fields
    return {
      slug: j.slug,
      ...entry,
      // Convert date to ISO string if it's not already
      datePosted: entry.datePosted || new Date().toISOString()
    };
  }));

  // Sort by date (newest first)
  return resolvedJobs.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
}

export async function getJob(slug: string) {
  try {
    const job = await reader.collections.jobs.read(slug);
    if (!job) return null;

    const entry = job as any;
    let description = entry.description;
    if (typeof description === 'function') description = await description();

    return {
      slug,
      ...entry,
      description: await renderMarkdoc(description)
    };
  } catch (e) {
    console.error(`Failed to read job ${slug}`, e);
    return null;
  }
}
