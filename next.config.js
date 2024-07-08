// next.config.js

module.exports = {
  // Specify the export path map for static HTML export
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      // Add additional routes if needed
    };
  },
  // Specify where to export the static files
  distDir: 'docs', // Use 'docs' as the build output directory
};
