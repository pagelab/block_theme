
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
    
    const block = registerBlockType( 'block-theme/event-item', {
        apiVersion: 2,
        title: 'Event Item',
        description: '',
        icon: 'block-default',
        category: 'pg_blocks',
        parent: [ 'block-theme/events' ],

        keywords: [],
        supports: {},
        attributes: {
            event_image: {
                type: ['object', 'null'],
                default: {id: 0, url: '', size: '', svg: '', alt: null},
            },
            event_icon: {
                type: ['object', 'null'],
                default: {id: 0, url: '', size: '', svg: `<svg class="h-12 w-12 text-gray-400" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/> </svg>`, alt: null},
            },
            event_title: {
                type: ['string', 'null'],
                default: `Event title heading`,
            },
            heading_color: {
                type: ['string', 'null'],
                default: '{{heading_color.color}}',
            },
            event_status: {
                type: ['string', 'null'],
                default: `Sold out`,
            },
            event_date_location: {
                type: ['string', 'null'],
                default: `Fri 09 Feb 2024 • Location`,
            },
            event_description: {
                type: ['string', 'null'],
                default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.`,
            },
            event_button: {
                type: ['string', 'null'],
                default: `Save my spot`,
            },
            event_button_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '', title: '', 'post_type': null},
            }
        },
        example: { attributes: { event_image: {id: 0, url: '', size: '', svg: '', alt: null}, event_icon: {id: 0, url: '', size: '', svg: `<svg class="h-12 w-12 text-gray-400" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/> </svg>`, alt: null}, event_title: `Event title heading`, heading_color: '', event_status: `Sold out`, event_date_location: `Fri 09 Feb 2024 • Location`, event_description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.`, event_button: `Save my spot`, event_button_link: {post_id: 0, url: '', title: '', 'post_type': null} } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'flex flex-col md:flex-row gap-6 mb-4' });
            const setAttributes = props.setAttributes; 
            
            props.event_image = useSelect(function( select ) {
                return {
                    event_image: props.attributes.event_image.id ? select('core').getMedia(props.attributes.event_image.id) : undefined
                };
            }, [props.attributes.event_image] ).event_image;
            

            props.event_icon = useSelect(function( select ) {
                return {
                    event_icon: props.attributes.event_icon.id ? select('core').getMedia(props.attributes.event_icon.id) : undefined
                };
            }, [props.attributes.event_icon] ).event_icon;
            
            
            const innerBlocksProps = null;
            
            
            return el(Fragment, {}, [
                el('div', { ...blockProps }, [' ', ' ', el('div', { className: 'w-full md:w-32' }, [' ', ' ', props.attributes.event_image && props.attributes.event_image.svg && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.event_image.svg, 'event_image', 'svg' ), { className: 'bg-gray-200 flex h-32 items-center justify-center' })), props.attributes.event_image && !props.attributes.event_image.svg && propOrDefault( props.attributes.event_image.url, 'event_image', 'url' ) && el('div', { className: 'bg-gray-200 flex h-32 items-center justify-center', src: propOrDefault( props.attributes.event_image.url, 'event_image', 'url' ) }, [' ', ' ', props.attributes.event_icon && !props.attributes.event_icon.url && propOrDefault( props.attributes.event_icon.svg, 'event_icon', 'svg' ) && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.event_icon.svg, 'event_icon', 'svg' ), { className: 'h-12 w-12 text-gray-400' })), props.attributes.event_icon && props.attributes.event_icon.url && el('img', { className: 'h-12 w-12 text-gray-400 ' + (props.attributes.event_icon.id ? ('wp-image-' + props.attributes.event_icon.id) : ''), src: propOrDefault( props.attributes.event_icon.url, 'event_icon', 'url' ) }), ' ', ' ']), ' ', ' ']), ' ', ' ', el('div', { className: 'w-full md:w-3/4 flex flex-col md:flex-row justify-between' }, [' ', ' ', el('div', {}, [' ', ' ', el('div', { className: 'flex items-center gap-4 mb-2' }, [' ', ' ', el(RichText, { tagName: 'h3', className: 'text-2xl font-bold', style: { ...((propOrDefault( props.attributes.heading_color, 'heading_color' ) !== null && propOrDefault( props.attributes.heading_color, 'heading_color' ) !== '') ? {color: propOrDefault( props.attributes.heading_color, 'heading_color' )} : {}) }, value: propOrDefault( props.attributes.event_title, 'event_title' ), onChange: function(val) { setAttributes( {event_title: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'span', className: 'bg-gray-100 px-2 py-1 text-sm', value: propOrDefault( props.attributes.event_status, 'event_status' ), onChange: function(val) { setAttributes( {event_status: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', el(RichText, { tagName: 'p', className: 'mb-2', value: propOrDefault( props.attributes.event_date_location, 'event_date_location' ), onChange: function(val) { setAttributes( {event_date_location: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'p', value: propOrDefault( props.attributes.event_description, 'event_description' ), onChange: function(val) { setAttributes( {event_description: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', el('div', { className: 'mt-4 self-center md:mt-0' }, [' ', ' ', el(RichText, { tagName: 'button', className: 'border border-black font-medium px-6 py-2 whitespace-nowrap hover:bg-gray-100', onClick: function(e) { e.preventDefault(); }, href: propOrDefault( props.attributes.event_button_link.url, 'event_button_link', 'url' ), value: propOrDefault( props.attributes.event_button, 'event_button' ), onChange: function(val) { setAttributes( {event_button: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ']), ' ', ' ']),                        
                
                    el( InspectorControls, {},
                        [
                            
                        pgMediaImageControl('event_image', setAttributes, props, 'full', true, 'Event Image', '' ),
                                        
                        pgMediaImageControl('event_icon', setAttributes, props, 'full', true, 'Event Icon', '' ),
                                        
                            el(Panel, {},
                                el(PanelBody, {
                                    title: __('Block properties')
                                }, [
                                    
                                    el(TextControl, {
                                        value: props.attributes.event_title,
                                        help: __( '' ),
                                        label: __( 'Event Title' ),
                                        onChange: function(val) { setAttributes({event_title: val}) },
                                        type: 'text'
                                    }),
                                    pgColorControl('heading_color', setAttributes, props, 'Sub Heading color', ''),

                                    el(TextControl, {
                                        value: props.attributes.event_status,
                                        help: __( '' ),
                                        label: __( 'Event Status' ),
                                        onChange: function(val) { setAttributes({event_status: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.event_date_location,
                                        help: __( '' ),
                                        label: __( 'Event Date & Location' ),
                                        onChange: function(val) { setAttributes({event_date_location: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.event_description,
                                        help: __( '' ),
                                        label: __( 'Event Description' ),
                                        onChange: function(val) { setAttributes({event_description: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.event_button,
                                        help: __( '' ),
                                        label: __( 'Event Button Text' ),
                                        onChange: function(val) { setAttributes({event_button: val}) },
                                        type: 'text'
                                    }),
                                    pgUrlControl('event_button_link', setAttributes, props, 'Event Button Link', '', null ),    
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
