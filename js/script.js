// Place in iife
(function ()
{
  // Reference for images
  var $imgs = $("#gallery img");
  // Reference for button filters
  var $buttons = $("#filterBooksBtn");
  // Create Reference for object literal
  var tag = {};
  var $window = $(window);

  // Fade in all books for 500 milliseconds when page loads
  $window.on("load",function()
  {
    $imgs.hide().fadeIn(500);
  });

  // Loop through images
  $imgs.each(function()
  {
    // Store img in variable
    var images = this;
    // Get this elements tag
    var tags = $(this).data("tags");

    // If elements has a tag
    if (tags)
    {
      /*
        Use split() method for when there is a comma, then call forEach() method
        to loop through tags. Then call anonymous function
      */
      tags.split(",").forEach(function(tagName)
      {
        // If object does not have tag, add empty array to the object
        if (tag[tagName] == null)
        {
          tag[tagName] = [];
        }
        // otherwise, Add the image to the array
        tag[tagName].push(images);
      });
    }
  });
  // Create empty button
  $("<button/>",{
      // Add text show all categories
      text: "Show all categories",
      // Make class active
      class: "active",
      // Add onClick handler to get the clicked on button
      click: function()
      {
        // Reference to button clicked on
        $(this)
          // Make button the class of active
          .addClass("active")
          // get siblings
          .siblings()
          // Remove active from siblings
          .removeClass("active");
          // Show all images for the show all categories button
          // Used to fade in books for 500 milliseconds
        $imgs.fadeIn(500);
      }
      // Add buttons
  }).appendTo($buttons);

  // Loop through tags and for each tag name, add a button.
  $.each(tag, function(tagName)
  {
    $("<button/>",
    {
      // Add the tagName
      text: tagName + " (" + tag[tagName].length + ")",
      // Add click handler
      click: function()
      {
        // The button clicked on
        $(this)
        // Make clicked on button active
        .addClass("active")
        // get siblings
        .siblings()
        // remove active class from siblings
        .removeClass("active");
        // For all of the images
        $imgs
        // Hide them
        .hide()
        // Find the ones with the tagName
        .filter(tag[tagName])
        // Show only those images relative to what categories was pressed.
        .fadeIn(500);
      }
      // Add buttons
    }).appendTo($buttons);
  });
}());
