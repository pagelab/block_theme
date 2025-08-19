
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
    
    const block = registerBlockType( 'block-theme/team', {
        apiVersion: 2,
        title: 'Team',
        description: 'Team section',
        icon: 'dashicons-art',
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
                default: `Our team`,
            },
            description: {
                type: ['string', 'null'],
                default: `Our experienced team of web design professionals is dedicated to helping you create stunning and functional websites.`,
            }
        },
        example: { attributes: { tagline: `Tagline`, heading: `Our team`, description: `Our experienced team of web design professionals is dedicated to helping you create stunning and functional websites.` } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'not-prose py-16 md:py-24' });
            const setAttributes = props.setAttributes; 
            
            
            const innerBlocksProps = useInnerBlocksProps({ className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' }, {
                allowedBlocks: [ 'block-theme/team-member' ],
                template: [
    [ 'block-theme/team-member', {} ],
    [ 'block-theme/team-member', {} ],
    [ 'block-theme/team-member', {} ]
],
            } );
                            
            
            return el(Fragment, {}, [
                el('section', { ...blockProps }, [' ', ' ', el('div', { className: 'container mx-auto px-4' }, [' ', ' ', el('div', { className: 'text-center mb-12' }, [' ', ' ', el(RichText, { tagName: 'p', className: 'font-medium mb-2 text-primary-600 xl:text-gray-600', value: propOrDefault( props.attributes.tagline, 'tagline' ), onChange: function(val) { setAttributes( {tagline: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'h2', className: 'text-4xl md:text-5xl font-bold mb-4', value: propOrDefault( props.attributes.heading, 'heading' ), onChange: function(val) { setAttributes( {heading: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'p', className: 'text-gray-600 max-w-2xl mx-auto', value: propOrDefault( props.attributes.description, 'description' ), onChange: function(val) { setAttributes( {description: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ', ' ', el('div', { ...innerBlocksProps }), ' ', ' ']), ' ', ' ']),                        
                
                    el( InspectorControls, {},
                        [
                            
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
                                ])
                            )
                        ]
                    )                            

            ]);
        },

            save: function(props) {
                return el(InnerBlocks.Content);
            }                        
    
    } );
} )(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor
);                        
