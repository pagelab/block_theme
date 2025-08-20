<section <?php if(empty($_GET['context']) || $_GET['context'] !== 'edit') echo get_block_wrapper_attributes( array('class' => "not-prose py-16 md:py-24", ) ); else echo 'data-wp-block-props="true"'; ?>>
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <p class="text-gray-600 mb-2"><?php _e( 'Tagline', 'block_theme' ); ?></p>
      <h1 class="text-4xl md:text-5xl font-bold mb-4"><?php _e( 'Pricing plan', 'block_theme' ); ?></h1>
      <p class="text-gray-600 max-w-2xl mx-auto"><?php _e( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'block_theme' ); ?></p>
    </div>
    
    <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <!-- Basic Plan -->
      <div class="border border-gray-200 rounded-lg p-8 flex flex-col h-full">
        <div class="flex justify-between items-start mb-6">
          <div>
            <div class="text-black mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4" version="1.1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3 class="text-2xl font-bold"><?php _e( 'Basic plan', 'block_theme' ); ?></h3>
            <p class="text-gray-600 mt-2"><?php _e( 'Lorem ipsum dolor sit amet', 'block_theme' ); ?></p>
          </div>
          <div class="font-bold text-5xl"><?php _e( '$19', 'block_theme' ); ?><span class="text-2xl text-gray-500"><?php _e( '/mo', 'block_theme' ); ?></span></div>
        </div>
        
        <hr class="my-6 border-gray-200">
        
        <div class="mb-8">
          <p class="font-medium mb-4"><?php _e( 'Includes:', 'block_theme' ); ?></p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <ul class="space-y-3">
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
    </ul>
  </div>
  <div>
    <ul class="space-y-3">
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
    </ul>
  </div>
</div>
        </div>
        
        <div class="mt-auto">
          <a href="#" class="block w-full bg-black text-inverse text-center py-3 rounded hover:bg-gray-800 transition"><?php _e( 'Get started', 'block_theme' ); ?></a>
        </div>
      </div>
      
      <!-- Business Plan -->
      <div class="border border-gray-200 rounded-lg p-8 flex flex-col h-full bg-gray-50">
        <div class="flex justify-between items-start mb-6">
          <div>
            <div class="text-black mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4" version="1.1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3 class="text-2xl font-bold"><?php _e( 'Business plan', 'block_theme' ); ?></h3>
            <p class="text-gray-600 mt-2"><?php _e( 'Lorem ipsum dolor sit amet', 'block_theme' ); ?></p>
          </div>
          <div class="font-bold text-5xl"><?php _e( '$29', 'block_theme' ); ?><span class="text-2xl text-gray-500"><?php _e( '/mo', 'block_theme' ); ?></span></div>
        </div>
        
        <hr class="my-6 border-gray-200">
        
        <div class="mb-8">
  <p class="font-medium mb-4"><?php _e( 'Includes:', 'block_theme' ); ?></p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ul class="space-y-3">
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
      
      
    </ul>
    <ul class="space-y-3">
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
      <li class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" xml:space fill="currentColor" stroke> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/> </svg>
        <?php _e( 'Feature text goes here', 'block_theme' ); ?>
      </li>
      
      
    </ul>
  </div>
</div>
        
        <div class="mt-auto">
          <a href="#" class="block w-full bg-black text-inverse text-center py-3 rounded hover:bg-gray-800 transition"><?php _e( 'Get started', 'block_theme' ); ?></a>
        </div>
      </div>
    </div>
  </div>
</section>