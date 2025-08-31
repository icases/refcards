// Image utility functions for Supabase Storage

/**
 * Construct the full URL for a Supabase Storage image
 * @param {string} imagePath - The image path from the database
 * @returns {string} The full URL to the image
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as-is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  console.log('🔍 Original image path from DB:', imagePath);
  
  // Get Supabase URL from environment or use local default
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
  
  // Aggressive cleaning to handle various path formats
  let cleanPath = imagePath
    .replace(/^\/+/, '') // Remove leading slashes
    .replace(/\/+/g, '/') // Replace multiple slashes with single slash
    .replace(/^gesture-images\/+/, '') // Remove "gesture-images/" at start (with any trailing slashes)
    .replace(/^\/+/, '') // Remove any remaining leading slashes
    .replace(/gesture-images\/+/g, ''); // Remove any remaining "gesture-images/" occurrences
  
  console.log('🧹 Cleaned path:', cleanPath);
  
  // Construct the final URL with single bucket name
  const fullUrl = `${supabaseUrl}/storage/v1/object/public/gesture-images/${cleanPath}`;
  
  console.log('🎯 Final URL:', fullUrl);
  
  return fullUrl;
}
