<?php

        PG_Blocks_v3::register_block_type( array(
            'name' => 'block-theme/contact',
            'title' => __( 'Contact', 'block_theme' ),
            'description' => __( 'Contact information section with email, phone and office details', 'block_theme' ),
            'render_template' => 'blocks/contact/contact.php',
            'supports' => array(),
            'base_url' => get_template_directory_uri(),
            'base_path' => get_template_directory(),
            'js_file' => 'blocks/contact/contact.js',
            'attributes' => array(
                'tagline' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Tagline'
                ),
                'heading' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Contact us'
                ),
                'description' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                ),
                'email_icon' => array(
                    'type' => array('object', 'null'),
                    'default' => array('id' => 0, 'url' => '', 'size' => '', 'svg' => '<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> </svg>', 'alt' => null)
                ),
                'email_title' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Email'
                ),
                'email_description' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.'
                ),
                'email_address' => array(
                    'type' => array('string', 'null'),
                    'default' => 'hello@relume.io'
                ),
                'phone_icon' => array(
                    'type' => array('object', 'null'),
                    'default' => array('id' => 0, 'url' => '', 'size' => '', 'svg' => '<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/> </svg>', 'alt' => null)
                ),
                'phone_title' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Phone'
                ),
                'phone_description' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.'
                ),
                'phone_number' => array(
                    'type' => array('string', 'null'),
                    'default' => '+1 (555) 000-0000'
                ),
                'office_icon' => array(
                    'type' => array('object', 'null'),
                    'default' => array('id' => 0, 'url' => '', 'size' => '', 'svg' => '<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/> </svg>', 'alt' => null)
                ),
                'office_title' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Office'
                ),
                'office_description' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.'
                ),
                'office_address' => array(
                    'type' => array('string', 'null'),
                    'default' => '123 Sample St, Sydney NSW 2000 AU'
                )
            ),
            'example' => array(
'tagline' => 'Tagline', 'heading' => 'Contact us', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'email_icon' => array('id' => 0, 'url' => '', 'size' => '', 'svg' => '<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/> </svg>', 'alt' => null), 'email_title' => 'Email', 'email_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.', 'email_address' => 'hello@relume.io', 'phone_icon' => array('id' => 0, 'url' => '', 'size' => '', 'svg' => '<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/> </svg>', 'alt' => null), 'phone_title' => 'Phone', 'phone_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.', 'phone_number' => '+1 (555) 000-0000', 'office_icon' => array('id' => 0, 'url' => '', 'size' => '', 'svg' => '<svg class="h-12 text-primary-600 w-12 xl:text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/> </svg>', 'alt' => null), 'office_title' => 'Office', 'office_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.', 'office_address' => '123 Sample St, Sydney NSW 2000 AU'
            ),
            'dynamic' => true,
            'version' => '1.0.14'
        ) );
