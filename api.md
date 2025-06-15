# Images

Types:

- <code><a href="./src/resources/images.ts">ImageObject</a></code>
- <code><a href="./src/resources/images.ts">ImageListResponse</a></code>
- <code><a href="./src/resources/images.ts">ImageClassifyResponse</a></code>
- <code><a href="./src/resources/images.ts">ImageExtractFormattedTextResponse</a></code>
- <code><a href="./src/resources/images.ts">ImageVisualizeResponse</a></code>

Methods:

- <code title="get /v1/images/{image_id}">client.images.<a href="./src/resources/images.ts">retrieve</a>(imageID) -> ImageObject</code>
- <code title="get /v1/images">client.images.<a href="./src/resources/images.ts">list</a>({ ...params }) -> ImageListResponse</code>
- <code title="delete /v1/images/{image_id}">client.images.<a href="./src/resources/images.ts">delete</a>(imageID) -> void</code>
- <code title="post /v1/images/{image_id}/watermark">client.images.<a href="./src/resources/images.ts">addWatermark</a>(imageID, { ...params }) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/blur">client.images.<a href="./src/resources/images.ts">blur</a>(imageID, { ...params }) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/classify">client.images.<a href="./src/resources/images.ts">classify</a>(imageID) -> ImageClassifyResponse</code>
- <code title="post /v1/images/{image_id}/convert">client.images.<a href="./src/resources/images.ts">convert</a>(imageID, { ...params }) -> ImageObject</code>
- <code title="post /v1/images">client.images.<a href="./src/resources/images.ts">createFromURL</a>({ ...params }) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/crop">client.images.<a href="./src/resources/images.ts">crop</a>(imageID, { ...params }) -> ImageObject</code>
- <code title="get /v1/images/{image_id}/download">client.images.<a href="./src/resources/images.ts">download</a>(imageID) -> Response</code>
- <code title="post /v1/images/{image_id}/extract-formatted-text">client.images.<a href="./src/resources/images.ts">extractFormattedText</a>(imageID, { ...params }) -> ImageExtractFormattedTextResponse</code>
- <code title="post /v1/images/imagine">client.images.<a href="./src/resources/images.ts">imagine</a>({ ...params }) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/mirror">client.images.<a href="./src/resources/images.ts">mirror</a>(imageID, { ...params }) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/modulate">client.images.<a href="./src/resources/images.ts">modulate</a>(imageID, { ...params }) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/publish">client.images.<a href="./src/resources/images.ts">publish</a>(imageID) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/remove-background">client.images.<a href="./src/resources/images.ts">removeBackground</a>(imageID, { ...params }) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/resize">client.images.<a href="./src/resources/images.ts">resize</a>(imageID, { ...params }) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/rotate">client.images.<a href="./src/resources/images.ts">rotate</a>(imageID, { ...params }) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/unpublish">client.images.<a href="./src/resources/images.ts">unpublish</a>(imageID) -> ImageObject</code>
- <code title="post /v1/images/upload">client.images.<a href="./src/resources/images.ts">upload</a>({ ...params }) -> ImageObject</code>
- <code title="post /v1/images/{image_id}/visualize">client.images.<a href="./src/resources/images.ts">visualize</a>(imageID, { ...params }) -> ImageVisualizeResponse</code>
