<?php

        PG_Blocks_v3::register_block_type( array(
            'name' => 'block-theme/header-nav',
            'title' => __( 'Header Navigation', 'block_theme' ),
            'description' => __( 'Main site navigation with logo, links and search', 'block_theme' ),
            'render_template' => 'blocks/header-nav/header-nav.php',
            'supports' => array(),
            'base_url' => get_template_directory_uri(),
            'base_path' => get_template_directory(),
            'js_file' => 'blocks/header-nav/header-nav.js',
            'attributes' => array(
                'logo_text' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Logo'
                ),
                'show_search' => array(
                    'type' => array('string', 'null'),
                    'default' => ''
                ),
                'search_placeholder' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Search'
                ),
                'icon_link_1' => array(
                    'type' => array('object', 'null'),
                    'default' => array('post_id' => 0, 'url' => '', 'post_type' => '', 'title' => '')
                ),
                'icon_1' => array(
                    'type' => array('object', 'null'),
                    'default' => array('id' => 0, 'url' => '', 'size' => '', 'svg' => '<svg class="h-6 w-6" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/> </svg>', 'alt' => null)
                ),
                'icon_link_2' => array(
                    'type' => array('object', 'null'),
                    'default' => array('post_id' => 0, 'url' => '', 'post_type' => '', 'title' => '')
                ),
                'icon_2' => array(
                    'type' => array('object', 'null'),
                    'default' => array('id' => 0, 'url' => '', 'size' => '', 'svg' => '<svg class="h-5 w-5 text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/> </svg>', 'alt' => null)
                )
            ),
            'example' => array(
'logo_text' => 'Logo', 'show_search' => '', 'search_placeholder' => 'Search', 'icon_link_1' => array('post_id' => 0, 'url' => '#', 'post_type' => '', 'title' => ''), 'icon_1' => array('id' => 0, 'url' => '', 'size' => '', 'svg' => '<svg class="h-6 w-6" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/> </svg>', 'alt' => null), 'icon_link_2' => array('post_id' => 0, 'url' => '#', 'post_type' => '', 'title' => ''), 'icon_2' => array('id' => 0, 'url' => '', 'size' => '', 'svg' => '<svg class="h-5 w-5 text-gray-600" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/> </svg>', 'alt' => null)
            ),
            'dynamic' => true,
            'version' => '1.0.4'
        ) );
