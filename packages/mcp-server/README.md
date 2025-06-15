# Img Processing TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Building

Because it's not published yet, clone the repo and build it:

```sh
git clone git@github.com:img-processing/node-sdk.git
cd node-sdk
./scripts/bootstrap
./scripts/build
```

### Running

```sh
# set env vars as needed
export IMG_PROCESSING_API_KEY="My API Key"
node ./packages/mcp-server/dist/index.js
```

> [!NOTE]
> Once this package is [published to npm](https://app.stainless.com/docs/guides/publish), this will become: `npx -y img-processing-mcp`

### Via MCP Client

[Build the project](#building) as mentioned above.

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "img_processing_api": {
      "command": "node",
      "args": ["/path/to/local/node-sdk/packages/mcp-server", "--client=claude", "--tools=dynamic"],
      "env": {
        "IMG_PROCESSING_API_KEY": "My API Key"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "img-processing-mcp/server";

// import a specific tool
import retrieveImages from "img-processing-mcp/tools/images/retrieve-images";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [retrieveImages, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `images`:

- `retrieve_images` (`read`): Sometimes you may need to retrieve a specific image information to get information about the image, such as the image URL, the image size, or the image format. This endpoint allows you to retrieve an image by its unique identifier.
- `list_images` (`read`): This endpoint allows you to retrieve a list of all the images created by the user. The images are returned in descending order of creation date, with the most recent images first in the list.

  Images are paginated, following the pagination rules.

- `delete_images` (`write`): Sometimes you may need to remove an image from the system. This endpoint allows you to delete an image by its unique identifier, deleting all the data associated with the image, and making it unavailable for future requests.

  Published images will no longer be accessible after deletion.

- `add_watermark_images` (`write`): This endpoint allows you to add watermarks to an image. Watermarks are a great way to protect your images from unauthorized use and to promote your brand.

  At the moment, you can only add image watermarks to your images. You must upload your watermark, apply the transformations, and once you have the desired watermark, apply it to your images using this endpoint.

- `blur_images` (`write`): This endpoint allows you to apply a blur effect to an image. Blurring an image can be useful for various purposes, such as anonymizing sensitive information, creating a soft-focus effect, loader skeletons, etc.

  Blurring an image depends on a factor sigma that determines the intensity of the blur effect. The higher the value of sigma, the more intense the blur effect will be. This value represents the standard deviation of the Gaussian kernel used to apply the blur effect.

- `classify_images` (`write`): The classify endpoint allows you to classify an image using a pre-trained model. At the moment, the only supported model is the ResNet50 model, a deep learning model that excels at image classification tasks.

  The endpoint will return a list of labels and their probabilities for the image.

- `convert_images` (`write`): With this endpoint, you can create a new image by converting an existing image to a different format.

  The supported image formats are jpeg, png, and webp.

  - JPEG (Joint Photographic Experts Group): A commonly used method of lossy compression for digital images, particularly for those images produced by digital photography. JPEG compression significantly reduces the file size, but it can also reduce the image quality.
  - PNG (Portable Network Graphics): A raster-graphics file format that supports lossless data compression. PNG is often used for images that require transparency or when the image quality must be preserved without any loss.
  - WebP: A modern image format that provides superior lossless and lossy compression for images on the web. WebP images are smaller in size compared to JPEG and PNG, while maintaining similar or better image quality

- `create_from_url_images` (`write`): The first step to start processing images with the IMG Processing API is to create an Image Object. You can create an Image object by uploading an image file or by providing a URL to an existing image.

  This endpoint allows you to create an Image object by providing a URL to an existing image. The API will download the image from the provided URL, so make sure the URL is accessible and the image is publicly available.

- `crop_images` (`write`): With this endpoint, you can crop an image by specifying the dimensions of the crop area.

  The crop area is defined by 2 points: the top-left corner at (x1, y1) and the bottom-right corner at (x2, y2)

- `download_images` (`read`): This endpoint allows you to download an image by its unique identifier. The image is returned as a binary response.

  This request is authenticated, so it is not recommended to share this URL with others. Use this endpoint to download images in your application or service, and serve them to your users, or use the publish endpoint to generate a public link to share the image with others.

- `extract_formatted_text_images` (`write`): This endpoint extracts the text from an image and returns its content in the format specified in the request.

  The format can be either `plain` or `markdown`. The API will return all the text from the image, trying to maintain the document structure as much as possible.

- `imagine_images` (`write`): The imagine endpoint allows you to create a new image using AI. At the moment, there is support for the models: ByteDance SDXL-Lightning and Flux, which generates good quality images from text descriptions.

  The images generated by the endpoint has a resolution of 1024x1024 pixels and are saved in JPEG format.

- `mirror_images` (`write`): With this endpoint, you can mirror an existing image horizontally or vertically to create a new image.

  Mirror an image horizontally means that the image is mirrored along the vertical axis, while flipping an image vertically means that the image is mirrored along the horizontal axis. You can also mirror an image horizontally and vertically at the same time using the mode both

- `modulate_images` (`write`): This endpoint allows you to adjust the brightness, saturation, and hue of an image.

  Brightness is one of the three properties of color, along with hue and saturation. It refers to the amount of light in an image, with a high brightness making the image lighter and a low brightness making the image darker.

  Contrast is the difference in brightness between the lightest and darkest parts of an image. A high contrast image will have a wide range of brightness values, while a low contrast image will have a narrow range of brightness values.

  Finally, exposure refers to the amount of light that reaches the camera sensor when taking a photo. A high exposure value will make the image brighter, while a low exposure value will make the image darker.

- `publish_images` (`write`): By default, all images created using the API are private and can only be accessed by the user who created them via the API key. This endpoint allows you to make a private image public, so that it can be accessed by anyone.

  Publishing an image adds it to a CDN, allowing it to be accessed faster and more efficiently.

  After publishing an image, the url field of the image object will be updated with the public URL. You can still access the image using the private download URL, but the public URL can be shared with others.

- `remove_background_images` (`write`): This endpoint allows you to remove the background from an image. Removing the background from an image can be useful for various purposes, such as creating a transparent background or isolating the subject of the image.

  The background removal process works by segmenting the image into foreground and background regions. The API uses advanced machine learning algorithms to detect and remove the background from the image, leaving only the foreground subject.

- `resize_images` (`write`): This endpoint creates a new image by resizing an existing image.

  At the moment, there are three fit modes available:

  Fit Modes
  Available fit modes

  - fill: The image is resized to fill the specified dimensions, stretching/squishing the image to fit the provided dimensions. This is the default fit mode.
  - contain: The image is resized to fit within the specified dimensions, maintaining the aspect ratio, and adding a letterbox if necessary.
  - cover: The image is resized to cover the specified dimensions, maintaining the aspect ratio, cropping/clipping the image if necessary.
    Additionally, you can specify the background color for the letterbox when using the contain fit mode, and the gravity for cropping or positioning the image when using the cover and contain fit modes.

- `rotate_images` (`write`): This endpoint creates a new image by rotating the original image.
- `unpublish_images` (`write`): With this endpoint, you can unpublish an image that was previously published using the Publish Image endpoint. This will remove the image from the CDN and make it private again.

  After unpublishing an image, the url field of the image object will be updated with to null. You can still download the image using the Download Image endpoint.

- `upload_images` (`write`): The first step to start processing images with the IMG Processing API is to create an Image Object. You can create an Image object by uploading an image file or by providing a URL to an existing image.

  This endpoint allows you to create an Image object by uploading an image file.

  To upload an image, you need to send a multipart/form-data request to the API with the image file as a File object stringified in the image field, and name field with the name of the image for identification purposes.

- `visualize_images` (`write`): This endpoint returns a response based on the content of an image and a base prompt.

  The prompt can be a question, statement, or any text that you want to ask about the image. The API will analyze the content of the image and generate a response based on the prompt using a pre-trained model.

  Right now there are three models available for this endpoint:

  - Uform-Gen: UForm-Gen is a small generative vision-language model primarily designed for Image Captioning and Visual Question Answering.
  - Llava: LLaVA is a large multimodal model that can generate text based on images and text prompts.
  - Gemini: Gemini is a multimodal model with advanced capabilities for understanding and generating text based on images.
