# Image Processing API
A simple API for resizing images, saving them on disk and serving them on the browser.

## How to run the project
* Check if Node version 16.13.9 installed on your system, then check if the instalation has gone correctly by typing
      
      $ node --version
      $ 16.13.0
* Install the dependencies by typing the command
  
      $ npm install
      
* Make sure to add your images that you want to process in the assets/full folder.

* Start the server by typing the command

      $ npm run start
## Endpoint for resizing images
* This endpoint will render your image as is without any modification

      GET /api/images?filename=FILENAME
* This endpoint will render the resized image. You should replace FILENAME, WIDTH, HEIGHT with your specific values

      GET /api/images?filename=FILENAME&width=WIDTH&height=HEIGHT

## How to run the tests
#### NOTE: The tests won't pass until you start the server.
* Run your tests by typing the command.

      $ npm run test
