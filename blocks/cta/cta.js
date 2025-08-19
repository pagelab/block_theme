
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
    
    const block = registerBlockType( 'block-theme/cta', {
        apiVersion: 2,
        title: 'CTA Section',
        description: 'Section showcasing tutorials with background image',
        icon: 'block-default',
        category: 'pg_blocks',
        keywords: [],
        supports: {},
        attributes: {
            background_image: {
                type: ['object', 'null'],
                default: {id: 0, url: 'https://images.unsplash.com/photo-1602064172250-43f8909056c7?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDd8fHdlYmRlc2lnbiUyMHdvcmtmbG93fGVufDB8fHx8MTc1NDUxODk3NHww&ixlib=rb-4.1.0&q=85&fm=jpg&crop=faces&cs=srgb&w=1200&h=800&fit=crop', size: '', svg: '', alt: null},
            },
            heading: {
                type: ['string', 'null'],
                default: `Start Your WordPress Block Theme Journey`,
            },
            description: {
                type: ['string', 'null'],
                default: `Learn how to build modern, responsive WordPress themes with Tailwind CSS through our comprehensive step-by-step tutorials.`,
            },
            primary_button_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            primary_button_text: {
                type: ['string', 'null'],
                default: `Get Started Now`,
            },
            secondary_button_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            secondary_button_text: {
                type: ['string', 'null'],
                default: `View Tutorials`,
            },
            sidebar_title: {
                type: ['string', 'null'],
                default: `Popular Tutorials`,
            },
            icon1: {
                type: ['object', 'null'],
                default: {id: 0, url: '', size: '', svg: `<svg class="h-4 w-4" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/> </svg>`, alt: null},
            },
            tutorial1: {
                type: ['string', 'null'],
                default: `Setting Up Your Development Environment`,
            },
            icon2: {
                type: ['object', 'null'],
                default: {id: 0, url: '', size: '', svg: `<svg class="h-4 w-4" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/> </svg>`, alt: null},
            },
            tutorial2: {
                type: ['string', 'null'],
                default: `Creating Custom Block Patterns`,
            },
            icon3: {
                type: ['object', 'null'],
                default: {id: 0, url: '', size: '', svg: `<svg class="h-4 w-4" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/> </svg>`, alt: null},
            },
            tutorial3: {
                type: ['string', 'null'],
                default: `Integrating Tailwind CSS with WordPress`,
            },
            view_all_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            view_all_text: {
                type: ['string', 'null'],
                default: `View All Tutorials →`,
            }
        },
        example: { attributes: { background_image: {id: 0, url: 'https://images.unsplash.com/photo-1602064172250-43f8909056c7?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDd8fHdlYmRlc2lnbiUyMHdvcmtmbG93fGVufDB8fHx8MTc1NDUxODk3NHww&ixlib=rb-4.1.0&q=85&fm=jpg&crop=faces&cs=srgb&w=1200&h=800&fit=crop', size: '', svg: '', alt: null}, heading: `Start Your WordPress Block Theme Journey`, description: `Learn how to build modern, responsive WordPress themes with Tailwind CSS through our comprehensive step-by-step tutorials.`, primary_button_link: {post_id: 0, url: '#', title: '', 'post_type': null}, primary_button_text: `Get Started Now`, secondary_button_link: {post_id: 0, url: '#', title: '', 'post_type': null}, secondary_button_text: `View Tutorials`, sidebar_title: `Popular Tutorials`, icon1: {id: 0, url: '', size: '', svg: `<svg class="h-4 w-4" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/> </svg>`, alt: null}, tutorial1: `Setting Up Your Development Environment`, icon2: {id: 0, url: '', size: '', svg: `<svg class="h-4 w-4" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/> </svg>`, alt: null}, tutorial2: `Creating Custom Block Patterns`, icon3: {id: 0, url: '', size: '', svg: `<svg class="h-4 w-4" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/> </svg>`, alt: null}, tutorial3: `Integrating Tailwind CSS with WordPress`, view_all_link: {post_id: 0, url: '#', title: '', 'post_type': null}, view_all_text: `View All Tutorials →` } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'bg-gray-800 bg-opacity-50 not-prose overflow-hidden py-16 relative md:py-20 xl:hover:bg-gray-900', style: { ...((propOrDefault( props.attributes.background_image.url, 'background_image', 'url' ) ? ('url(' + propOrDefault( props.attributes.background_image.url, 'background_image', 'url' ) + ')') : null !== null && propOrDefault( props.attributes.background_image.url, 'background_image', 'url' ) ? ('url(' + propOrDefault( props.attributes.background_image.url, 'background_image', 'url' ) + ')') : null !== '') ? {backgroundImage: propOrDefault( props.attributes.background_image.url, 'background_image', 'url' ) ? ('url(' + propOrDefault( props.attributes.background_image.url, 'background_image', 'url' ) + ')') : null} : {}) } });
            const setAttributes = props.setAttributes; 
            
            props.background_image = useSelect(function( select ) {
                return {
                    background_image: props.attributes.background_image.id ? select('core').getMedia(props.attributes.background_image.id) : undefined
                };
            }, [props.attributes.background_image] ).background_image;
            

            props.icon1 = useSelect(function( select ) {
                return {
                    icon1: props.attributes.icon1.id ? select('core').getMedia(props.attributes.icon1.id) : undefined
                };
            }, [props.attributes.icon1] ).icon1;
            

            props.icon2 = useSelect(function( select ) {
                return {
                    icon2: props.attributes.icon2.id ? select('core').getMedia(props.attributes.icon2.id) : undefined
                };
            }, [props.attributes.icon2] ).icon2;
            

            props.icon3 = useSelect(function( select ) {
                return {
                    icon3: props.attributes.icon3.id ? select('core').getMedia(props.attributes.icon3.id) : undefined
                };
            }, [props.attributes.icon3] ).icon3;
            
            
            const innerBlocksProps = null;
            
            
            return el(Fragment, {}, [
                el('section', { ...blockProps }, [' ', ' ', el('div', { className: 'absolute inset-0 z-0 bg-black bg-opacity-50' }), ' ', ' ', el('div', { className: 'container mx-auto px-4 relative z-10' }, [' ', ' ', el('div', { className: 'flex flex-col md:flex-row items-center justify-between' }, [' ', ' ', el('div', { className: 'mb-8 md:mb-0 md:w-1/2' }, [' ', ' ', el(RichText, { tagName: 'h2', className: 'text-3xl md:text-4xl font-bold text-white mb-4', value: propOrDefault( props.attributes.heading, 'heading' ), onChange: function(val) { setAttributes( {heading: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'p', className: 'text-gray-200 text-lg mb-6', value: propOrDefault( props.attributes.description, 'description' ), onChange: function(val) { setAttributes( {description: val }) } }), ' ', ' ', el('div', { className: 'flex flex-wrap gap-4' }, [' ', ' ', el(RichText, { tagName: 'a', href: propOrDefault( props.attributes.primary_button_link.url, 'primary_button_link', 'url' ), className: 'bg-gray-900 duration-300 font-semibold px-6 py-3 rounded-md text-white transition hover:bg-primary-700', onClick: function(e) { e.preventDefault(); }, value: propOrDefault( props.attributes.primary_button_text, 'primary_button_text' ), onChange: function(val) { setAttributes( {primary_button_text: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'a', href: propOrDefault( props.attributes.secondary_button_link.url, 'secondary_button_link', 'url' ), className: 'bg-transparent border border-white text-white hover:bg-white hover:text-gray-800 font-semibold py-3 px-6 rounded-md transition duration-300', onClick: function(e) { e.preventDefault(); }, value: propOrDefault( props.attributes.secondary_button_text, 'secondary_button_text' ), onChange: function(val) { setAttributes( {secondary_button_text: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ']), ' ', ' ', el('div', { className: 'md:w-2/5' }, [' ', ' ', el('div', { className: 'bg-white p-6 rounded-lg shadow-lg' }, [' ', ' ', el(RichText, { tagName: 'h3', className: 'text-xl font-bold text-gray-800 mb-4', value: propOrDefault( props.attributes.sidebar_title, 'sidebar_title' ), onChange: function(val) { setAttributes( {sidebar_title: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el('ul', { className: 'space-y-3' }, [' ', ' ', el('li', { className: 'flex items-center' }, [' ', ' ', el('span', { className: 'bg-gray-900 mr-3 p-1 rounded-full text-white' }, [' ', ' ', props.attributes.icon1 && !props.attributes.icon1.url && propOrDefault( props.attributes.icon1.svg, 'icon1', 'svg' ) && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.icon1.svg, 'icon1', 'svg' ), { className: 'h-4 w-4' })), props.attributes.icon1 && props.attributes.icon1.url && el('img', { className: 'h-4 w-4 ' + (props.attributes.icon1.id ? ('wp-image-' + props.attributes.icon1.id) : ''), src: propOrDefault( props.attributes.icon1.url, 'icon1', 'url' ) }), ' ', ' ']), ' ', ' ', el(RichText, { tagName: 'span', className: 'text-gray-700', value: propOrDefault( props.attributes.tutorial1, 'tutorial1' ), onChange: function(val) { setAttributes( {tutorial1: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', el('li', { className: 'flex items-center' }, [' ', ' ', el('span', { className: 'bg-gray-900 mr-3 p-1 rounded-full text-white' }, [' ', ' ', props.attributes.icon2 && !props.attributes.icon2.url && propOrDefault( props.attributes.icon2.svg, 'icon2', 'svg' ) && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.icon2.svg, 'icon2', 'svg' ), { className: 'h-4 w-4' })), props.attributes.icon2 && props.attributes.icon2.url && el('img', { className: 'h-4 w-4 ' + (props.attributes.icon2.id ? ('wp-image-' + props.attributes.icon2.id) : ''), src: propOrDefault( props.attributes.icon2.url, 'icon2', 'url' ) }), ' ', ' ']), ' ', ' ', el(RichText, { tagName: 'span', className: 'text-gray-700', value: propOrDefault( props.attributes.tutorial2, 'tutorial2' ), onChange: function(val) { setAttributes( {tutorial2: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', el('li', { className: 'flex items-center' }, [' ', ' ', el('span', { className: 'bg-gray-900 mr-3 p-1 rounded-full text-white' }, [' ', ' ', props.attributes.icon3 && !props.attributes.icon3.url && propOrDefault( props.attributes.icon3.svg, 'icon3', 'svg' ) && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.icon3.svg, 'icon3', 'svg' ), { className: 'h-4 w-4' })), props.attributes.icon3 && props.attributes.icon3.url && el('img', { className: 'h-4 w-4 ' + (props.attributes.icon3.id ? ('wp-image-' + props.attributes.icon3.id) : ''), src: propOrDefault( props.attributes.icon3.url, 'icon3', 'url' ) }), ' ', ' ']), ' ', ' ', el(RichText, { tagName: 'span', className: 'text-gray-700', value: propOrDefault( props.attributes.tutorial3, 'tutorial3' ), onChange: function(val) { setAttributes( {tutorial3: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ']), ' ', ' ', el(RichText, { tagName: 'a', href: propOrDefault( props.attributes.view_all_link.url, 'view_all_link', 'url' ), className: 'font-medium inline-block mt-5 text-primary-600 hover:text-primary-700 xl:text-gray-600', onClick: function(e) { e.preventDefault(); }, value: propOrDefault( props.attributes.view_all_text, 'view_all_text' ), onChange: function(val) { setAttributes( {view_all_text: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ']), ' ', ' ']), ' ', ' ']), ' ', ' ']),                        
                
                    el( InspectorControls, {},
                        [
                            
                        pgMediaImageControl('background_image', setAttributes, props, 'full', true, 'Background Image', '' ),
                                        
                        pgMediaImageControl('icon1', setAttributes, props, 'full', true, 'Icon 1', '' ),
                                        
                        pgMediaImageControl('icon2', setAttributes, props, 'full', true, 'Icon 2', '' ),
                                        
                        pgMediaImageControl('icon3', setAttributes, props, 'full', true, 'Icon 3', '' ),
                                        
                            el(Panel, {},
                                el(PanelBody, {
                                    title: __('Block properties')
                                }, [
                                    
                                    el(TextControl, {
                                        value: props.attributes.heading,
                                        help: __( '' ),
                                        label: __( 'Main Heading' ),
                                        onChange: function(val) { setAttributes({heading: val}) },
                                        type: 'text'
                                    }),
                                    el(BaseControl, {
                                        help: __( '' ),
                                        label: __( 'Description' ),
                                    }, [
                                        el(RichText, {
                                            value: props.attributes.description,
                                            style: {
                                                    border: '1px solid black',
                                                    padding: '6px 8px',
                                                    minHeight: '80px',
                                                    border: '1px solid rgb(117, 117, 117)',
                                                    fontSize: '13px',
                                                    lineHeight: 'normal'
                                                },
                                            onChange: function(val) { setAttributes({description: val}) },
                                        })
                                    ]),
                                    pgUrlControl('primary_button_link', setAttributes, props, 'Primary Button Link', '', null ),
                                    el(TextControl, {
                                        value: props.attributes.primary_button_text,
                                        help: __( '' ),
                                        label: __( 'Primary Button Text' ),
                                        onChange: function(val) { setAttributes({primary_button_text: val}) },
                                        type: 'text'
                                    }),
                                    pgUrlControl('secondary_button_link', setAttributes, props, 'Secondary Button Link', '', null ),
                                    el(TextControl, {
                                        value: props.attributes.secondary_button_text,
                                        help: __( '' ),
                                        label: __( 'Secondary Button Text' ),
                                        onChange: function(val) { setAttributes({secondary_button_text: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.sidebar_title,
                                        help: __( '' ),
                                        label: __( 'Sidebar Title' ),
                                        onChange: function(val) { setAttributes({sidebar_title: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.tutorial1,
                                        help: __( '' ),
                                        label: __( 'Tutorial 1' ),
                                        onChange: function(val) { setAttributes({tutorial1: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.tutorial2,
                                        help: __( '' ),
                                        label: __( 'Tutorial 2' ),
                                        onChange: function(val) { setAttributes({tutorial2: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.tutorial3,
                                        help: __( '' ),
                                        label: __( 'Tutorial 3' ),
                                        onChange: function(val) { setAttributes({tutorial3: val}) },
                                        type: 'text'
                                    }),
                                    pgUrlControl('view_all_link', setAttributes, props, 'View All Link', '', null ),
                                    el(TextControl, {
                                        value: props.attributes.view_all_text,
                                        help: __( '' ),
                                        label: __( 'View All Text' ),
                                        onChange: function(val) { setAttributes({view_all_text: val}) },
                                        type: 'text'
                                    }),    
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
