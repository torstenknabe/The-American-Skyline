// external js: isotope.pkgd.js

jQuery('.grid').isotope({
  itemSelector: '.grid-item',
 percentPosition: true,
  masonry: {
     columnWidth: '.grid-sizer',
     gutter: '.gutter-sizer'
  },
  resize:true
});