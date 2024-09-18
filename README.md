# IMG Processing Node SDK

This is a Node.js SDK for the [IMG Processing](https://img-processing.com/) API.

We have implemented a nice SDK that provides a simple and easy-to-use way to interact with the IMG Processing API, a powerful and flexible API provides a wide range of
image manipulation and analysis capabilities, allowing developers to integrate advanced image processing
features into their applications with ease.

## Overview

IMG Processing API SDK is a set of tools that allow you to interact with the IMG Processing API from your application.
The SDK provides three basic elements, the `IMGProcessingClient`, the `ImageObject`, and the `IMGProcessingAPIError` classes.

Soon we will talk more about each of these elements, but first, let's see how to install the SDK in your project.

## Installation

You can install the SDK using a package manager:

```bash
npm install img-processing-sdk
```

## Authentication

After installing the SDK, you need to authenticate your requests using your API key.
Check out the [Authentication](https://docs.img-processing.com/api-reference/authentication) section for more information about how to get an API key.

After getting your API key, use it as an environment variable or application argument to
prevent hardcoding it in your code, and keep it secure.

## Using the SDK

To start using the SDK, you need to import the `IMGProcessingClient` class and create an instance of it.

```typescript node-sdk
import { IMGProcessingClient } from 'img-processing-sdk';

const client = new IMGProcessingClient({
    apiKey: process.env.IMG_PROCESSING_API_KEY,
});
```

Width the client, you can interact with many functions, for example, let's upload an image:

```typescript node-sdk
const image = await client.uploadImage({
    file: 'path/to/image.jpg',
    name: 'image.jpg',
});
```

After uploading the image, you can use the `ImageObject` returned and interact with it,
for example, resizing the image:

```typescript node-sdk
const resizedImage = await image.resize({
    width: 200,
    height: 200,
});
```

Or you can do the same operation using the client:

```typescript node-sdk
const resizedImage = await client.resizeImage({
    image_id: image.id,
    width: 200,
    height: 200,
});
```

If there is an error in the request, the SDK will throw an `IMGProcessingAPIError` with the error message.

```typescript node-sdk
try {
    const resizedImage = await client.resizeImage({
        image_id: 'image_exampleid',
        width: 200,
        height: 200,
    });
} catch (error) {
    console.error(error);
}

// Output:
// IMGProcessingAPIError {
//   type: 'https://docs.img-processing.com/errors/not-found',
//   error: 'Not Found',
//   status: 404,
//   message: 'Image with id image_exampleid not found.',
//   errors: undefined
// }
```

## Billing

All the request to the API that return a 201 status code will be counted as a processed image.
There are some endpoints that could be counted as multiple images processed, since they
execute two or more operations, in that case,
the docs will specify how many images will be counted for that operation.

Test images are not counted in the billing.

## Contributing

If you want to contribute to the SDK, please check the [Contributing](contributing.md) guide.