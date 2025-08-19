
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
    
    const block = registerBlockType( 'block-theme/logo-item', {
        apiVersion: 2,
        title: 'Logo Item',
        description: '',
        icon: 'block-default',
        category: 'pg_blocks',
        parent: [ 'block-theme/logos' ],

        keywords: [],
        supports: {},
        attributes: {
            logo_image: {
                type: ['object', 'null'],
                default: {id: 0, url: 'https://images.unsplash.com/photo-1692976000563-1ffdbd9047c5?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDZ8fHdlYmZsb3clMjBsb2dvfGVufDB8fHx8MTc1NDUxNzcwMHww&ixlib=rb-4.1.0q=85&fm=jpg&crop=faces&cs=srgb&w=1200&h=800&fit=crop', size: '', svg: '', alt: 'Webflow'},
            },
            alt_text: {
                type: ['string', 'null'],
                default: 'Webflow',
            }
        },
        example: { attributes: { logo_image: {id: 0, url: 'https://images.unsplash.com/photo-1692976000563-1ffdbd9047c5?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDZ8fHdlYmZsb3clMjBsb2dvfGVufDB8fHx8MTc1NDUxNzcwMHww&ixlib=rb-4.1.0q=85&fm=jpg&crop=faces&cs=srgb&w=1200&h=800&fit=crop', size: '', svg: '', alt: 'Webflow'}, alt_text: 'Webflow' } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'flex justify-center' });
            const setAttributes = props.setAttributes; 
            
            props.logo_image = useSelect(function( select ) {
                return {
                    logo_image: props.attributes.logo_image.id ? select('core').getMedia(props.attributes.logo_image.id) : undefined
                };
            }, [props.attributes.logo_image] ).logo_image;
            
            
            const innerBlocksProps = null;
            
            
            return el(Fragment, {}, [
                el('div', { ...blockProps }, [' ', ' ', props.attributes.logo_image && props.attributes.logo_image.svg && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.logo_image.svg, 'logo_image', 'svg' ), { className: 'h-8 md:h-10' })), props.attributes.logo_image && !props.attributes.logo_image.svg && propOrDefault( props.attributes.logo_image.url, 'logo_image', 'url' ) && el('img', { src: propOrDefault( props.attributes.logo_image.url, 'logo_image', 'url' ), alt: propOrDefault( props.attributes.alt_text, 'alt_text' ), className: 'h-8 md:h-10 ' + (props.attributes.logo_image.id ? ('wp-image-' + props.attributes.logo_image.id) : '') }), ' ', ' ']),                        
                
                    el( InspectorControls, {},
                        [
                            
                        pgMediaImageControl('logo_image', setAttributes, props, 'full', true, 'Logo Image', '' ),
                                        
                            el(Panel, {},
                                el(PanelBody, {
                                    title: __('Block properties')
                                }, [
                                    
                                    el(TextControl, {
                                        value: props.attributes.alt_text,
                                        help: __( '' ),
                                        label: __( 'Alt Text' ),
                                        onChange: function(val) { setAttributes({alt_text: val}) },
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
