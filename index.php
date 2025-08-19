<?php get_header(); ?>




        <section class="not-prose py-16 md:py-24">
  <div class="container mx-auto px-4">
    <!-- Tag with PRO indicator -->
    <div class="flex justify-center mb-8">
      <div class="flex items-center bg-white rounded-full shadow-md px-4 py-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 mr-2" viewBox="0 0 20 20" fill="currentColor" version="1.1">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
        </svg>
        <span class="text-gray-700 font-medium"><?php _e( 'Sector-specific Templates', 'block_theme' ); ?></span>
        <span class="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold"><?php _e( 'PRO', 'block_theme' ); ?></span>
      </div>
    </div>

    <!-- Main heading -->
    <h2 class="text-3xl md:text-5xl font-bold text-center mb-12 max-w-4xl mx-auto"><?php _e( 'Ready-made multi-page user flows for apps', 'block_theme' ); ?></h2>

    <!-- Categories - First row -->
    <div class="gap-6 grid grid-cols-1 mb-8 md:grid-cols-3">
      <!-- HR Management -->
      <div class="bg-white flex hover:shadow-lg items-center md:col-span-1 p-4 rounded-xl shadow-md transition-shadow">
        <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" viewBox="0 0 20 20" fill="currentColor" version="1.1">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
          </svg>
        </div>
        <span class="font-medium text-gray-800"><?php _e( 'HR Management', 'block_theme' ); ?></span>
      </div>

      <!-- Finance & Banking -->
      <div class="bg-white flex hover:shadow-lg items-center p-4 rounded-xl shadow-md transition-shadow">
        <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor" version="1.1">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2H4v-1h16v1h-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        <span class="font-medium text-gray-800"><?php _e( 'Finance & Banking', 'block_theme' ); ?></span>
      </div>

      <!-- Marketing & Sales -->
      <div class="bg-white flex hover:shadow-lg items-center p-4 rounded-xl shadow-md transition-shadow">
        <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor" version="1.1">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
          </svg>
        </div>
        <span class="font-medium text-gray-800"><?php _e( 'Marketing & Sales', 'block_theme' ); ?></span>
      </div>
    </div>

    <!-- Categories - Second row (Coming soon) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <!-- Cryptocurrency -->
      <div class="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor" version="1.1">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
          </svg>
        </div>
        <span class="font-medium text-gray-800"><?php _e( 'Cryptocurrency', 'block_theme' ); ?></span>
        <span class="ml-auto bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium"><?php _e( 'SOON', 'block_theme' ); ?></span>
      </div>

      <!-- AI Product -->
      <div class="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor" version="1.1">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <span class="font-medium text-gray-800"><?php _e( 'AI Product', 'block_theme' ); ?></span>
        <span class="ml-auto bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-medium"><?php _e( 'SOON', 'block_theme' ); ?></span>
      </div>
    </div>
  </div>
</section>
        
        
    

<?php get_footer(); ?>