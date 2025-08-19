
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
    
    const block = registerBlockType( 'block-theme/events', {
        apiVersion: 2,
        title: 'Events',
        description: 'Events section',
        icon: 'dashicons-art',
        category: 'design',
        keywords: [],
        supports: {},
        attributes: {
            text_color: {
                type: ['string', 'null'],
                default: '',
            },
            tagline: {
                type: ['string', 'null'],
                default: `Tagline`,
            },
            heading: {
                type: ['string', 'null'],
                default: `Events`,
            },
            heading_color: {
                type: ['string', 'null'],
                default: '',
            },
            description: {
                type: ['string', 'null'],
                default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.`,
            },
            button_all: {
                type: ['string', 'null'],
                default: `View all`,
            },
            button_cat1: {
                type: ['string', 'null'],
                default: `Category one`,
            },
            button_cat2: {
                type: ['string', 'null'],
                default: `Category two`,
            },
            button_cat3: {
                type: ['string', 'null'],
                default: `Category three`,
            },
            button_cat4: {
                type: ['string', 'null'],
                default: `Category four`,
            }
        },
        example: { attributes: { text_color: '', tagline: `Tagline`, heading: `Events`, heading_color: '', description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.`, button_all: `View all`, button_cat1: `Category one`, button_cat2: `Category two`, button_cat3: `Category three`, button_cat4: `Category four` } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'not-prose py-16 px-4 md:px-8', style: { ...((propOrDefault( props.attributes.text_color, 'text_color' ) !== null && propOrDefault( props.attributes.text_color, 'text_color' ) !== '') ? {color: propOrDefault( props.attributes.text_color, 'text_color' )} : {}) } });
            const setAttributes = props.setAttributes; 
            
            
            const innerBlocksProps = useInnerBlocksProps({ className: 'border-t border-gray-200 pt-8 pb-4' }, {
                allowedBlocks: [ 'block-theme/event-item' ],
                template: [
    [ 'block-theme/event-item', {} ]
],
            } );
                            
            
            return el(Fragment, {}, [
                el('section', { ...blockProps }, [' ', ' ', el('div', { className: 'max-w-6xl mx-auto' }, [' ', ' ', el('div', { className: 'text-center mb-12' }, [' ', ' ', el(RichText, { tagName: 'p', className: 'mb-2', value: propOrDefault( props.attributes.tagline, 'tagline' ), onChange: function(val) { setAttributes( {tagline: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'h2', className: 'text-5xl font-bold mb-6', style: { ...((propOrDefault( props.attributes.heading_color, 'heading_color' ) !== null && propOrDefault( props.attributes.heading_color, 'heading_color' ) !== '') ? {color: propOrDefault( props.attributes.heading_color, 'heading_color' )} : {}) }, value: propOrDefault( props.attributes.heading, 'heading' ), onChange: function(val) { setAttributes( {heading: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'p', className: 'max-w-3xl mx-auto', value: propOrDefault( props.attributes.description, 'description' ), onChange: function(val) { setAttributes( {description: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', ' ', el('div', { className: 'flex flex-wrap justify-center gap-4 mb-12' }, [' ', ' ', el(RichText, { tagName: 'button', className: 'border border-black px-6 py-2 font-medium hover:bg-gray-100', value: propOrDefault( props.attributes.button_all, 'button_all' ), onChange: function(val) { setAttributes( {button_all: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'button', className: 'font-medium hover:bg-gray-100 px-6 py-2', value: propOrDefault( props.attributes.button_cat1, 'button_cat1' ), onChange: function(val) { setAttributes( {button_cat1: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'button', className: 'px-6 py-2 font-medium hover:bg-gray-100', value: propOrDefault( props.attributes.button_cat2, 'button_cat2' ), onChange: function(val) { setAttributes( {button_cat2: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'button', className: 'px-6 py-2 font-medium hover:bg-gray-100', value: propOrDefault( props.attributes.button_cat3, 'button_cat3' ), onChange: function(val) { setAttributes( {button_cat3: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'button', className: 'px-6 py-2 font-medium hover:bg-gray-100', value: propOrDefault( props.attributes.button_cat4, 'button_cat4' ), onChange: function(val) { setAttributes( {button_cat4: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', ' ', el('div', { ...innerBlocksProps }), ' ', ' ', ' ', ' ', ' ', ' ', ' ']), ' ', ' ']),                        
                
                    el( InspectorControls, {},
                        [
                            
                            el(Panel, {},
                                el(PanelBody, {
                                    title: __('Block properties')
                                }, [
                                    
                                    pgColorControl('text_color', setAttributes, props, 'Text color', 'Change the text color'),

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
                                    pgColorControl('heading_color', setAttributes, props, 'Heading color', 'Change the heading color'),

                                    el(TextControl, {
                                        value: props.attributes.description,
                                        help: __( '' ),
                                        label: __( 'Description' ),
                                        onChange: function(val) { setAttributes({description: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.button_all,
                                        help: __( '' ),
                                        label: __( 'All Button Text' ),
                                        onChange: function(val) { setAttributes({button_all: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.button_cat1,
                                        help: __( '' ),
                                        label: __( 'Category 1 Button' ),
                                        onChange: function(val) { setAttributes({button_cat1: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.button_cat2,
                                        help: __( '' ),
                                        label: __( 'Category 2 Button' ),
                                        onChange: function(val) { setAttributes({button_cat2: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.button_cat3,
                                        help: __( '' ),
                                        label: __( 'Category 3 Button' ),
                                        onChange: function(val) { setAttributes({button_cat3: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.button_cat4,
                                        help: __( '' ),
                                        label: __( 'Category 4 Button' ),
                                        onChange: function(val) { setAttributes({button_cat4: val}) },
                                        type: 'text'
                                    }),    
                                ])
                            )
                        ]
                    )                            

            ]);
        },

        save: function(props) {
            const blockProps = useBlockProps.save({ className: 'not-prose py-16 px-4 md:px-8', style: { ...((propOrDefault( props.attributes.text_color, 'text_color' ) !== null && propOrDefault( props.attributes.text_color, 'text_color' ) !== '') ? {color: propOrDefault( props.attributes.text_color, 'text_color' )} : {}) } });
            return el('section', { ...blockProps }, [' ', ' ', el('div', { className: 'max-w-6xl mx-auto' }, [' ', ' ', el('div', { className: 'text-center mb-12' }, [' ', ' ', el(RichText.Content, { tagName: 'p', className: 'mb-2', value: propOrDefault( props.attributes.tagline, 'tagline' ) }), ' ', ' ', el(RichText.Content, { tagName: 'h2', className: 'text-5xl font-bold mb-6', style: { ...((propOrDefault( props.attributes.heading_color, 'heading_color' ) !== null && propOrDefault( props.attributes.heading_color, 'heading_color' ) !== '') ? {color: propOrDefault( props.attributes.heading_color, 'heading_color' )} : {}) }, value: propOrDefault( props.attributes.heading, 'heading' ) }), ' ', ' ', el(RichText.Content, { tagName: 'p', className: 'max-w-3xl mx-auto', value: propOrDefault( props.attributes.description, 'description' ) }), ' ', ' ']), ' ', ' ', ' ', el('div', { className: 'flex flex-wrap justify-center gap-4 mb-12' }, [' ', ' ', el(RichText.Content, { tagName: 'button', className: 'border border-black px-6 py-2 font-medium hover:bg-gray-100', value: propOrDefault( props.attributes.button_all, 'button_all' ) }), ' ', ' ', el(RichText.Content, { tagName: 'button', className: 'font-medium hover:bg-gray-100 px-6 py-2', value: propOrDefault( props.attributes.button_cat1, 'button_cat1' ) }), ' ', ' ', el(RichText.Content, { tagName: 'button', className: 'px-6 py-2 font-medium hover:bg-gray-100', value: propOrDefault( props.attributes.button_cat2, 'button_cat2' ) }), ' ', ' ', el(RichText.Content, { tagName: 'button', className: 'px-6 py-2 font-medium hover:bg-gray-100', value: propOrDefault( props.attributes.button_cat3, 'button_cat3' ) }), ' ', ' ', el(RichText.Content, { tagName: 'button', className: 'px-6 py-2 font-medium hover:bg-gray-100', value: propOrDefault( props.attributes.button_cat4, 'button_cat4' ) }), ' ', ' ']), ' ', ' ', ' ', el('div', { className: 'border-t border-gray-200 pt-8 pb-4' }, el(InnerBlocks.Content, { allowedBlocks: [ 'block-theme/event-item' ] })), ' ', ' ', ' ', ' ', ' ', ' ', ' ']), ' ', ' ']);
        }                        

    } );
} )(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor
);                        
