<section <?php if(empty($_GET['context']) || $_GET['context'] !== 'edit') echo get_block_wrapper_attributes( array('class' => "not-prose bg-gray-50 py-16 md:py-24", ) ); else echo 'data-wp-block-props="true"'; ?>> 
  <div class="container mx-auto px-4"> 
    <div class="text-center mb-12"> 
      <p class="font-medium mb-2 text-primary-600 xl:text-gray-600"><?php echo PG_Blocks_v3::getAttribute( $args, 'tagline' ) ?></p> 
      <h2 class="text-4xl md:text-5xl font-bold mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'heading' ) ?></h2> 
      <p class="text-gray-600 max-w-2xl mx-auto"><?php echo PG_Blocks_v3::getAttribute( $args, 'description' ) ?></p> 
    </div>  
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"> 
      <div class="text-center"> 
        <div class="flex justify-center mb-4"> 
          <?php if ( !PG_Blocks_v3::getImageUrl( $args, 'email_icon', 'full', false ) && PG_Blocks_v3::getImageSVG( $args, 'email_icon' ) ) : ?><?php echo PG_Blocks_v3::mergeInlineSVGAttributes( PG_Blocks_v3::getImageSVG( $args, 'email_icon' ), array( 'class' => 'h-12 text-primary-600 w-12 xl:text-gray-600' ) ) ?><?php endif; ?><?php if ( PG_Blocks_v3::getImageUrl( $args, 'email_icon', 'full', false ) ) : ?><img src="<?php echo PG_Blocks_v3::getImageUrl( $args, 'email_icon', 'full' ); ?>" class="h-12 text-primary-600 w-12 xl:text-gray-600 <?php echo (PG_Blocks_v3::getImageField( $args, 'email_icon', 'id', true) ? ('wp-image-' . PG_Blocks_v3::getImageField( $args, 'email_icon', 'id', true)) : '') ?>"/><?php endif; ?> 
        </div> 
        <h3 class="text-2xl font-bold mb-3"><?php echo PG_Blocks_v3::getAttribute( $args, 'email_title' ) ?></h3> 
        <p class="text-gray-600 mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'email_description' ) ?></p> 
        <a href="<?php echo 'mailto:' . PG_Blocks_v3::getAttribute( $args, 'email_address' ) ?>" class="font-medium text-primary-600 hover:underline xl:text-gray-600"><?php echo PG_Blocks_v3::getAttribute( $args, 'email_address' ) ?></a> 
      </div>  
      
      <div class="text-center"> 
        <div class="flex justify-center mb-4"> 
          <?php if ( !PG_Blocks_v3::getImageUrl( $args, 'phone_icon', 'full', false ) && PG_Blocks_v3::getImageSVG( $args, 'phone_icon' ) ) : ?><?php echo PG_Blocks_v3::mergeInlineSVGAttributes( PG_Blocks_v3::getImageSVG( $args, 'phone_icon' ), array( 'class' => 'h-12 text-primary-600 w-12 xl:text-gray-600' ) ) ?><?php endif; ?><?php if ( PG_Blocks_v3::getImageUrl( $args, 'phone_icon', 'full', false ) ) : ?><img src="<?php echo PG_Blocks_v3::getImageUrl( $args, 'phone_icon', 'full' ); ?>" class="h-12 text-primary-600 w-12 xl:text-gray-600 <?php echo (PG_Blocks_v3::getImageField( $args, 'phone_icon', 'id', true) ? ('wp-image-' . PG_Blocks_v3::getImageField( $args, 'phone_icon', 'id', true)) : '') ?>"/><?php endif; ?> 
        </div> 
        <h3 class="text-2xl font-bold mb-3"><?php echo PG_Blocks_v3::getAttribute( $args, 'phone_title' ) ?></h3> 
        <p class="text-gray-600 mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'phone_description' ) ?></p> 
        <a href="<?php echo 'tel:' . PG_Blocks_v3::getAttribute( $args, 'phone_number' ) ?>" class="font-medium text-primary-600 hover:underline xl:text-gray-600"><?php echo PG_Blocks_v3::getAttribute( $args, 'phone_number' ) ?></a> 
      </div>  
      
      <div class="text-center"> 
        <div class="flex justify-center mb-4"> 
          <?php if ( !PG_Blocks_v3::getImageUrl( $args, 'office_icon', 'full', false ) && PG_Blocks_v3::getImageSVG( $args, 'office_icon' ) ) : ?><?php echo PG_Blocks_v3::mergeInlineSVGAttributes( PG_Blocks_v3::getImageSVG( $args, 'office_icon' ), array( 'class' => 'h-12 text-primary-600 w-12 xl:text-gray-600' ) ) ?><?php endif; ?><?php if ( PG_Blocks_v3::getImageUrl( $args, 'office_icon', 'full', false ) ) : ?><img src="<?php echo PG_Blocks_v3::getImageUrl( $args, 'office_icon', 'full' ); ?>" class="h-12 text-primary-600 w-12 xl:text-gray-600 <?php echo (PG_Blocks_v3::getImageField( $args, 'office_icon', 'id', true) ? ('wp-image-' . PG_Blocks_v3::getImageField( $args, 'office_icon', 'id', true)) : '') ?>"/><?php endif; ?> 
        </div> 
        <h3 class="text-2xl font-bold mb-3"><?php echo PG_Blocks_v3::getAttribute( $args, 'office_title' ) ?></h3> 
        <p class="text-gray-600 mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'office_description' ) ?></p> 
        <address class="font-medium not-italic text-primary-600 xl:text-gray-600"><?php echo PG_Blocks_v3::getAttribute( $args, 'office_address' ) ?></address> 
      </div> 
    </div> 
  </div> 
</section>