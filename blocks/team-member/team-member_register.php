<?php

        PG_Blocks_v3::register_block_type( array(
            'name' => 'block-theme/team-member',
            'title' => __( 'Team Member', 'block_theme' ),
            'render_template' => 'blocks/team-member/team-member.php',
            'supports' => array(),
            'base_url' => get_template_directory_uri(),
            'base_path' => get_template_directory(),
            'js_file' => 'blocks/team-member/team-member.js',
            'attributes' => array(
                'image' => array(
                    'type' => array('object', 'null'),
                    'default' => array('id' => 0, 'url' => 'https://images.unsplash.com/photo-1518592522655-40b66b7e5e58?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDF8fHdlYmRlc2lnbmVyfGVufDB8fHx8MTc1NDUxODQ0Nnww&ixlib=rb-4.1.0q=85&fm=jpg&crop=faces&cs=srgb&w=1200&h=800&fit=crop', 'size' => '', 'svg' => '', 'alt' => 'Web Designer')
                ),
                'name' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Sarah Johnson'
                ),
                'position' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Lead UI Designer'
                ),
                'bio' => array(
                    'type' => array('string', 'null'),
                    'default' => 'Specializes in creating intuitive user interfaces with over 8 years of experience in responsive design and user experience optimization.'
                ),
                'social_link_1' => array(
                    'type' => array('object', 'null'),
                    'default' => array('post_id' => 0, 'url' => '', 'post_type' => '', 'title' => '')
                ),
                'social_link_2' => array(
                    'type' => array('object', 'null'),
                    'default' => array('post_id' => 0, 'url' => '', 'post_type' => '', 'title' => '')
                ),
                'social_link_3' => array(
                    'type' => array('object', 'null'),
                    'default' => array('post_id' => 0, 'url' => '', 'post_type' => '', 'title' => '')
                )
            ),
            'example' => array(
'image' => array('id' => 0, 'url' => 'https://images.unsplash.com/photo-1518592522655-40b66b7e5e58?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDF8fHdlYmRlc2lnbmVyfGVufDB8fHx8MTc1NDUxODQ0Nnww&ixlib=rb-4.1.0q=85&fm=jpg&crop=faces&cs=srgb&w=1200&h=800&fit=crop', 'size' => '', 'svg' => '', 'alt' => 'Web Designer'), 'name' => 'Sarah Johnson', 'position' => 'Lead UI Designer', 'bio' => 'Specializes in creating intuitive user interfaces with over 8 years of experience in responsive design and user experience optimization.', 'social_link_1' => array('post_id' => 0, 'url' => '#', 'post_type' => '', 'title' => ''), 'social_link_2' => array('post_id' => 0, 'url' => '#', 'post_type' => '', 'title' => ''), 'social_link_3' => array('post_id' => 0, 'url' => '#', 'post_type' => '', 'title' => '')
            ),
            'dynamic' => true,
            'version' => '1.0.4'
        ) );
