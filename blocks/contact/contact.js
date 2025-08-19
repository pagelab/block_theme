
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
    
    const block = registerBlockType( 'block-theme/contact', {
        apiVersion: 2,
        title: 'Contact',
        description: 'Contact information section with email, phone and office details',
        icon: 'block-default',
        category: 'pg_blocks',
        keywords: [],
        supports: {},
        attributes: {
            tagline: {
                type: ['string', 'null'],
                default: `Tagline`,
            },
            heading: {
                type: ['string', 'null'],
                default: `Contact us`,
            },
            description: {
                type: ['string', 'null'],
                default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
            },
            email_icon: {
                type: ['object', 'null'],
                default: {id: 0, url: '', size: '', svg: `<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> </svg>`, alt: null},
            },
            email_title: {
                type: ['string', 'null'],
                default: `Email`,
            },
            email_description: {
                type: ['string', 'null'],
                default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.`,
            },
            email_address: {
                type: ['string', 'null'],
                default: `hello@relume.io`,
            },
            phone_icon: {
                type: ['object', 'null'],
                default: {id: 0, url: '', size: '', svg: `<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/> </svg>`, alt: null},
            },
            phone_title: {
                type: ['string', 'null'],
                default: `Phone`,
            },
            phone_description: {
                type: ['string', 'null'],
                default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.`,
            },
            phone_number: {
                type: ['string', 'null'],
                default: `+1 (555) 000-0000`,
            },
            office_icon: {
                type: ['object', 'null'],
                default: {id: 0, url: '', size: '', svg: `<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/> </svg>`, alt: null},
            },
            office_title: {
                type: ['string', 'null'],
                default: `Office`,
            },
            office_description: {
                type: ['string', 'null'],
                default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.`,
            },
            office_address: {
                type: ['string', 'null'],
                default: `123 Sample St, Sydney NSW 2000 AU`,
            }
        },
        example: { attributes: { tagline: `Tagline`, heading: `Contact us`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, email_icon: {id: 0, url: '', size: '', svg: `<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> </svg>`, alt: null}, email_title: `Email`, email_description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.`, email_address: `hello@relume.io`, phone_icon: {id: 0, url: '', size: '', svg: `<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/> </svg>`, alt: null}, phone_title: `Phone`, phone_description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.`, phone_number: `+1 (555) 000-0000`, office_icon: {id: 0, url: '', size: '', svg: `<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/> </svg>`, alt: null}, office_title: `Office`, office_description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.`, office_address: `123 Sample St, Sydney NSW 2000 AU` } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'not-prose bg-gray-50 py-16 md:py-24' });
            const setAttributes = props.setAttributes; 
            
            props.email_icon = useSelect(function( select ) {
                return {
                    email_icon: props.attributes.email_icon.id ? select('core').getMedia(props.attributes.email_icon.id) : undefined
                };
            }, [props.attributes.email_icon] ).email_icon;
            

            props.phone_icon = useSelect(function( select ) {
                return {
                    phone_icon: props.attributes.phone_icon.id ? select('core').getMedia(props.attributes.phone_icon.id) : undefined
                };
            }, [props.attributes.phone_icon] ).phone_icon;
            

            props.office_icon = useSelect(function( select ) {
                return {
                    office_icon: props.attributes.office_icon.id ? select('core').getMedia(props.attributes.office_icon.id) : undefined
                };
            }, [props.attributes.office_icon] ).office_icon;
            
            
            const innerBlocksProps = null;
            
            
            return el(Fragment, {}, [
                el('section', { ...blockProps }, [' ', ' ', el('div', { className: 'container mx-auto px-4' }, [' ', ' ', el('div', { className: 'text-center mb-12' }, [' ', ' ', el(RichText, { tagName: 'p', className: 'font-medium mb-2 text-primary-600 xl:text-gray-600', value: propOrDefault( props.attributes.tagline, 'tagline' ), onChange: function(val) { setAttributes( {tagline: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'h2', className: 'text-4xl md:text-5xl font-bold mb-4', value: propOrDefault( props.attributes.heading, 'heading' ), onChange: function(val) { setAttributes( {heading: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'p', className: 'text-gray-600 max-w-2xl mx-auto', value: propOrDefault( props.attributes.description, 'description' ), onChange: function(val) { setAttributes( {description: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', ' ', el('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto' }, [' ', ' ', el('div', { className: 'text-center' }, [' ', ' ', el('div', { className: 'flex justify-center mb-4' }, [' ', ' ', props.attributes.email_icon && !props.attributes.email_icon.url && propOrDefault( props.attributes.email_icon.svg, 'email_icon', 'svg' ) && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.email_icon.svg, 'email_icon', 'svg' ), { className: 'h-12 text-primary-600 w-12 xl:text-gray-600' })), props.attributes.email_icon && props.attributes.email_icon.url && el('img', { className: 'h-12 text-primary-600 w-12 xl:text-gray-600 ' + (props.attributes.email_icon.id ? ('wp-image-' + props.attributes.email_icon.id) : ''), src: propOrDefault( props.attributes.email_icon.url, 'email_icon', 'url' ) }), ' ', ' ']), ' ', ' ', el(RichText, { tagName: 'h3', className: 'text-2xl font-bold mb-3', value: propOrDefault( props.attributes.email_title, 'email_title' ), onChange: function(val) { setAttributes( {email_title: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'p', className: 'text-gray-600 mb-4', value: propOrDefault( props.attributes.email_description, 'email_description' ), onChange: function(val) { setAttributes( {email_description: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'a', href: 'mailto:' + props.attributes.email_address, className: 'font-medium text-primary-600 hover:underline xl:text-gray-600', value: propOrDefault( props.attributes.email_address, 'email_address' ), onChange: function(val) { setAttributes( {email_address: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', ' ', el('div', { className: 'text-center' }, [' ', ' ', el('div', { className: 'flex justify-center mb-4' }, [' ', ' ', props.attributes.phone_icon && !props.attributes.phone_icon.url && propOrDefault( props.attributes.phone_icon.svg, 'phone_icon', 'svg' ) && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.phone_icon.svg, 'phone_icon', 'svg' ), { className: 'h-12 text-primary-600 w-12 xl:text-gray-600' })), props.attributes.phone_icon && props.attributes.phone_icon.url && el('img', { className: 'h-12 text-primary-600 w-12 xl:text-gray-600 ' + (props.attributes.phone_icon.id ? ('wp-image-' + props.attributes.phone_icon.id) : ''), src: propOrDefault( props.attributes.phone_icon.url, 'phone_icon', 'url' ) }), ' ', ' ']), ' ', ' ', el(RichText, { tagName: 'h3', className: 'text-2xl font-bold mb-3', value: propOrDefault( props.attributes.phone_title, 'phone_title' ), onChange: function(val) { setAttributes( {phone_title: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'p', className: 'text-gray-600 mb-4', value: propOrDefault( props.attributes.phone_description, 'phone_description' ), onChange: function(val) { setAttributes( {phone_description: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'a', href: 'tel:' + props.attributes.phone_number, className: 'font-medium text-primary-600 hover:underline xl:text-gray-600', value: propOrDefault( props.attributes.phone_number, 'phone_number' ), onChange: function(val) { setAttributes( {phone_number: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', ' ', el('div', { className: 'text-center' }, [' ', ' ', el('div', { className: 'flex justify-center mb-4' }, [' ', ' ', props.attributes.office_icon && !props.attributes.office_icon.url && propOrDefault( props.attributes.office_icon.svg, 'office_icon', 'svg' ) && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.office_icon.svg, 'office_icon', 'svg' ), { className: 'h-12 text-primary-600 w-12 xl:text-gray-600' })), props.attributes.office_icon && props.attributes.office_icon.url && el('img', { className: 'h-12 text-primary-600 w-12 xl:text-gray-600 ' + (props.attributes.office_icon.id ? ('wp-image-' + props.attributes.office_icon.id) : ''), src: propOrDefault( props.attributes.office_icon.url, 'office_icon', 'url' ) }), ' ', ' ']), ' ', ' ', el(RichText, { tagName: 'h3', className: 'text-2xl font-bold mb-3', value: propOrDefault( props.attributes.office_title, 'office_title' ), onChange: function(val) { setAttributes( {office_title: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'p', className: 'text-gray-600 mb-4', value: propOrDefault( props.attributes.office_description, 'office_description' ), onChange: function(val) { setAttributes( {office_description: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'address', className: 'font-medium not-italic text-primary-600 xl:text-gray-600', value: propOrDefault( props.attributes.office_address, 'office_address' ), onChange: function(val) { setAttributes( {office_address: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ']), ' ', ' ']), ' ', ' ']),                        
                
                    el( InspectorControls, {},
                        [
                            
                        pgMediaImageControl('email_icon', setAttributes, props, 'full', true, 'Email Icon', '' ),
                                        
                        pgMediaImageControl('phone_icon', setAttributes, props, 'full', true, 'Phone Icon', '' ),
                                        
                        pgMediaImageControl('office_icon', setAttributes, props, 'full', true, 'Office Icon', '' ),
                                        
                            el(Panel, {},
                                el(PanelBody, {
                                    title: __('Block properties')
                                }, [
                                    
                                    el(TextControl, {
                                        value: props.attributes.tagline,
                                        help: __( '' ),
                                        label: __( 'Tagline' ),
                                        onChange: function(val) { setAttributes({tagline: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.heading,
                                        help: __( '' ),
                                        label: __( 'Heading' ),
                                        onChange: function(val) { setAttributes({heading: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.description,
                                        help: __( '' ),
                                        label: __( 'Description' ),
                                        onChange: function(val) { setAttributes({description: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.email_title,
                                        help: __( '' ),
                                        label: __( 'Email Title' ),
                                        onChange: function(val) { setAttributes({email_title: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.email_description,
                                        help: __( '' ),
                                        label: __( 'Email Description' ),
                                        onChange: function(val) { setAttributes({email_description: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.email_address,
                                        help: __( '' ),
                                        label: __( 'Email Address' ),
                                        onChange: function(val) { setAttributes({email_address: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.phone_title,
                                        help: __( '' ),
                                        label: __( 'Phone Title' ),
                                        onChange: function(val) { setAttributes({phone_title: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.phone_description,
                                        help: __( '' ),
                                        label: __( 'Phone Description' ),
                                        onChange: function(val) { setAttributes({phone_description: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.phone_number,
                                        help: __( '' ),
                                        label: __( 'Phone Number' ),
                                        onChange: function(val) { setAttributes({phone_number: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.office_title,
                                        help: __( '' ),
                                        label: __( 'Office Title' ),
                                        onChange: function(val) { setAttributes({office_title: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.office_description,
                                        help: __( '' ),
                                        label: __( 'Office Description' ),
                                        onChange: function(val) { setAttributes({office_description: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.office_address,
                                        help: __( '' ),
                                        label: __( 'Office Address' ),
                                        onChange: function(val) { setAttributes({office_address: val}) },
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
