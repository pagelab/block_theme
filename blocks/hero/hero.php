<header <?php if(empty($_GET['context']) || $_GET['context'] !== 'edit') echo get_block_wrapper_attributes( array('class' => "not-prose", ) ); else echo 'data-wp-block-props="true"'; ?>> 
    <div class="flex flex-col md:flex-row"> 
        <div class="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12"> 
            <div class="w-full max-w-md"> 
                <?php if ( !PG_Blocks_v3::getImageSVG( $args, 'hero_image', false) && PG_Blocks_v3::getImageUrl( $args, 'hero_image', 'full' ) ) : ?><img src="<?php echo PG_Blocks_v3::getImageUrl( $args, 'hero_image', 'full' ) ?>" alt="<?php echo PG_Blocks_v3::getImageField( $args, 'hero_image', 'alt', true); ?>" class="<?php echo (PG_Blocks_v3::getImageField( $args, 'hero_image', 'id', true) ? ('wp-image-' . PG_Blocks_v3::getImageField( $args, 'hero_image', 'id', true)) : '') ?> aspect-square h-auto object-cover w-full"><?php endif; ?><?php if ( PG_Blocks_v3::getImageSVG( $args, 'hero_image', false) ) : ?><?php echo PG_Blocks_v3::mergeInlineSVGAttributes( PG_Blocks_v3::getImageSVG( $args, 'hero_image' ), array( 'class' => 'w-full h-auto aspect-square object-cover' ) ) ?><?php endif; ?> 
            </div> 
        </div> 
        <div class="flex items-center p-8 w-full md:p-12 md:w-1/2"> 
            <div class="max-w-lg"> 
                <h1 class="font-bold mb-6 text-4xl md:text-5xl"><?php echo PG_Blocks_v3::getAttribute( $args, 'heading' ) ?></h1> 
                <p class="text-gray-700 mb-8" style="font-family:<?php echo PG_Blocks_v3::getAttribute( $args, 'font_family' ) ?>;"><?php echo PG_Blocks_v3::getAttribute( $args, 'description' ) ?></p> 
                <div class="flex flex-wrap gap-4"> 
                    <a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'primary_button_link' ) ?>" class="brand-bg-base font-medium inline-block px-6 py-3 text-inverse"><?php echo PG_Blocks_v3::getAttribute( $args, 'primary_button_text' ) ?></a> 
                    <a href="<?php echo (!empty($_GET['context']) && $_GET['context'] === 'edit') ? 'javascript:void()' : PG_Blocks_v3::getLinkUrl( $args, 'secondary_button_link' ) ?>" class="border border-base font-medium inline-block px-6 py-3"><?php echo PG_Blocks_v3::getAttribute( $args, 'secondary_button_text' ) ?></a> 
                </div> 
            </div> 
        </div> 
    </div> 
</header>