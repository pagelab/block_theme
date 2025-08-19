
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
    
    const block = registerBlockType( 'block-theme/hero', {
        apiVersion: 2,
        title: 'Hero',
        description: 'This is the hero',
        icon: 'dashicons-art',
        category: 'design',
        keywords: [],
        supports: { color: { gradients: true, link: true }, html: false },
        attributes: {
            hero_image: {
                type: ['object', 'null'],
                default: {id: 0, url: 'https://images.unsplash.com/photo-1602064172250-43f8909056c7?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDExfHx3ZWJkZXNpZ24lMjBwcm9jZXNzfGVufDB8fHx8MTc1NDUxNjQ2OHww&ixlib=rb-4.1.0q=85&fm=jpg&crop=faces&cs=srgb&w=800&h=800&fit=crop', size: '', svg: '', alt: 'Web Design Process'},
            },
            heading: {
                type: ['string', 'null'],
                default: `Medium length hero heading goes here`,
            },
            description: {
                type: ['string', 'null'],
                default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.`,
            },
            font_family: {
                type: ['string', 'null'],
                default: '',
            },
            primary_button_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            primary_button_text: {
                type: ['string', 'null'],
                default: `Button`,
            },
            secondary_button_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            secondary_button_text: {
                type: ['string', 'null'],
                default: `Button`,
            }
        },
        example: { attributes: { hero_image: {id: 0, url: 'https://images.unsplash.com/photo-1602064172250-43f8909056c7?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDExfHx3ZWJkZXNpZ24lMjBwcm9jZXNzfGVufDB8fHx8MTc1NDUxNjQ2OHww&ixlib=rb-4.1.0q=85&fm=jpg&crop=faces&cs=srgb&w=800&h=800&fit=crop', size: '', svg: '', alt: 'Web Design Process'}, heading: `Medium length hero heading goes here`, description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.`, font_family: '', primary_button_link: {post_id: 0, url: '#', title: '', 'post_type': null}, primary_button_text: `Button`, secondary_button_link: {post_id: 0, url: '#', title: '', 'post_type': null}, secondary_button_text: `Button` } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'not-prose' });
            const setAttributes = props.setAttributes; 
            
            props.hero_image = useSelect(function( select ) {
                return {
                    hero_image: props.attributes.hero_image.id ? select('core').getMedia(props.attributes.hero_image.id) : undefined
                };
            }, [props.attributes.hero_image] ).hero_image;
            
            
            const innerBlocksProps = null;
            
            
            return el(Fragment, {}, [
                el('header', { ...blockProps }, [' ', ' ', el('div', { className: 'flex flex-col md:flex-row' }, [' ', ' ', el('div', { className: 'w-full md:w-1/2 flex items-center justify-center p-8 md:p-12' }, [' ', ' ', el('div', { className: 'w-full max-w-md' }, [' ', ' ', props.attributes.hero_image && props.attributes.hero_image.svg && pgCreateSVG3(RawHTML, {}, pgMergeInlineSVGAttributes(propOrDefault( props.attributes.hero_image.svg, 'hero_image', 'svg' ), { className: 'w-full h-auto aspect-square object-cover' })), props.attributes.hero_image && !props.attributes.hero_image.svg && propOrDefault( props.attributes.hero_image.url, 'hero_image', 'url' ) && el('img', { src: propOrDefault( props.attributes.hero_image.url, 'hero_image', 'url' ), alt: propOrDefault( props.attributes.hero_image?.alt, 'hero_image', 'alt' ), className: 'aspect-square h-auto object-cover w-full ' + (props.attributes.hero_image.id ? ('wp-image-' + props.attributes.hero_image.id) : '') }), ' ', ' ']), ' ', ' ']), ' ', ' ', el('div', { className: 'flex items-center p-8 w-full md:p-12 md:w-1/2' }, [' ', ' ', el('div', { className: 'max-w-lg' }, [' ', ' ', el(RichText, { tagName: 'h1', className: 'font-bold mb-6 text-4xl md:text-5xl', value: propOrDefault( props.attributes.heading, 'heading' ), onChange: function(val) { setAttributes( {heading: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'p', className: 'text-gray-700 mb-8', style: { ...((propOrDefault( props.attributes.font_family, 'font_family' ) !== null && propOrDefault( props.attributes.font_family, 'font_family' ) !== '') ? {fontFamily: propOrDefault( props.attributes.font_family, 'font_family' )} : {}) }, value: propOrDefault( props.attributes.description, 'description' ), onChange: function(val) { setAttributes( {description: val }) } }), ' ', ' ', el('div', { className: 'flex flex-wrap gap-4' }, [' ', ' ', el(RichText, { tagName: 'a', href: propOrDefault( props.attributes.primary_button_link.url, 'primary_button_link', 'url' ), className: 'bg-blue-700 font-medium inline-block px-6 py-3 text-white', onClick: function(e) { e.preventDefault(); }, value: propOrDefault( props.attributes.primary_button_text, 'primary_button_text' ), onChange: function(val) { setAttributes( {primary_button_text: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el(RichText, { tagName: 'a', href: propOrDefault( props.attributes.secondary_button_link.url, 'secondary_button_link', 'url' ), className: 'border border-gray-400 font-medium inline-block px-6 py-3', onClick: function(e) { e.preventDefault(); }, value: propOrDefault( props.attributes.secondary_button_text, 'secondary_button_text' ), onChange: function(val) { setAttributes( {secondary_button_text: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ']), ' ', ' ']), ' ', ' ']), ' ', ' ']), ' ', ' ']),                        
                
                    el( InspectorControls, {},
                        [
                            
                        pgMediaImageControl('hero_image', setAttributes, props, 'full', true, 'Hero Image', '' ),
                                        
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
                                    el(SelectControl, {
                                        value: props.attributes.font_family,
                                        label: __( 'Font Family' ),
                                        onChange: function(val) { setAttributes({font_family: val}) },
                                        options: [
                                            { value: '', label: '-' }
                                        ]
                                    }),
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
