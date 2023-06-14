# My Project

This project provides an API for generating PDF files from a list of image paths.

## Installation

1. Clone the repository
2. Execute the following command

get inside that repository

```
cd IMAGE-TO-PDF
```

install the required libraries

```
npm i
```

## Use

1. Use any API testing software eg. Postman or Thunderclient
2. run the following command in your terminal

```
npm start
```

## API

### GET /

- Description: Get the root endpoint

```
http://localhost:5211
```

### POST /makePDF

- Description: Generate a PDF file from a list of image paths

```
http://localhost:5211/makePDF
```

- Request Body:

  ```json
  {
    "imagePath": "images/photo1.jpg, images/photo2.jpg, images/photo3.jpg"
  }
  ```

## Algorithm

The `makePDF` API endpoint accepts a POST request with a JSON payload containing the `imagePath` property, which is a comma-separated string of image paths. The algorithm follows these steps to generate a PDF file:

1. Create a new PDF document using the `pdfkit` library.
2. Split the `imagePath` string into individual image paths.
3. For each image path:
   - Load the image from the file system.
   - Add the image to the PDF document at the top-left corner with a fixed width and height.
   - Add a new page to the PDF document.
4. Save the PDF document to the file system with a predefined name, such as "output.pdf".
5. Send a response indicating that the PDF generation is complete.
