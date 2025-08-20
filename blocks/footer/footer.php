<section <?php if(empty($_GET['context']) || $_GET['context'] !== 'edit') echo get_block_wrapper_attributes( array('class' => "not-prose py-12 px-4 md:px-8 lg:px-16", ) ); else echo 'data-wp-block-props="true"'; ?>>
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      <!-- Logo and Newsletter Section -->
      <div class="md:col-span-1">
        <h2 class="text-2xl font-bold mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'logo_title' ) ?></h2>
        <p class="mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'newsletter_text' ) ?></p>
        
        <div class="flex flex-col space-y-3">
          <input type="email" placeholder="<?php echo PG_Blocks_v3::getAttribute( $args, 'email_placeholder' ) ?>" class="border border-gray-300 px-4 py-2 w-full"/>
          <button class="bg-inverse-subtle px-4 py-2 text-inverse hover:bg-primary-700"><?php echo PG_Blocks_v3::getAttribute( $args, 'subscribe_button' ) ?></button>
        </div>
        
        <p class="text-gray-600 text-sm mt-3"><span><?php echo PG_Blocks_v3::getAttribute( $args, 'privacy_notice' ) ?></span><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'privacy_link' ) ?>" class="text-gray-500 hover:underline"><?php _e( 'Privacy Policy', 'block_theme' ); ?></a><span><?php echo PG_Blocks_v3::getAttribute( $args, 'privacy_notice_text' ) ?></span></p>
      </div>
      
      <!-- Column One -->
      <div class="md:col-span-1">
        <h3 class="font-bold mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'column_one_title' ) ?></h3>
        <ul class="space-y-3">
          <li><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'column_one_link1' ) ?>" class="hover:text-primary-600"><?php _e( 'Link One', 'block_theme' ); ?></a></li>
          <li><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'column_one_link2' ) ?>" class="hover:text-primary-600"><?php _e( 'Link Two', 'block_theme' ); ?></a></li>
          <li><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'column_one_link3' ) ?>" class="hover:text-primary-600"><?php _e( 'Link Three', 'block_theme' ); ?></a></li>
          <li><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'column_one_link4' ) ?>" class="hover:text-primary-600"><?php _e( 'Link Four', 'block_theme' ); ?></a></li>
          <li><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'column_one_link5' ) ?>" class="hover:text-primary-600"><?php _e( 'Link Five', 'block_theme' ); ?></a></li>
        </ul>
      </div>
      
      <!-- Column Two -->
      <div class="md:col-span-1">
        <h3 class="font-bold mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'column_two_title' ) ?></h3>
        <ul class="space-y-3">
          <li><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'column_two_link1' ) ?>" class="hover:text-primary-600"><?php _e( 'Link Six', 'block_theme' ); ?></a></li>
          <li><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'column_two_link2' ) ?>" class="hover:text-primary-600"><?php _e( 'Link Seven', 'block_theme' ); ?></a></li>
          <li><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'column_two_link3' ) ?>" class="hover:text-primary-600"><?php _e( 'Link Eight', 'block_theme' ); ?></a></li>
          <li><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'column_two_link4' ) ?>" class="hover:text-primary-600"><?php _e( 'Link Nine', 'block_theme' ); ?></a></li>
          <li><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'column_two_link5' ) ?>" class="hover:text-primary-600"><?php _e( 'Link Ten', 'block_theme' ); ?></a></li>
        </ul>
      </div>
      
      <!-- Social Media -->
      <div class="md:col-span-1">
        <h3 class="font-bold mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'social_title' ) ?></h3>
        <ul class="space-y-3">
          <li>
            <?php if ( PG_Blocks_v3::getLinkUrl( $args, 'facebook_link', false ) ) : ?><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'facebook_link' ) ?>" class="flex items-center hover:text-primary-600">
              <svg class="h-5 w-5 mr-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space fill="currentColor" stroke> <path d="M12 2C6.477 2 2 6.477 2 12c0 5.013 3.693 9.153 8.505 9.876V14.65H8.031v-2.629h2.474v-1.749c0-2.896 1.411-4.167 3.818-4.167 1.153 0 1.762.085 2.051.124v2.294h-1.642c-1.022 0-1.379.969-1.379 2.061v1.437h2.995l-.406 2.629h-2.588v7.247C18.235 21.236 22 17.062 22 12c0-5.523-4.477-10-10-10z"/> </svg> <?php _e( 'Facebook', 'block_theme' ); ?>
            </a><?php endif; ?>
          </li>
          <li>
            <?php if ( PG_Blocks_v3::getLinkUrl( $args, 'instagram_link', false ) ) : ?><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'instagram_link' ) ?>" class="flex items-center hover:text-primary-600">
              <svg class="h-5 w-5 mr-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space fill="currentColor" stroke> <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/> </svg> <?php _e( 'Instagram', 'block_theme' ); ?>
            </a><?php endif; ?>
          </li>
          <li>
            <?php if ( PG_Blocks_v3::getLinkUrl( $args, 'twitter_link', false ) ) : ?><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'twitter_link' ) ?>" class="flex items-center hover:text-primary-600">
              <svg class="h-5 w-5 mr-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space fill="currentColor" stroke> <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> </svg> <?php _e( 'X', 'block_theme' ); ?>
            </a><?php endif; ?>
          </li>
          <li>
            <?php if ( PG_Blocks_v3::getLinkUrl( $args, 'linkedin_link', false ) ) : ?><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'linkedin_link' ) ?>" class="flex items-center hover:text-primary-600">
              <svg class="h-5 w-5 mr-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space fill="currentColor" stroke> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/> </svg> <?php _e( 'LinkedIn', 'block_theme' ); ?>
            </a><?php endif; ?>
          </li>
          <li>
            <?php if ( PG_Blocks_v3::getLinkUrl( $args, 'youtube_link', false ) ) : ?><a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'youtube_link' ) ?>" class="flex items-center hover:text-primary-600">
              <svg class="h-5 w-5 mr-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space fill="currentColor" stroke> <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/> </svg> <?php _e( 'Youtube', 'block_theme' ); ?>
            </a><?php endif; ?>
          </li>
        </ul>
      </div>
    </div>
    
    <hr class="border-gray-200 mb-8"/>
    
    <div class="flex flex-col md:flex-row md:justify-between items-center">
      <p class="text-gray-600 mb-4 md:mb-0">© <span><?php echo date( 'Y' ); ?></span> <span><?php echo PG_Blocks_v3::getAttribute( $args, 'company_name' ) ?></span><?php _e( '. All rights reserved.', 'block_theme' ); ?></p>
      <div class="flex space-x-6">
        <a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'privacy_policy_link' ) ?>" class="hover:text-primary-600 xl:hover:text-gray-600"><?php _e( 'Privacy Policy', 'block_theme' ); ?></a>
        <a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'terms_link' ) ?>" class="text-gray-600 hover:text-primary-600 xl:hover:text-gray-700"><?php _e( 'Terms of Service', 'block_theme' ); ?></a>
        <a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'cookies_link' ) ?>" class="hover:text-primary-600 xl:hover:text-gray-600"><?php _e( 'Cookies Settings', 'block_theme' ); ?></a>
      </div>
    </div>
  </div>
</section>