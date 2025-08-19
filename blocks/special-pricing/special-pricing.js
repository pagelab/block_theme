
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
    
    const block = registerBlockType( 'block-theme/special-pricing', {
        apiVersion: 2,
        title: 'Special Pricing',
        description: 'Pricing block',
        icon: 'wordpress',
        category: 'design',
        keywords: [],
        supports: { color: { link: true }, typography: { fontSize: true }, anchor: true, ariaLabel: true },
        attributes: {
        },
        example: { attributes: {  } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'bg-gray-800 not-prose py-16 md:py-24' });
            const setAttributes = props.setAttributes; 
            
            
            const innerBlocksProps = null;
            
            
            return el(Fragment, {}, [
                el('section', { ...blockProps }, [' ', el('div', { className: 'container mx-auto px-4' }, [' ', el('div', { className: 'flex flex-col overflow-hidden rounded-xl shadow-lg lg:flex-row' }, [' ', ' ', el('div', { className: 'bg-gray-700 p-8 md:p-10 lg:w-3/5' }, [' ', el('h2', { className: 'text-white text-xl font-semibold mb-6' }, 'Choose a pricing plan:'), ' ', ' ', ' ', el('div', { role: 'tablist', className: 'flex flex-wrap md:flex-nowrap mb-10 rounded-lg overflow-hidden' }, [' ', el('button', { role: 'tab', 'aria-selected': 'false', className: 'flex-1 py-4 px-2 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors focus-visible:outline-white focus-visible:outline-2' }, [' Starter', ' ']), ' ', el('button', { role: 'tab', 'aria-selected': 'false', className: 'flex-1 py-4 px-2 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors focus-visible:outline-white focus-visible:outline-2' }, [' Standard', ' ']), ' ', el('button', { role: 'tab', 'aria-selected': 'false', className: 'flex-1 py-4 px-2 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 transition-colors focus-visible:outline-white focus-visible:outline-2' }, [' Premium', ' ']), ' ', el('button', { role: 'tab', 'aria-selected': 'true', className: 'flex-1 py-4 px-2 bg-gray-700 text-white font-bold border border-gray-500 hover:bg-gray-600 transition-colors focus-visible:outline-white focus-visible:outline-2' }, [' Enterprise', ' ']), ' ']), ' ', ' ', ' ', el('div', { role: 'tabpanel', className: 'space-y-4' }, [' ', el('h3', { className: 'text-white text-lg font-semibold' }, 'Enterprise details:'), ' ', el('p', { className: 'text-gray-400 text-sm leading-relaxed' }, [' Plan pricing starts at unlimited contacts. Select your audience size to calculate your price. ', ' The monthly email send limit for Standard plans is 12 times your maximum contact count.*', ' ']), ' ']), ' ']), ' ', ' ', ' ', el('div', { className: 'bg-gray-700 flex flex-col p-8 md:p-10 lg:w-2/5' }, [' ', el('h3', { className: 'font-semibold mb-8 text-2xl text-white xl:text-3xl' }, 'Enterprise plan'), ' ', ' ', el('div', { className: 'mb-6' }, [' ', el('p', { className: 'mb-2 text-gray-400 text-sm' }, 'Starts at'), ' ', el('p', { className: 'text-white text-5xl md:text-6xl font-bold' }, '$249'), ' ']), ' ', ' ', el('button', { className: 'bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all mb-4' }, [' Buy now', ' ']), ' ', ' ', el('a', { href: '#', className: 'inline-flex items-center mb-4 text-blue-400 hover:underline' }, [' View team pricing ', el('svg', { xmlns: 'http://www.w3.org/2000/svg', className: 'h-4 w-4 ml-1', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', version: '1.1' }, el('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M14 5l7 7m0 0l-7 7m7-7H3' })), ' ']), ' ', ' ', el('p', { className: 'text-xs text-gray-400 mt-auto' }, [' *To see the monthly email send limit included with your specific plan, click Calculate my price. If your plan\'s contact or email send limit is exceeded, you will be charged for overages.', ' ']), ' ']), ' ']), ' ']), ' ']),                        
                
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
