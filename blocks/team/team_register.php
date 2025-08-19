<?php

        PG_Blocks_v3::register_block_type( array(
            'name' => 'block-theme/team',
            'title' => __( 'Team', 'block_theme' ),
            'description' => __( 'Team section', 'block_theme' ),
            'icon' => 'dashicons-art',
            'render_template' => 'blocks/team/team.php',
            'supports' => array(),
            'base_url' => get_template_directory_uri(),
            'base_path' => get_template_directory(),
            'js_file' => 'blocks/team/team.js',
            'attributes' => array(
                'tagline' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Tagline'
                ),
                'heading' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Our team'
                ),
                'description' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Our experienced team of web design professionals is dedicated to helping you create stunning and functional websites.'
                )
            ),
            'example' => array(
'tagline' => 'Tagline', 'heading' => 'Our team', 'description' => 'Our experienced team of web design professionals is dedicated to helping you create stunning and functional websites.'
            ),
            'dynamic' => true,
            'has_inner_blocks' => true,
            'version' => '1.0.14'
        ) );
