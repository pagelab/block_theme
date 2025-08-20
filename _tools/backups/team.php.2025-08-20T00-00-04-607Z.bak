<section <?php if(empty($_GET['context']) || $_GET['context'] !== 'edit') echo get_block_wrapper_attributes( array('class' => "not-prose py-16 md:py-24", ) ); else echo 'data-wp-block-props="true"'; ?>> 
  <div class="container mx-auto px-4"> 
    <div class="text-center mb-12"> 
      <p class="font-medium mb-2 text-primary-600 xl:text-gray-600"><?php echo PG_Blocks_v3::getAttribute( $args, 'tagline' ) ?></p> 
      <h2 class="text-4xl md:text-5xl font-bold mb-4"><?php echo PG_Blocks_v3::getAttribute( $args, 'heading' ) ?></h2> 
      <p class="text-gray-600 max-w-2xl mx-auto"><?php echo PG_Blocks_v3::getAttribute( $args, 'description' ) ?></p> 
    </div>  
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" <?php if(!empty($_GET['context']) && $_GET['context'] === 'edit') echo 'data-wp-inner-blocks'; ?>><?php if(empty($_GET['context']) || $_GET['context'] !== 'edit') echo PG_Blocks_v3::getInnerContent( $args ); ?></div> 
  </div> 
</section>