<?php

        PG_Blocks_v3::register_block_type( array(
            'name' => 'block-theme/logo-item',
            'title' => __( 'Logo Item', 'block_theme' ),
            'render_template' => 'blocks/logo-item/logo-item.php',
            'supports' => array(),
            'base_url' => get_template_directory_uri(),
            'base_path' => get_template_directory(),
            'js_file' => 'blocks/logo-item/logo-item.js',
            'attributes' => array(
                'logo_image' => array(
                    'type' => array('object', 'null'),
                    'default' => array('id' => 0, 'url' => 'https://images.unsplash.com/photo-1692976000563-1ffdbd9047c5?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDZ8fHdlYmZsb3clMjBsb2dvfGVufDB8fHx8MTc1NDUxNzcwMHww&ixlib=rb-4.1.0q=85&fm=jpg&crop=faces&cs=srgb&w=1200&h=800&fit=crop', 'size' => '', 'svg' => '', 'alt' => 'Webflow')
                ),
                'alt_text' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Webflow'
                )
            ),
            'example' => array(
'logo_image' => array('id' => 0, 'url' => 'https://images.unsplash.com/photo-1692976000563-1ffdbd9047c5?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDZ8fHdlYmZsb3clMjBsb2dvfGVufDB8fHx8MTc1NDUxNzcwMHww&ixlib=rb-4.1.0q=85&fm=jpg&crop=faces&cs=srgb&w=1200&h=800&fit=crop', 'size' => '', 'svg' => '', 'alt' => 'Webflow'), 'alt_text' => 'Webflow'
            ),
            'dynamic' => true,
            'version' => '1.0.4'
        ) );
