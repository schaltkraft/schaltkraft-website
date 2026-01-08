import Markdoc, { Config, nodes, Tag } from '@markdoc/markdoc';
import React from 'react';

export const markdocConfig: Config = {
    nodes: {
        paragraph: { render: 'p' },
        heading: {
            render: 'heading', // Use a tag or Component? If using Markdoc.renderers.html, this is just a key.
            // But for HTML renderer, it expects a TAG name usually or transform to Tag.
            transform(node, config) {
                const level = node.attributes['level'];
                return new Tag(`h${level}`, node.attributes, node.transformChildren(config));
            },
            attributes: {
                level: { type: Number }
            }
        },
        link: {
            ...nodes.link,
            render: 'a',
            attributes: {
                ...nodes.link.attributes,
                target: { type: String },
                rel: { type: String },
            }
        },
    },
    tags: {},
};

// Helper for React Rendering (if we were using React on server components directly,
// but for now we might still output HTML string via Markdoc.renderers.html or similar
// OR we return the renderable tree)
