import Markdoc, { Config, nodes, Tag } from '@markdoc/markdoc';

// Custom node definitions for Keystatic/Prosemirror compatibility
// Using 'as any' for nodes that Keystatic uses but aren't in Markdoc's strict NodeType
const customNodes = {
    // Horizontal rule (Keystatic uses 'horizontal_rule')
    horizontal_rule: {
        render: 'hr',
        transform() {
            return new Tag('hr', { class: 'border-zinc-700 my-8' });
        }
    },
    // Hard break (Keystatic uses 'hard_break')
    hard_break: {
        render: 'br'
    },
    // Bullet list (Keystatic uses 'bullet_list')
    bullet_list: {
        transform(node: any, config: any) {
            return new Tag('ul', {
                class: 'list-disc list-outside pl-8 my-6 text-zinc-300 space-y-2',
                style: 'list-style-type: disc; padding-left: 2rem;'
            }, node.transformChildren(config));
        }
    },
    // List item (Keystatic uses 'list_item')
    list_item: {
        transform(node: any, config: any) {
            return new Tag('li', {
                class: 'pl-2 marker:text-brand-orange',
                style: 'display: list-item;'
            }, node.transformChildren(config));
        }
    },
};

export const markdocConfig: Config = {
    nodes: {
        paragraph: { render: 'p' },
        heading: {
            render: 'heading',
            transform(node, config) {
                const level = node.attributes['level'];
                const classes = level === 1 ? 'text-4xl lg:text-5xl font-bold mb-8 text-white font-heading' :
                    level === 2 ? 'text-3xl lg:text-4xl font-bold mt-12 mb-6 text-white font-heading' :
                        level === 3 ? 'text-2xl lg:text-3xl font-bold mt-8 mb-4 text-white font-heading' :
                            'text-xl font-bold text-white';
                return new Tag(`h${level}`, { ...node.attributes, class: classes }, node.transformChildren(config));
            },
            attributes: {
                level: { type: Number }
            }
        },
        // Standard Markdoc hr
        hr: {
            render: 'hr',
            transform() {
                return new Tag('hr', { class: 'border-zinc-700 my-8' });
            }
        },
        // Standard Markdoc hardbreak
        hardbreak: {
            render: 'br'
        },
        // Standard Markdoc list
        list: {
            transform(node, config) {
                const tag = node.attributes['ordered'] ? 'ol' : 'ul';
                return new Tag(tag, {
                    class: 'list-disc list-outside pl-8 my-6 text-zinc-300 space-y-2',
                    style: 'list-style-type: disc; padding-left: 2rem;'
                }, node.transformChildren(config));
            }
        },
        // Standard Markdoc item
        item: {
            transform(node, config) {
                return new Tag('li', {
                    class: 'pl-2 marker:text-brand-orange',
                    style: 'display: list-item;'
                }, node.transformChildren(config));
            }
        },
        // Links (supports external, mailto:, tel:)
        link: {
            ...nodes.link,
            render: 'a',
            transform(node, config) {
                const href = node.attributes.href || '';
                const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
                return new Tag('a', {
                    href: href,
                    class: 'text-brand-orange hover:underline',
                    target: isExternal && href.startsWith('http') ? '_blank' : undefined,
                    rel: isExternal && href.startsWith('http') ? 'noopener noreferrer' : undefined,
                }, node.transformChildren(config));
            },
            attributes: {
                ...nodes.link.attributes,
                target: { type: String },
                rel: { type: String },
            }
        },
        // Images
        image: {
            render: 'img',
            transform(node) {
                return new Tag('img', {
                    src: node.attributes.src,
                    alt: node.attributes.alt || '',
                    class: 'rounded-xl my-8 shadow-lg max-w-full'
                });
            },
            attributes: {
                src: { type: String, required: true },
                alt: { type: String },
                title: { type: String },
            }
        },
        // Tables
        table: {
            render: 'table',
            transform(node, config) {
                return new Tag('div', { class: 'overflow-x-auto my-8' }, [
                    new Tag('table', { class: 'w-full text-left border-collapse' }, node.transformChildren(config))
                ]);
            }
        },
        thead: {
            render: 'thead',
            transform(node, config) {
                return new Tag('thead', { class: 'bg-zinc-900' }, node.transformChildren(config));
            }
        },
        tbody: {
            render: 'tbody',
            transform(node, config) {
                return new Tag('tbody', { class: 'divide-y divide-zinc-800' }, node.transformChildren(config));
            }
        },
        tr: {
            render: 'tr',
            transform(node, config) {
                return new Tag('tr', {}, node.transformChildren(config));
            }
        },
        th: {
            render: 'th',
            transform(node, config) {
                return new Tag('th', { class: 'p-4 border-b border-zinc-700 font-bold text-white' }, node.transformChildren(config));
            }
        },
        td: {
            render: 'td',
            transform(node, config) {
                return new Tag('td', { class: 'p-4 text-zinc-300' }, node.transformChildren(config));
            }
        },
        // Merge custom nodes for Keystatic compatibility
        ...customNodes as any,
    },
    tags: {
        // Custom Bild (Image) component from Keystatic content-components
        Bild: {
            render: 'figure',
            attributes: {
                image: { type: String },
                alt: { type: String },
                caption: { type: String },
                size: { type: String },
                position: { type: String },
            },
            transform(node: any) {
                const { image, alt, caption, size, position } = node.attributes;

                // Size classes
                const sizeClasses: Record<string, string> = {
                    'small': 'max-w-[25%]',
                    'medium': 'max-w-[50%]',
                    'large': 'max-w-[75%]',
                    'full': 'max-w-full w-full',
                };

                // Position classes
                const positionClasses: Record<string, string> = {
                    'left': 'mr-auto',
                    'center': 'mx-auto',
                    'right': 'ml-auto',
                };

                const sizeClass = sizeClasses[size] || sizeClasses['medium'];
                const posClass = positionClasses[position] || positionClasses['center'];

                const imgTag = new Tag('img', {
                    src: image || '',
                    alt: alt || '',
                    class: `rounded-xl shadow-lg w-full`,
                    loading: 'lazy'
                });

                const figureClasses = `my-8 ${sizeClass} ${posClass}`;

                if (caption) {
                    return new Tag('figure', { class: figureClasses }, [
                        imgTag,
                        new Tag('figcaption', { class: 'text-sm text-zinc-400 mt-2 text-center' }, [caption])
                    ]);
                }
                return new Tag('figure', { class: figureClasses }, [imgTag]);
            }
        },
    },
};
