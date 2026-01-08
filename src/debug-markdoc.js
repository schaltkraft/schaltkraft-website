const Markdoc = require('@markdoc/markdoc');

if (Markdoc.Ast) {
    console.log('Markdoc.Ast keys:', Object.keys(Markdoc.Ast));
    console.log('Markdoc.Ast.fromJSON:', typeof Markdoc.Ast.fromJSON);
}

try {
    const { Node } = require('@markdoc/markdoc');
    try {
        const n = new Node('paragraph');
        console.log('new Node work?', !!n);
        console.log('Node prototype:', Object.keys(n));
    } catch (e) {
        console.log('new Node failed:', e.message);
    }
} catch (e) { }
