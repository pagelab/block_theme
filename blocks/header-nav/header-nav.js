
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
    
    const block = registerBlockType( 'block-theme/header-nav', {
        apiVersion: 2,
        title: 'Header Navigation',
        description: 'Main site navigation with logo, links and search',
        icon: 'block-default',
        category: 'pg_blocks',
        keywords: [],
        supports: {},
        attributes: {
            logo_text: {
                type: ['string', 'null'],
                default: `Logo`,
            },
            show_search: {
                type: ['string', 'null'],
                default: '',
            },
            search_placeholder: {
                type: ['string', 'null'],
                default: 'Search',
            },
            icon_link_1: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '', title: '', 'post_type': null},
            },
            icon_1: {
                type: ['object', 'null'],
                default: {id: 0, url: '', size: '', svg: `<svg class="h-6 w-6" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/> </svg>`, alt: null},
            },
            icon_link_2: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '', title: '', 'post_type': null},
            },
            icon_2: {
                type: ['object', 'null'],
                default: {id: 0, url: '', size: '', svg: `<svg class="h-5 w-5 text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/> </svg>`, alt: null},
            }
        },
        example: { attributes: { logo_text: `Logo`, show_search: '', search_placeholder: 'Search', icon_link_1: {post_id: 0, url: '#', title: '', 'post_type': null}, icon_1: {id: 0, url: '', size: '', svg: `<svg class="h-6 w-6" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/> </svg>`, alt: null}, icon_link_2: {post_id: 0, url: '#', title: '', 'post_type': null}, icon_2: {id: 0, url: '', size: '', svg: `<svg class="h-5 w-5 text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/> </svg>`, alt: null} } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'not-prose flex items-center justify-between w-full py-4 px-6 shadow-sm' });
            const setAttributes = props.setAttributes; 
            
            props.icon_1 = useSelect(function( select ) {
                return {
                    icon_1: props.attributes.icon_1.id ? select('core').getMedia(props.attributes.icon_1.id) : undefined
                };
            }, [props.attributes.icon_1] ).icon_1;
            

            props.icon_2 = useSelect(function( select ) {
                return {
                    icon_2: props.attributes.icon_2.id ? select('core').getMedia(props.attributes.icon_2.id) : undefined
                };
            }, [props.attributes.icon_2] ).icon_2;
            
            
            const innerBlocksProps = null;
            
            
            return el(Fragment, {}, [
                el('nav', { ...blockProps }, [' ', ' ', el('div', { className: 'flex items-center' }, [' ', ' ', el(RichText, { tagName: 'a', href: 'index.html', className: 'text-2xl font-bold text-black', value: propOrDefault( props.attributes.logo_text, 'logo_text' ), onChange: function(val) { setAttributes( {logo_text: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', ' ', el('div', { className: 'hidden md:flex items-center space-x-8' }, [' ', ' ', el('a', { href: '#', className: 'text-gray-700 hover:text-primary-600 transition-colors' }, 'Link One'), ' ', ' ', el('a', { href: '#', className: 'text-gray-700 hover:text-primary-600 transition-colors' }, 'Link Two'), ' ', ' ', el('a', { href: '#', className: 'text-gray-700 hover:text-primary-600 transition-colors' }, 'Link Three'), ' ', ' ', el('div', { className: 'relative group' }, [' ', ' ', el('a', { href: '#', className: 'text-gray-700 hover:text-primary-600 transition-colors flex items-center' }, [' ', ' Link Four ', ' ', el('svg', { className: 'h-4 w-4 ml-1', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', 'xmlSpace': '', fill: 'none', stroke: 'currentColor' }, [' ', el('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M19 9l-7 7-7-7' }), ' ']), ' ', ' ']), ' ', ' ']), ' ', ' ']), ' ', ' ', ' ', el('div', { className: 'flex items-center space-x-4' }, [' ', ' ', el('div', { className: 'relative ' + propOrDefault( props.attributes.show_search, 'show_search' ) }, [' ', ' ', el('input', { type: 'text', placeholder: propOrDefault( props.attributes.search_placeholder, 'search_placeholder' ), className: 'py-1 pl-8 pr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500' }), ' ', ' ', el('svg', { className: 'h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', 'xmlSpace': '', fill: 'none', stroke: 'currentColor' }, [' ', el('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' }), ' ']), ' ', ' ']), ' ', ' ', props.attributes.icon_link_1 && props.attributes.icon_link_1.url && el('a', { href: props.attributes.icon_link_1.url, className: 'text-gray-700 hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, [' ', ' ', props.attributes.icon_1 && !props.attributes.icon_1.url && propOrDefault( props.attributes.icon_1.svg, 'icon_1', 'svg' ) && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.icon_1.svg, 'icon_1', 'svg' ), { className: 'h-6 w-6' })), props.attributes.icon_1 && props.attributes.icon_1.url && el('img', { className: 'h-6 w-6 ' + (props.attributes.icon_1.id ? ('wp-image-' + props.attributes.icon_1.id) : ''), src: propOrDefault( props.attributes.icon_1.url, 'icon_1', 'url' ) }), ' ', ' ']), ' ', ' ', props.attributes.icon_link_2 && props.attributes.icon_link_2.url && el('a', { href: props.attributes.icon_link_2.url, className: 'flex items-center justify-center w-8 h-8 rounded-full bg-gray-200', onClick: function(e) { e.preventDefault(); } }, [' ', ' ', props.attributes.icon_2 && !props.attributes.icon_2.url && propOrDefault( props.attributes.icon_2.svg, 'icon_2', 'svg' ) && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.icon_2.svg, 'icon_2', 'svg' ), { className: 'h-5 w-5 text-gray-600' })), props.attributes.icon_2 && props.attributes.icon_2.url && el('img', { className: 'h-5 w-5 text-gray-600 ' + (props.attributes.icon_2.id ? ('wp-image-' + props.attributes.icon_2.id) : ''), src: propOrDefault( props.attributes.icon_2.url, 'icon_2', 'url' ) }), ' ', ' ']), ' ', ' ']), ' ', ' ']),                        
                
                    el( InspectorControls, {},
                        [
                            
                        pgMediaImageControl('icon_1', setAttributes, props, 'full', true, 'Icon 1', '' ),
                                        
                        pgMediaImageControl('icon_2', setAttributes, props, 'full', true, 'Icon 2', '' ),
                                        
                            el(Panel, {},
                                el(PanelBody, {
                                    title: __('Block properties')
                                }, [
                                    
                                    el(TextControl, {
                                        value: props.attributes.logo_text,
                                        help: __( '' ),
                                        label: __( 'Logo Text' ),
                                        onChange: function(val) { setAttributes({logo_text: val}) },
                                        type: 'text'
                                    }),
                                    el(ToggleControl, {
                                        checked: props.attributes.show_search === '',
                                        label: __( 'Show Search' ),
                                        onChange: function(val) { setAttributes({show_search: val ? '' : ''}) },
                                        help: __( '' ),
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.search_placeholder,
                                        help: __( '' ),
                                        label: __( 'Search Placeholder' ),
                                        onChange: function(val) { setAttributes({search_placeholder: val}) },
                                        type: 'text'
                                    }),
                                    pgUrlControl('icon_link_1', setAttributes, props, 'Icon Link 1', '', null ),
                                    pgUrlControl('icon_link_2', setAttributes, props, 'Icon Link 2', '', null ),    
                                ])
                            )
                        ]
                    )                            

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
