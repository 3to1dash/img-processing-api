# Image Processing API
A simple API for resizing images, saving them on disk and serving them on the browser.

## How to run the project
* Check if Node version 16.13.9 installed on your system, you can download it from then check if the instalation has gone correctly by typing
      
      $ node --version
      $ 16.13.0
* Install the dependencies by typing the command
  
      $ npm install
      
* Add your images that you want to process in the assets/full folder.

* Start the server by typing the command
      $ npm run start

* Endpoint for resizing images
      GET /api/images?filename=FILENAME -> Will render your image as is without any modification.

      GET/api/images?filename=FILENAME&width=WIDTH&height=HEIGHT -> will render the resized image. You should replace FILENAME, WIDTH, HEIGHT with your specific needs.

## How to run the tests
* Run your tests by typing the command.
NOTE: The tests won't pass until you start the server.
      $ npm run test