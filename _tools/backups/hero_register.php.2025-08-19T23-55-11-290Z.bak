<?php

        PG_Blocks_v3::register_block_type( array(
            'name' => 'block-theme/hero',
            'title' => __( 'Hero', 'block_theme' ),
            'description' => __( 'This is the hero', 'block_theme' ),
            'icon' => 'dashicons-art',
            'category' => 'design',
            'render_template' => 'blocks/hero/hero.php',
            'supports' => array( 'color' => array( 'gradients' => true, 'link' => true ), 'html' => false ),
            'base_url' => get_template_directory_uri(),
            'base_path' => get_template_directory(),
            'js_file' => 'blocks/hero/hero.js',
            'attributes' => array(
                'hero_image' => array(
                    'type' => array('object', 'null'),
                    'default' => array('id' => 0, 'url' => 'https://images.unsplash.com/photo-1602064172250-43f8909056c7?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDExfHx3ZWJkZXNpZ24lMjBwcm9jZXNzfGVufDB8fHx8MTc1NDUxNjQ2OHww&ixlib=rb-4.1.0q=85&fm=jpg&crop=faces&cs=srgb&w=800&h=800&fit=crop', 'size' => '', 'svg' => '', 'alt' => 'Web Design Process')
                ),
                'heading' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Medium length hero heading goes here'
                ),
                'description' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.'
                ),
                'font_family' => array(
                    'type' => array('string', 'null'),
                    'default' => ''
                ),
                'primary_button_link' => array(
                    'type' => array('object', 'null'),
                    'default' => array('post_id' => 0, 'url' => '#', 'post_type' => '', 'title' => '')
                ),
                'primary_button_text' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Button'
                ),
                'secondary_button_link' => array(
                    'type' => array('object', 'null'),
                    'default' => array('post_id' => 0, 'url' => '#', 'post_type' => '', 'title' => '')
                ),
                'secondary_button_text' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Button'
                )
            ),
            'example' => array(
'hero_image' => array('id' => 0, 'url' => 'https://images.unsplash.com/photo-1602064172250-43f8909056c7?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDExfHx3ZWJkZXNpZ24lMjBwcm9jZXNzfGVufDB8fHx8MTc1NDUxNjQ2OHww&ixlib=rb-4.1.0q=85&fm=jpg&crop=faces&cs=srgb&w=800&h=800&fit=crop', 'size' => '', 'svg' => '', 'alt' => 'Web Design Process'), 'heading' => 'Medium length hero heading goes here', 'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.', 'font_family' => '', 'primary_button_link' => array('post_id' => 0, 'url' => '#', 'post_type' => '', 'title' => ''), 'primary_button_text' => 'Button', 'secondary_button_link' => array('post_id' => 0, 'url' => '#', 'post_type' => '', 'title' => ''), 'secondary_button_text' => 'Button'
            ),
            'dynamic' => true,
            'version' => '1.0.14'
        ) );
