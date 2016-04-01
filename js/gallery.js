// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/


function swapPhoto() {
    //Add code here to access the #slideShow element.
    //Access the img element and replace its source
    //with a new image from your images array which is loaded 
    //from the JSON string
    //$(".photoHolder").attr('src', '../img/places');
    //Makes sure it loops the images
    if (mCurrentIndex > mImages.length - 1) {
        mCurrentIndex = 0;
    } else if (mCurrentIndex < 0) {
        mCurrentIndex = mImages.length - 1;

    }
    console.log(mCurrentIndex)

    //changes html to add image descriptions
    $('#slideShow .photoHolder img').attr('src', mImages[mCurrentIndex].imgPath);
    $('#slideShow .details .location').text("Location: " + mImages[mCurrentIndex].imgLocation);
    $('#slideShow .details .description ').text("Description: " + mImages[mCurrentIndex].description);
    $('#slideShow .details .date ').text("Date: " + mImages[mCurrentIndex].date);

    console.log(mImages[mCurrentIndex].imgPath);
    console.log('swap photo');
    mCurrentIndex++;
}



// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

    // data is a JavaScript object now. Handle it as such



// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mURL = "images.json";



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
//function makeGalleryImageOnloadCallback(galleryImage) 
//{
//	return function(e) 
//    {
//		galleryImage.img = e.target;
//		mImages.push(galleryImage);
//	}
//}
//
//$(document).ready( function() 
//{
//	
//	// This initially hides the photos' metadata information
//	$('.details').eq(0).hide();
//	
//});
//
//window.addEventListener('load', function(galleryImage) 
//{
//	
//	console.log('window loaded');
//
//}, false);


function galleryImage(imgLocation, description, date, imgPath) 
  {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
  
      this.imgLocation = imgLocation;
      this.description = description;
      this.date = date;
      this.imgPath = imgPath;
    console.log('data stored');
  };


//Creates Galley Image Objects from JSON file, pushes objects into mImages array
function reqListener() 
{
    console.log(JSON.parse(this.responseText));
    var mJson = JSON.parse(this.responseText);
    for (var i = 0; i < mJson.images.length; i++) {
        var current = mJson.images[i];
        var imageDetails = new galleryImage(current.imgLocation, current.description, current.date, current.imgPath);
        mImages.push(imageDetails);

    }
}

mRequest.addEventListener("load", reqListener);
mRequest.open("GET", mURL);
mRequest.send();
