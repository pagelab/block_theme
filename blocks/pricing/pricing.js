
( function ( blocks, element, blockEditor ) {
    const el = element.createElement,
        registerBlockType = blocks.registerBlockType,
        ServerSideRender = PgServerSideRender3,
        InspectorControls = blockEditor.InspectorControls,
        useBlockProps = blockEditor.useBlockProps;
        
    const {__} = wp.i18n;
    const {ColorPicker, TextControl, ToggleControl, SelectControl, Panel, PanelBody, Disabled, TextareaControl, BaseControl} = wp.components;
    const {useSelect} = wp.data;
    const {RawHTML, Fragment} = element;
   
    const {InnerBlocks, URLInputButton, RichText} = wp.blockEditor;
    const useInnerBlocksProps = blockEditor.useInnerBlocksProps || blockEditor.__experimentalUseInnerBlocksProps;
    
    const propOrDefault = function(val, prop, field) {
        if(block.attributes[prop] && (val === null || val === '')) {
            return field ? block.attributes[prop].default[field] : block.attributes[prop].default;
        }
        return val;
    }
    
    const block = registerBlockType( 'block-theme/pricing', {
        apiVersion: 2,
        title: 'Pricing ',
        description: 'Pricing section',
        icon: 'dashicons-art',
        category: 'pg_blocks',
        keywords: [],
        supports: {},
        attributes: {
        },
        example: { attributes: {  } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'not-prose py-16 md:py-24' });
            const setAttributes = props.setAttributes; 
            
            
            const innerBlocksProps = null;
            
            
            return el(Fragment, {}, [
                el('section', { ...blockProps }, [' ', el('div', { className: 'container mx-auto px-4' }, [' ', el('div', { className: 'text-center mb-12' }, [' ', el('p', { className: 'text-gray-600 mb-2' }, 'Tagline'), ' ', el('h1', { className: 'text-4xl md:text-5xl font-bold mb-4' }, 'Pricing plan'), ' ', el('p', { className: 'text-gray-600 max-w-2xl mx-auto' }, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'), ' ']), ' ', ' ', el('div', { className: 'grid md:grid-cols-2 gap-8 max-w-5xl mx-auto' }, [' ', ' ', el('div', { className: 'border border-gray-200 rounded-lg p-8 flex flex-col h-full' }, [' ', el('div', { className: 'flex justify-between items-start mb-6' }, [' ', el('div', {}, [' ', el('div', { className: 'text-black mb-2' }, [' ', el('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', className: 'mb-4', version: '1.1' }, [el('path', { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }), el('polyline', { points: '3.27 6.96 12 12.01 20.73 6.96' }), el('line', { x1: '12', y1: '22.08', x2: '12', y2: '12' })]), ' ']), ' ', el('h3', { className: 'text-2xl font-bold' }, 'Basic plan'), ' ', el('p', { className: 'text-gray-600 mt-2' }, 'Lorem ipsum dolor sit amet'), ' ']), ' ', el('div', { className: 'font-bold text-5xl' }, ['$19', el('span', { className: 'text-2xl text-gray-500' }, '/mo')]), ' ']), ' ', ' ', el('hr', { className: 'my-6 border-gray-200' }), ' ', ' ', el('div', { className: 'mb-8' }, [' ', el('p', { className: 'font-medium mb-4' }, 'Includes:'), ' ', el('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' }, [' ', el('div', {}, [' ', el('ul', { className: 'space-y-3' }, [' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ']), ' ']), ' ', el('div', {}, [' ', el('ul', { className: 'space-y-3' }, [' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ']), ' ']), ' ']), ' ']), ' ', ' ', el('div', { className: 'mt-auto' }, [' ', el('a', { href: '#', className: 'block w-full bg-black text-white text-center py-3 rounded hover:bg-gray-800 transition' }, 'Get started'), ' ']), ' ']), ' ', ' ', ' ', el('div', { className: 'border border-gray-200 rounded-lg p-8 flex flex-col h-full bg-gray-50' }, [' ', el('div', { className: 'flex justify-between items-start mb-6' }, [' ', el('div', {}, [' ', el('div', { className: 'text-black mb-2' }, [' ', el('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '32', height: '32', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', className: 'mb-4', version: '1.1' }, [el('path', { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }), el('polyline', { points: '3.27 6.96 12 12.01 20.73 6.96' }), el('line', { x1: '12', y1: '22.08', x2: '12', y2: '12' })]), ' ']), ' ', el('h3', { className: 'text-2xl font-bold' }, 'Business plan'), ' ', el('p', { className: 'text-gray-600 mt-2' }, 'Lorem ipsum dolor sit amet'), ' ']), ' ', el('div', { className: 'font-bold text-5xl' }, ['$29', el('span', { className: 'text-2xl text-gray-500' }, '/mo')]), ' ']), ' ', ' ', el('hr', { className: 'my-6 border-gray-200' }), ' ', ' ', el('div', { className: 'mb-8' }, [' ', el('p', { className: 'font-medium mb-4' }, 'Includes:'), ' ', el('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' }, [' ', el('ul', { className: 'space-y-3' }, [' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ', ' ', ' ']), ' ', el('ul', { className: 'space-y-3' }, [' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ', el('li', { className: 'flex items-start' }, [' ', el('svg', { className: 'h-5 w-5 text-green-500 mr-2 mt-0.5', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { fillRule: 'evenodd', d: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z', clipRule: 'evenodd' }), ' ']), ' Feature text goes here', ' ']), ' ', ' ', ' ']), ' ']), ' ']), ' ', ' ', el('div', { className: 'mt-auto' }, [' ', el('a', { href: '#', className: 'block w-full bg-black text-white text-center py-3 rounded hover:bg-gray-800 transition' }, 'Get started'), ' ']), ' ']), ' ']), ' ']), ' ']),                        
                
            ]);
        },

        save: function(props) {
            return null;
        }                        

    } );
} )(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor
);                        
