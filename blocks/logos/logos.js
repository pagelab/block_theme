
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
    
    const block = registerBlockType( 'block-theme/logos', {
        apiVersion: 2,
        title: 'Logos',
        description: 'Logo section',
        icon: 'dashicons-art',
        category: 'design',
        keywords: [],
        supports: {},
        attributes: {
            heading: {
                type: ['string', 'null'],
                default: `Used by the world's most average companies`,
            }
        },
        example: { attributes: { heading: `Used by the world's most average companies` } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'not-prose py-12 md:py-16' });
            const setAttributes = props.setAttributes; 
            
            
            const innerBlocksProps = useInnerBlocksProps({ className: 'grid grid-cols-2 md:grid-cols-6 gap-8 items-center' }, {
                allowedBlocks: [ 'block-theme/logo-item' ],
                template: [
    [ 'block-theme/logo-item', {} ],
    [ 'block-theme/logo-item', {} ],
    [ 'block-theme/logo-item', {} ],
    [ 'block-theme/logo-item', {} ],
    [ 'block-theme/logo-item', {} ],
    [ 'block-theme/logo-item', {} ]
],
            } );
                            
            
            return el(Fragment, {}, [
                el('section', { ...blockProps }, [' ', ' ', el('div', { className: 'container mx-auto px-4' }, [' ', ' ', el(RichText, { tagName: 'h2', className: 'text-2xl md:text-3xl font-bold text-center mb-10', value: propOrDefault( props.attributes.heading, 'heading' ), onChange: function(val) { setAttributes( {heading: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el('div', { ...innerBlocksProps }), ' ', ' ']), ' ', ' ']),                        
                
                    el( InspectorControls, {},
                        [
                            
                            el(Panel, {},
                                el(PanelBody, {
                                    title: __('Block properties')
                                }, [
                                    
                                    el(TextControl, {
                                        value: props.attributes.heading,
                                        help: __( '' ),
                                        label: __( 'Heading' ),
                                        onChange: function(val) { setAttributes({heading: val}) },
                                        type: 'text'
                                    }),    
                                ])
                            )
                        ]
                    )                            

            ]);
        },

        save: function(props) {
            const blockProps = useBlockProps.save({ className: 'not-prose py-12 md:py-16' });
            return el('section', { ...blockProps }, [' ', ' ', el('div', { className: 'container mx-auto px-4' }, [' ', ' ', el(RichText.Content, { tagName: 'h2', className: 'text-2xl md:text-3xl font-bold text-center mb-10', value: propOrDefault( props.attributes.heading, 'heading' ) }), ' ', ' ', el('div', { className: 'grid grid-cols-2 md:grid-cols-6 gap-8 items-center' }, el(InnerBlocks.Content, { allowedBlocks: [ 'block-theme/logo-item' ] })), ' ', ' ']), ' ', ' ']);
        }                        

    } );
} )(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor
);                        
