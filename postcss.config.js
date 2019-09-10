const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./src/**'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  });
  
  module.exports = () => {
    return {
      plugins: [
        require('tailwindcss'),
        purgecss
      ]
    };
  };
  