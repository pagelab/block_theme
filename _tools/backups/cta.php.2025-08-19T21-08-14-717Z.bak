<section <?php if(empty($_GET['context']) || $_GET['context'] !== 'edit') echo get_block_wrapper_attributes( array('class' => "bg-gray-800 bg-opacity-50 not-prose overflow-hidden py-16 relative md:py-20 xl:hover:bg-gray-900", 'style' => ";".( PG_Blocks_v3::getImageUrl( $args, 'background_image', 'full' ) ? ( 'background-image: url('.PG_Blocks_v3::getImageUrl( $args, 'background_image', 'full' ).')' ) : '' )."", ) ); else echo 'data-wp-block-props="true"'; ?>> 
  <div class="absolute inset-0 z-0 bg-black bg-opacity-50"></div> 
  <div class="container mx-auto px-4 relative z-10"> 
    <div class="flex flex-col md:flex-row items-center justify-between"> 
      <div class="mb-8 md:mb-0 md:w-1/2"> 
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'heading' ) ?></h2> 
        <p class="text-gray-200 text-lg mb-6"><?php echo PG_Blocks_v3::getAttribute( $args, 'description' ) ?></p> 
        <div class="flex flex-wrap gap-4"> 
          <a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'primary_button_link' ) ?>" class="bg-gray-900 duration-300 font-semibold px-6 py-3 rounded-md text-white transition hover:bg-primary-700"><?php echo PG_Blocks_v3::getAttribute( $args, 'primary_button_text' ) ?></a> 
          <a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'secondary_button_link' ) ?>" class="bg-transparent border border-white text-white hover:bg-white hover:text-gray-800 font-semibold py-3 px-6 rounded-md transition duration-300"><?php echo PG_Blocks_v3::getAttribute( $args, 'secondary_button_text' ) ?></a> 
        </div> 
      </div> 
      <div class="md:w-2/5"> 
        <div class="bg-white p-6 rounded-lg shadow-lg"> 
          <h3 class="text-xl font-bold text-gray-800 mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'sidebar_title' ) ?></h3> 
          <ul class="space-y-3"> 
            <li class="flex items-center"> 
              <span class="bg-gray-900 mr-3 p-1 rounded-full text-white"> 
                <?php if ( !PG_Blocks_v3::getImageUrl( $args, 'icon1', 'full', false ) && PG_Blocks_v3::getImageSVG( $args, 'icon1' ) ) : ?><?php echo PG_Blocks_v3::mergeInlineSVGAttributes( PG_Blocks_v3::getImageSVG( $args, 'icon1' ), array( 'class' => 'h-4 w-4' ) ) ?><?php endif; ?><?php if ( PG_Blocks_v3::getImageUrl( $args, 'icon1', 'full', false ) ) : ?><img src="<?php echo PG_Blocks_v3::getImageUrl( $args, 'icon1', 'full' ); ?>" class="h-4 w-4 <?php echo (PG_Blocks_v3::getImageField( $args, 'icon1', 'id', true) ? ('wp-image-' . PG_Blocks_v3::getImageField( $args, 'icon1', 'id', true)) : '') ?>"/><?php endif; ?> 
              </span> 
              <span class="text-gray-700"><?php echo PG_Blocks_v3::getAttribute( $args, 'tutorial1' ) ?></span> 
            </li> 
            <li class="flex items-center"> 
              <span class="bg-gray-900 mr-3 p-1 rounded-full text-white"> 
                <?php if ( !PG_Blocks_v3::getImageUrl( $args, 'icon2', 'full', false ) && PG_Blocks_v3::getImageSVG( $args, 'icon2' ) ) : ?><?php echo PG_Blocks_v3::mergeInlineSVGAttributes( PG_Blocks_v3::getImageSVG( $args, 'icon2' ), array( 'class' => 'h-4 w-4' ) ) ?><?php endif; ?><?php if ( PG_Blocks_v3::getImageUrl( $args, 'icon2', 'full', false ) ) : ?><img src="<?php echo PG_Blocks_v3::getImageUrl( $args, 'icon2', 'full' ); ?>" class="h-4 w-4 <?php echo (PG_Blocks_v3::getImageField( $args, 'icon2', 'id', true) ? ('wp-image-' . PG_Blocks_v3::getImageField( $args, 'icon2', 'id', true)) : '') ?>"/><?php endif; ?> 
              </span> 
              <span class="text-gray-700"><?php echo PG_Blocks_v3::getAttribute( $args, 'tutorial2' ) ?></span> 
            </li> 
            <li class="flex items-center"> 
              <span class="bg-gray-900 mr-3 p-1 rounded-full text-white"> 
                <?php if ( !PG_Blocks_v3::getImageUrl( $args, 'icon3', 'full', false ) && PG_Blocks_v3::getImageSVG( $args, 'icon3' ) ) : ?><?php echo PG_Blocks_v3::mergeInlineSVGAttributes( PG_Blocks_v3::getImageSVG( $args, 'icon3' ), array( 'class' => 'h-4 w-4' ) ) ?><?php endif; ?><?php if ( PG_Blocks_v3::getImageUrl( $args, 'icon3', 'full', false ) ) : ?><img src="<?php echo PG_Blocks_v3::getImageUrl( $args, 'icon3', 'full' ); ?>" class="h-4 w-4 <?php echo (PG_Blocks_v3::getImageField( $args, 'icon3', 'id', true) ? ('wp-image-' . PG_Blocks_v3::getImageField( $args, 'icon3', 'id', true)) : '') ?>"/><?php endif; ?> 
              </span> 
              <span class="text-gray-700"><?php echo PG_Blocks_v3::getAttribute( $args, 'tutorial3' ) ?></span> 
            </li> 
          </ul> 
          <a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'view_all_link' ) ?>" class="font-medium inline-block mt-5 text-primary-600 hover:text-primary-700 xl:text-gray-600"><?php echo PG_Blocks_v3::getAttribute( $args, 'view_all_text' ) ?></a> 
        </div> 
      </div> 
    </div> 
  </div> 
</section>