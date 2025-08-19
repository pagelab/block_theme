
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
    
    const block = registerBlockType( 'block-theme/footer', {
        apiVersion: 2,
        title: 'Footer',
        description: 'Site footer with newsletter, links and copyright information',
        icon: 'block-default',
        category: 'pg_blocks',
        keywords: [],
        supports: {},
        attributes: {
            logo_title: {
                type: ['string', 'null'],
                default: `Logo`,
            },
            newsletter_text: {
                type: ['string', 'null'],
                default: `Join our newsletter to stay up to date on features and releases.`,
            },
            email_placeholder: {
                type: ['string', 'null'],
                default: 'Enter your email',
            },
            subscribe_button: {
                type: ['string', 'null'],
                default: `Subscribe`,
            },
            privacy_notice: {
                type: ['string', 'null'],
                default: `By subscribing you agree to with our`,
            },
            privacy_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            privacy_notice_text: {
                type: ['string', 'null'],
                default: `and provide consent to receive updates from our company.`,
            },
            column_one_title: {
                type: ['string', 'null'],
                default: `Column One`,
            },
            column_one_link1: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            column_one_link2: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            column_one_link3: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            column_one_link4: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            column_one_link5: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            column_two_title: {
                type: ['string', 'null'],
                default: `Column Two`,
            },
            column_two_link1: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            column_two_link2: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            column_two_link3: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            column_two_link4: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            column_two_link5: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            social_title: {
                type: ['string', 'null'],
                default: `Follow us`,
            },
            facebook_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '', title: '', 'post_type': null},
            },
            instagram_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '', title: '', 'post_type': null},
            },
            twitter_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '', title: '', 'post_type': null},
            },
            linkedin_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '', title: '', 'post_type': null},
            },
            youtube_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '', title: '', 'post_type': null},
            },
            company_name: {
                type: ['string', 'null'],
                default: `Relume`,
            },
            privacy_policy_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            terms_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            },
            cookies_link: {
                type: ['object', 'null'],
                default: {post_id: 0, url: '#', title: '', 'post_type': null},
            }
        },
        example: { attributes: { logo_title: `Logo`, newsletter_text: `Join our newsletter to stay up to date on features and releases.`, email_placeholder: 'Enter your email', subscribe_button: `Subscribe`, privacy_notice: `By subscribing you agree to with our`, privacy_link: {post_id: 0, url: '#', title: '', 'post_type': null}, privacy_notice_text: `and provide consent to receive updates from our company.`, column_one_title: `Column One`, column_one_link1: {post_id: 0, url: '#', title: '', 'post_type': null}, column_one_link2: {post_id: 0, url: '#', title: '', 'post_type': null}, column_one_link3: {post_id: 0, url: '#', title: '', 'post_type': null}, column_one_link4: {post_id: 0, url: '#', title: '', 'post_type': null}, column_one_link5: {post_id: 0, url: '#', title: '', 'post_type': null}, column_two_title: `Column Two`, column_two_link1: {post_id: 0, url: '#', title: '', 'post_type': null}, column_two_link2: {post_id: 0, url: '#', title: '', 'post_type': null}, column_two_link3: {post_id: 0, url: '#', title: '', 'post_type': null}, column_two_link4: {post_id: 0, url: '#', title: '', 'post_type': null}, column_two_link5: {post_id: 0, url: '#', title: '', 'post_type': null}, social_title: `Follow us`, facebook_link: {post_id: 0, url: '#', title: '', 'post_type': null}, instagram_link: {post_id: 0, url: '#', title: '', 'post_type': null}, twitter_link: {post_id: 0, url: '#', title: '', 'post_type': null}, linkedin_link: {post_id: 0, url: '#', title: '', 'post_type': null}, youtube_link: {post_id: 0, url: '#', title: '', 'post_type': null}, company_name: `Relume`, privacy_policy_link: {post_id: 0, url: '#', title: '', 'post_type': null}, terms_link: {post_id: 0, url: '#', title: '', 'post_type': null}, cookies_link: {post_id: 0, url: '#', title: '', 'post_type': null} } },
        edit: function ( props ) {
            const blockProps = useBlockProps({ className: 'not-prose py-12 px-4 md:px-8 lg:px-16' });
            const setAttributes = props.setAttributes; 
            
            
            const innerBlocksProps = null;
            
            
            return el(Fragment, {}, [
                el('section', { ...blockProps }, [' ', el('div', { className: 'max-w-7xl mx-auto' }, [' ', el('div', { className: 'grid grid-cols-1 md:grid-cols-4 gap-8 mb-12' }, [' ', ' ', el('div', { className: 'md:col-span-1' }, [' ', el(RichText, { tagName: 'h2', className: 'text-2xl font-bold mb-4', value: propOrDefault( props.attributes.logo_title, 'logo_title' ), onChange: function(val) { setAttributes( {logo_title: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', el(RichText, { tagName: 'p', className: 'mb-4', value: propOrDefault( props.attributes.newsletter_text, 'newsletter_text' ), onChange: function(val) { setAttributes( {newsletter_text: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', ' ', el('div', { className: 'flex flex-col space-y-3' }, [' ', el('input', { type: 'email', placeholder: propOrDefault( props.attributes.email_placeholder, 'email_placeholder' ), className: 'border border-gray-300 px-4 py-2 w-full' }), ' ', el(RichText, { tagName: 'button', className: 'bg-gray-900 px-4 py-2 text-white hover:bg-primary-700', value: propOrDefault( props.attributes.subscribe_button, 'subscribe_button' ), onChange: function(val) { setAttributes( {subscribe_button: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ']), ' ', ' ', el('p', { className: 'text-gray-600 text-sm mt-3' }, [el(RichText, { tagName: 'span', value: propOrDefault( props.attributes.privacy_notice, 'privacy_notice' ), onChange: function(val) { setAttributes( {privacy_notice: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), el('a', { href: propOrDefault( props.attributes.privacy_link.url, 'privacy_link', 'url' ), className: 'text-gray-500 hover:underline', onClick: function(e) { e.preventDefault(); } }, 'Privacy Policy'), el(RichText, { tagName: 'span', value: propOrDefault( props.attributes.privacy_notice_text, 'privacy_notice_text' ), onChange: function(val) { setAttributes( {privacy_notice_text: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] })]), ' ']), ' ', ' ', ' ', el('div', { className: 'md:col-span-1' }, [' ', el(RichText, { tagName: 'h3', className: 'font-bold mb-4', value: propOrDefault( props.attributes.column_one_title, 'column_one_title' ), onChange: function(val) { setAttributes( {column_one_title: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', el('ul', { className: 'space-y-3' }, [' ', el('li', {}, el('a', { href: propOrDefault( props.attributes.column_one_link1.url, 'column_one_link1', 'url' ), className: 'hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, 'Link One')), ' ', el('li', {}, el('a', { href: propOrDefault( props.attributes.column_one_link2.url, 'column_one_link2', 'url' ), className: 'hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, 'Link Two')), ' ', el('li', {}, el('a', { href: propOrDefault( props.attributes.column_one_link3.url, 'column_one_link3', 'url' ), className: 'hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, 'Link Three')), ' ', el('li', {}, el('a', { href: propOrDefault( props.attributes.column_one_link4.url, 'column_one_link4', 'url' ), className: 'hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, 'Link Four')), ' ', el('li', {}, el('a', { href: propOrDefault( props.attributes.column_one_link5.url, 'column_one_link5', 'url' ), className: 'hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, 'Link Five')), ' ']), ' ']), ' ', ' ', ' ', el('div', { className: 'md:col-span-1' }, [' ', el(RichText, { tagName: 'h3', className: 'font-bold mb-4', value: propOrDefault( props.attributes.column_two_title, 'column_two_title' ), onChange: function(val) { setAttributes( {column_two_title: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', el('ul', { className: 'space-y-3' }, [' ', el('li', {}, el('a', { href: propOrDefault( props.attributes.column_two_link1.url, 'column_two_link1', 'url' ), className: 'hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, 'Link Six')), ' ', el('li', {}, el('a', { href: propOrDefault( props.attributes.column_two_link2.url, 'column_two_link2', 'url' ), className: 'hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, 'Link Seven')), ' ', el('li', {}, el('a', { href: propOrDefault( props.attributes.column_two_link3.url, 'column_two_link3', 'url' ), className: 'hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, 'Link Eight')), ' ', el('li', {}, el('a', { href: propOrDefault( props.attributes.column_two_link4.url, 'column_two_link4', 'url' ), className: 'hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, 'Link Nine')), ' ', el('li', {}, el('a', { href: propOrDefault( props.attributes.column_two_link5.url, 'column_two_link5', 'url' ), className: 'hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, 'Link Ten')), ' ']), ' ']), ' ', ' ', ' ', el('div', { className: 'md:col-span-1' }, [' ', el(RichText, { tagName: 'h3', className: 'font-bold mb-4', value: propOrDefault( props.attributes.social_title, 'social_title' ), onChange: function(val) { setAttributes( {social_title: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), ' ', el('ul', { className: 'space-y-3' }, [' ', el('li', {}, [' ', props.attributes.facebook_link && props.attributes.facebook_link.url && el('a', { href: props.attributes.facebook_link.url, className: 'flex items-center hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, [' ', el('svg', { className: 'h-5 w-5 mr-2', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { d: 'M12 2C6.477 2 2 6.477 2 12c0 5.013 3.693 9.153 8.505 9.876V14.65H8.031v-2.629h2.474v-1.749c0-2.896 1.411-4.167 3.818-4.167 1.153 0 1.762.085 2.051.124v2.294h-1.642c-1.022 0-1.379.969-1.379 2.061v1.437h2.995l-.406 2.629h-2.588v7.247C18.235 21.236 22 17.062 22 12c0-5.523-4.477-10-10-10z' }), ' ']), ' Facebook', ' ']), ' ']), ' ', el('li', {}, [' ', props.attributes.instagram_link && props.attributes.instagram_link.url && el('a', { href: props.attributes.instagram_link.url, className: 'flex items-center hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, [' ', el('svg', { className: 'h-5 w-5 mr-2', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { d: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z' }), ' ']), ' Instagram', ' ']), ' ']), ' ', el('li', {}, [' ', props.attributes.twitter_link && props.attributes.twitter_link.url && el('a', { href: props.attributes.twitter_link.url, className: 'flex items-center hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, [' ', el('svg', { className: 'h-5 w-5 mr-2', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' }), ' ']), ' X', ' ']), ' ']), ' ', el('li', {}, [' ', props.attributes.linkedin_link && props.attributes.linkedin_link.url && el('a', { href: props.attributes.linkedin_link.url, className: 'flex items-center hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, [' ', el('svg', { className: 'h-5 w-5 mr-2', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }), ' ']), ' LinkedIn', ' ']), ' ']), ' ', el('li', {}, [' ', props.attributes.youtube_link && props.attributes.youtube_link.url && el('a', { href: props.attributes.youtube_link.url, className: 'flex items-center hover:text-primary-600', onClick: function(e) { e.preventDefault(); } }, [' ', el('svg', { className: 'h-5 w-5 mr-2', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', 'xmlSpace': '', fill: 'currentColor', 'stroke': '' }, [' ', el('path', { d: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }), ' ']), ' Youtube', ' ']), ' ']), ' ']), ' ']), ' ']), ' ', ' ', el('hr', { className: 'border-gray-200 mb-8' }), ' ', ' ', el('div', { className: 'flex flex-col md:flex-row md:justify-between items-center' }, [' ', el('p', { className: 'text-gray-600 mb-4 md:mb-0' }, ['© ', el('span', {}, '2023'), ' ', el(RichText, { tagName: 'span', value: propOrDefault( props.attributes.company_name, 'company_name' ), onChange: function(val) { setAttributes( {company_name: val }) }, withoutInteractiveFormatting: true, allowedFormats: [] }), '. All rights reserved.']), ' ', el('div', { className: 'flex space-x-6' }, [' ', el('a', { href: propOrDefault( props.attributes.privacy_policy_link.url, 'privacy_policy_link', 'url' ), className: 'hover:text-primary-600 xl:hover:text-gray-600', onClick: function(e) { e.preventDefault(); } }, 'Privacy Policy'), ' ', el('a', { href: propOrDefault( props.attributes.terms_link.url, 'terms_link', 'url' ), className: 'text-gray-600 hover:text-primary-600 xl:hover:text-gray-700', onClick: function(e) { e.preventDefault(); } }, 'Terms of Service'), ' ', el('a', { href: propOrDefault( props.attributes.cookies_link.url, 'cookies_link', 'url' ), className: 'hover:text-primary-600 xl:hover:text-gray-600', onClick: function(e) { e.preventDefault(); } }, 'Cookies Settings'), ' ']), ' ']), ' ']), ' ']),                        
                
                    el( InspectorControls, {},
                        [
                            
                            el(Panel, {},
                                el(PanelBody, {
                                    title: __('Block properties')
                                }, [
                                    
                                    el(TextControl, {
                                        value: props.attributes.logo_title,
                                        help: __( '' ),
                                        label: __( 'Logo Title' ),
                                        onChange: function(val) { setAttributes({logo_title: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.newsletter_text,
                                        help: __( '' ),
                                        label: __( 'Newsletter Text' ),
                                        onChange: function(val) { setAttributes({newsletter_text: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.email_placeholder,
                                        help: __( '' ),
                                        label: __( 'Email Placeholder' ),
                                        onChange: function(val) { setAttributes({email_placeholder: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.subscribe_button,
                                        help: __( '' ),
                                        label: __( 'Subscribe Button Text' ),
                                        onChange: function(val) { setAttributes({subscribe_button: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.privacy_notice,
                                        help: __( '' ),
                                        label: __( 'Privacy Notice Text' ),
                                        onChange: function(val) { setAttributes({privacy_notice: val}) },
                                        type: 'text'
                                    }),
                                    pgUrlControl('privacy_link', setAttributes, props, 'Privacy Policy Link', '', null ),
                                    el(TextControl, {
                                        value: props.attributes.privacy_notice_text,
                                        help: __( '' ),
                                        label: __( 'Privacy Notice Text' ),
                                        onChange: function(val) { setAttributes({privacy_notice_text: val}) },
                                        type: 'text'
                                    }),
                                    el(TextControl, {
                                        value: props.attributes.column_one_title,
                                        help: __( '' ),
                                        label: __( 'Column One Title' ),
                                        onChange: function(val) { setAttributes({column_one_title: val}) },
                                        type: 'text'
                                    }),
                                    pgUrlControl('column_one_link1', setAttributes, props, 'Column One Link 1', '', null ),
                                    pgUrlControl('column_one_link2', setAttributes, props, 'Column One Link 2', '', null ),
                                    pgUrlControl('column_one_link3', setAttributes, props, 'Column One Link 3', '', null ),
                                    pgUrlControl('column_one_link4', setAttributes, props, 'Column One Link 4', '', null ),
                                    pgUrlControl('column_one_link5', setAttributes, props, 'Column One Link 5', '', null ),
                                    el(TextControl, {
                                        value: props.attributes.column_two_title,
                                        help: __( '' ),
                                        label: __( 'Column Two Title' ),
                                        onChange: function(val) { setAttributes({column_two_title: val}) },
                                        type: 'text'
                                    }),
                                    pgUrlControl('column_two_link1', setAttributes, props, 'Column Two Link 1', '', null ),
                                    pgUrlControl('column_two_link2', setAttributes, props, 'Column Two Link 2', '', null ),
                                    pgUrlControl('column_two_link3', setAttributes, props, 'Column Two Link 3', '', null ),
                                    pgUrlControl('column_two_link4', setAttributes, props, 'Column Two Link 4', '', null ),
                                    pgUrlControl('column_two_link5', setAttributes, props, 'Column Two Link 5', '', null ),
                                    el(TextControl, {
                                        value: props.attributes.social_title,
                                        help: __( '' ),
                                        label: __( 'Social Media Title' ),
                                        onChange: function(val) { setAttributes({social_title: val}) },
                                        type: 'text'
                                    }),
                                    pgUrlControl('facebook_link', setAttributes, props, 'Facebook Link', '', null ),
                                    pgUrlControl('instagram_link', setAttributes, props, 'Instagram Link', '', null ),
                                    pgUrlControl('twitter_link', setAttributes, props, 'X Link', '', null ),
                                    pgUrlControl('linkedin_link', setAttributes, props, 'LinkedIn Link', '', null ),
                                    pgUrlControl('youtube_link', setAttributes, props, 'Youtube Link', '', null ),
                                    el(TextControl, {
                                        value: props.attributes.company_name,
                                        help: __( '' ),
                                        label: __( 'Company Name' ),
                                        onChange: function(val) { setAttributes({company_name: val}) },
                                        type: 'text'
                                    }),
                                    pgUrlControl('privacy_policy_link', setAttributes, props, 'Privacy Policy Link', '', null ),
                                    pgUrlControl('terms_link', setAttributes, props, 'Terms Link', '', null ),
                                    pgUrlControl('cookies_link', setAttributes, props, 'Cookies Link', '', null ),    
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
