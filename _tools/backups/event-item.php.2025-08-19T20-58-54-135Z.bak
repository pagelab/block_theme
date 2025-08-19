<div <?php if(empty($_GET['context']) || $_GET['context'] !== 'edit') echo get_block_wrapper_attributes( array('class' => "flex flex-col md:flex-row gap-6 mb-4", ) ); else echo 'data-wp-block-props="true"'; ?>> 
        <div class="w-full md:w-32"> 
          <?php if ( !PG_Blocks_v3::getImageSVG( $args, 'event_image', false) && PG_Blocks_v3::getImageUrl( $args, 'event_image', 'full' ) ) : ?><div class="<?php echo (PG_Blocks_v3::getImageField( $args, 'event_image', 'id', true) ? ('wp-image-' . PG_Blocks_v3::getImageField( $args, 'event_image', 'id', true)) : '') ?> bg-gray-200 flex h-32 items-center justify-center" src="<?php echo PG_Blocks_v3::getImageUrl( $args, 'event_image', 'full' ) ?>"> 
            <?php if ( !PG_Blocks_v3::getImageUrl( $args, 'event_icon', 'full', false ) && PG_Blocks_v3::getImageSVG( $args, 'event_icon' ) ) : ?><?php echo PG_Blocks_v3::mergeInlineSVGAttributes( PG_Blocks_v3::getImageSVG( $args, 'event_icon' ), array( 'class' => 'h-12 w-12 text-gray-400' ) ) ?><?php endif; ?><?php if ( PG_Blocks_v3::getImageUrl( $args, 'event_icon', 'full', false ) ) : ?><img src="<?php echo PG_Blocks_v3::getImageUrl( $args, 'event_icon', 'full' ); ?>" class="h-12 w-12 text-gray-400 <?php echo (PG_Blocks_v3::getImageField( $args, 'event_icon', 'id', true) ? ('wp-image-' . PG_Blocks_v3::getImageField( $args, 'event_icon', 'id', true)) : '') ?>"/><?php endif; ?> 
          </div><?php endif; ?><?php if ( PG_Blocks_v3::getImageSVG( $args, 'event_image', false) ) : ?><?php echo PG_Blocks_v3::mergeInlineSVGAttributes( PG_Blocks_v3::getImageSVG( $args, 'event_image' ), array( 'class' => 'bg-gray-200 flex h-32 items-center justify-center' ) ) ?><?php endif; ?> 
        </div> 
        <div class="w-full md:w-3/4 flex flex-col md:flex-row justify-between"> 
          <div> 
            <div class="flex items-center gap-4 mb-2"> 
              <h3 class="text-2xl font-bold" style="color:<?php echo PG_Blocks_v3::getAttribute( $args, 'heading_color' ) ?>;"><?php echo PG_Blocks_v3::getAttribute( $args, 'event_title' ) ?></h3> 
              <span class="bg-gray-100 px-2 py-1 text-sm"><?php echo PG_Blocks_v3::getAttribute( $args, 'event_status' ) ?></span> 
            </div> 
            <p class="mb-2"><?php echo PG_Blocks_v3::getAttribute( $args, 'event_date_location' ) ?></p> 
            <p><?php echo PG_Blocks_v3::getAttribute( $args, 'event_description' ) ?></p> 
          </div> 
          <div class="mt-4 self-center md:mt-0"> 
            <button class="border border-black font-medium px-6 py-2 whitespace-nowrap hover:bg-gray-100" href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'event_button_link' ) ?>"><?php echo PG_Blocks_v3::getAttribute( $args, 'event_button' ) ?></button> 
          </div> 
        </div> 
      </div>