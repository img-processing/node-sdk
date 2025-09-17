# Changelog

## 2.5.3 (2025-09-17)

Full Changelog: [v2.5.2...v2.5.3](https://github.com/img-processing/node-sdk/compare/v2.5.2...v2.5.3)

### Bug Fixes

* **ci:** set permissions for DXT publish action ([9244a19](https://github.com/img-processing/node-sdk/commit/9244a19b3f90f2655c51bd469661f03c5fb9ed4a))

## 2.5.2 (2025-09-12)

Full Changelog: [v2.5.1...v2.5.2](https://github.com/img-processing/node-sdk/compare/v2.5.1...v2.5.2)

### Bug Fixes

* **mcp:** fix uploading dxt release assets ([d89bffa](https://github.com/img-processing/node-sdk/commit/d89bffac6fbce0d185b81e7a660ee1abb6e21b6b))


### Chores

* **mcp:** upload dxt as release asset ([5ee6ca4](https://github.com/img-processing/node-sdk/commit/5ee6ca4e70c310d4cb513a8925e5934cda36de25))

## 2.5.1 (2025-09-09)

Full Changelog: [v2.5.0...v2.5.1](https://github.com/img-processing/node-sdk/compare/v2.5.0...v2.5.1)

### Bug Fixes

* coerce nullable values to undefined ([2c327c2](https://github.com/img-processing/node-sdk/commit/2c327c2eb0617612dc319a9717a3df652178ab5b))

## 2.5.0 (2025-09-06)

Full Changelog: [v2.4.0...v2.5.0](https://github.com/img-processing/node-sdk/compare/v2.4.0...v2.5.0)

### Features

* **mcp:** allow setting logging level ([36435db](https://github.com/img-processing/node-sdk/commit/36435db6d60428f99fb0c091dc44f53e1926a3da))
* **mcp:** expose client options in `streamableHTTPApp` ([e703796](https://github.com/img-processing/node-sdk/commit/e703796d8b841b4e5646c5b9454ddb81f88a1c64))


### Bug Fixes

* **mcp:** fix query options parsing ([e87c83f](https://github.com/img-processing/node-sdk/commit/e87c83f4dfdb17fbb22029ab6b1d0c7fa64c540e))


### Chores

* ci build action ([854760e](https://github.com/img-processing/node-sdk/commit/854760e576752a3a6179067c85f0423b59914a3f))
* **internal:** codegen related update ([40e6528](https://github.com/img-processing/node-sdk/commit/40e65286601bc2914d4a0993a2098b25c9446c60))
* **internal:** codegen related update ([913fa07](https://github.com/img-processing/node-sdk/commit/913fa0740c637f10708ee113fee1d46b7879e223))

## 2.4.0 (2025-08-29)

Full Changelog: [v2.3.3...v2.4.0](https://github.com/img-processing/node-sdk/compare/v2.3.3...v2.4.0)

### Features

* **mcp:** add code execution tool ([1e6e47f](https://github.com/img-processing/node-sdk/commit/1e6e47fc112ed1f4fa4aea3ee9e169f431a22bf1))
* **mcp:** add option to infer mcp client ([1a28e8d](https://github.com/img-processing/node-sdk/commit/1a28e8d295b20d9fc36ab300b7c8ea6dff1950e6))
* **mcp:** add unix socket option for remote MCP ([beb9dd4](https://github.com/img-processing/node-sdk/commit/beb9dd48f980afb651e8046d666a0dbf4be92e6b))
* **mcp:** parse query string as mcp client options in mcp server ([6103b1b](https://github.com/img-processing/node-sdk/commit/6103b1b9d4fc2381717803cdcbfb77957f8859c9))
* **mcp:** remote server with passthru auth ([b448966](https://github.com/img-processing/node-sdk/commit/b4489666ad7cd444ec4b2bbe28775a6ccd402bc4))


### Chores

* add package to package.json ([b2a1a45](https://github.com/img-processing/node-sdk/commit/b2a1a45fd1316f254c976a9493a39b0d313c868a))
* **client:** qualify global Blob ([792a72d](https://github.com/img-processing/node-sdk/commit/792a72daac7498fdbac113f863b4e8f0b6edc62c))
* **deps:** update dependency @types/node to v20.17.58 ([ad63e7b](https://github.com/img-processing/node-sdk/commit/ad63e7b9bcc1660e8f755d5b263c9d6cf7613ab5))
* **internal:** codegen related update ([e5baf0e](https://github.com/img-processing/node-sdk/commit/e5baf0e86fe7f855f27379b0e80103df289a307f))
* **internal:** codegen related update ([195cb9c](https://github.com/img-processing/node-sdk/commit/195cb9c3218de2d995f6e7c5662fd0551751067e))
* **internal:** codegen related update ([235bda2](https://github.com/img-processing/node-sdk/commit/235bda2cc08877691f5c3e1f6f31da6db2a42537))
* **internal:** formatting change ([7a289dc](https://github.com/img-processing/node-sdk/commit/7a289dc0129a6db46b90b7abe806713a076cc24b))
* **internal:** make mcp-server publishing public by defaut ([b493034](https://github.com/img-processing/node-sdk/commit/b4930345e7268166a1a9f8cff5ed68b6ffa8a101))
* **internal:** move publish config ([b03a102](https://github.com/img-processing/node-sdk/commit/b03a102678859ed5c2d0a49c762a4297f82a5e8e))
* **internal:** refactor array check ([437ad15](https://github.com/img-processing/node-sdk/commit/437ad156ec381cae1858a627a6d07bfbe2456221))
* **internal:** update comment in script ([343c9ab](https://github.com/img-processing/node-sdk/commit/343c9ab3c7fe13e06cafc9fa4db0700f59c5ab05))
* **internal:** update global Error reference ([e78611f](https://github.com/img-processing/node-sdk/commit/e78611f130006a3ca8482de1f2ff747bbb35d051))
* **mcp:** add cors to oauth metadata route ([49567de](https://github.com/img-processing/node-sdk/commit/49567de051340ae276b1cc11912e298a36a0cb1c))
* **mcp:** document remote server in README.md ([81531a2](https://github.com/img-processing/node-sdk/commit/81531a2158ed50b1c098846b3114950f219ce779))
* **mcp:** minor cleanup of types and package.json ([64fc7d2](https://github.com/img-processing/node-sdk/commit/64fc7d2f2b8990bafa2cb9928aece64f8044c368))
* **mcp:** refactor streamable http transport ([6d1f099](https://github.com/img-processing/node-sdk/commit/6d1f099f3740a952409a11fe29412115aaa5aad0))
* **mcp:** update package.json ([3e205e0](https://github.com/img-processing/node-sdk/commit/3e205e09432c5eb5488f52d8572bd2305f761714))
* **mcp:** update README ([1d29e14](https://github.com/img-processing/node-sdk/commit/1d29e1483a17241d30d2f18d2242282aa826ce6f))
* **mcp:** update types ([966b167](https://github.com/img-processing/node-sdk/commit/966b167ad9badb70b3e32dfdbf4d5bc494ae23aa))
* update @stainless-api/prism-cli to v5.15.0 ([bf1ff9d](https://github.com/img-processing/node-sdk/commit/bf1ff9d7508d52d1455ce5bb7770476a1192513b))
* update CI script ([0afb400](https://github.com/img-processing/node-sdk/commit/0afb400dbda3935f8c7dad1da6f87ab019665efc))

## 2.3.3 (2025-08-02)

Full Changelog: [v2.3.2...v2.3.3](https://github.com/img-processing/node-sdk/compare/v2.3.2...v2.3.3)

### Bug Fixes

* upload images tool ([#3](https://github.com/img-processing/node-sdk/issues/3)) ([e8b2dbd](https://github.com/img-processing/node-sdk/commit/e8b2dbd84b8f19a8d36aed6df8250d8137af5d93))

## 2.3.2 (2025-08-02)

Full Changelog: [v2.3.1...v2.3.2](https://github.com/img-processing/node-sdk/compare/v2.3.1...v2.3.2)

### Bug Fixes

* upload images tool ([#2](https://github.com/img-processing/node-sdk/issues/2)) ([3565f0d](https://github.com/img-processing/node-sdk/commit/3565f0dda3a0ed29edefc960060863bc4e89d7d6))

## 2.3.1 (2025-08-02)

Full Changelog: [v2.3.0...v2.3.1](https://github.com/img-processing/node-sdk/compare/v2.3.0...v2.3.1)

### Features

* **api:** update via SDK Studio ([5e0e24a](https://github.com/img-processing/node-sdk/commit/5e0e24a179eeb5b7490305fecd975b2de9b8836e))


### Bug Fixes

* upload images ([0bc2f28](https://github.com/img-processing/node-sdk/commit/0bc2f28d1e715fc79ee6c584c0def00cf6c77bf4))

## 2.3.0 (2025-08-02)

Full Changelog: [v2.2.0...v2.3.0](https://github.com/img-processing/node-sdk/compare/v2.2.0...v2.3.0)

### Features

* **api:** update via SDK Studio ([d3f17b5](https://github.com/img-processing/node-sdk/commit/d3f17b59c11713c1fff84c6d7920bca0d20c06ab))
* **mcp:** add logging when environment variable is set ([c2200b1](https://github.com/img-processing/node-sdk/commit/c2200b1cb3be096fed0cb7fb06526f37998beee2))

## 2.2.0 (2025-08-01)

Full Changelog: [v2.1.0...v2.2.0](https://github.com/img-processing/node-sdk/compare/v2.1.0...v2.2.0)

### Features

* **client:** add support for endpoint-specific base URLs ([c69b98a](https://github.com/img-processing/node-sdk/commit/c69b98a63138870bb7b7bac897673bc211d0a7b2))
* **mcp:** fallback for void-typed methods ([e4b9556](https://github.com/img-processing/node-sdk/commit/e4b9556e68eeeec8618607f993213523b2ca4859))
* **mcp:** support filtering tool results by a jq expression ([870cf5a](https://github.com/img-processing/node-sdk/commit/870cf5a7a7565596279fa2fe993617c768f4b494))


### Bug Fixes

* **ci:** release-doctor — report correct token name ([5a6dda2](https://github.com/img-processing/node-sdk/commit/5a6dda2c0831c26fb4dca943f94a9bbb642e5591))
* **client:** explicitly copy fetch in withOptions ([62a5487](https://github.com/img-processing/node-sdk/commit/62a5487820d0d83796ea89d08d57c8d6af333700))
* **client:** get fetchOptions type more reliably ([4b7dc60](https://github.com/img-processing/node-sdk/commit/4b7dc60c9fb7b05ef88ce8c58ffc14b1fab7b753))
* **mcp:** avoid sending `jq_filter` to base API ([e6427b0](https://github.com/img-processing/node-sdk/commit/e6427b0949ccde76f636a042c3a7c6f4d017803a))
* **mcp:** include required section for top-level properties and support naming transformations ([c93cd13](https://github.com/img-processing/node-sdk/commit/c93cd130fd7099d714e25c0b65d36d16b77a366b))
* **mcp:** relax input type for asTextContextResult ([7aff7b0](https://github.com/img-processing/node-sdk/commit/7aff7b0efaf6c0e8a13f8f882966e871cfe3bf03))
* **mcp:** reverse validJson capability option and limit scope ([85b5844](https://github.com/img-processing/node-sdk/commit/85b58449a5f703794470c098f5e394770f8af67c))
* **mcp:** support jq filtering on cloudflare workers ([2b2d8b1](https://github.com/img-processing/node-sdk/commit/2b2d8b11247e18d00e8d78aeeb28fcb592837671))


### Chores

* add docs to RequestOptions type ([6b5e96d](https://github.com/img-processing/node-sdk/commit/6b5e96d86103b71a27a33f88d9702eddd008a8dd))
* **ci:** enable for pull requests ([3793afa](https://github.com/img-processing/node-sdk/commit/3793afaeb12c490cfa97092bff0194113cd24d4e))
* **ci:** only run for pushes and fork pull requests ([90253d0](https://github.com/img-processing/node-sdk/commit/90253d09879bfeda456b9907617d84d4249a3068))
* **client:** improve path param validation ([eaa64ef](https://github.com/img-processing/node-sdk/commit/eaa64ef68f2ee965cbb6e809750db0526de855c2))
* **client:** refactor imports ([5230c08](https://github.com/img-processing/node-sdk/commit/5230c082fe867c9f52d4445112c0167a149b7981))
* **internal:** codegen related update ([00385f2](https://github.com/img-processing/node-sdk/commit/00385f233285d0c88aaaf576099fa520b0298076))
* **internal:** remove redundant imports config ([8a962ba](https://github.com/img-processing/node-sdk/commit/8a962bafdf361cc3b94214804de67a45c556b0e1))
* make some internal functions async ([1d04b51](https://github.com/img-processing/node-sdk/commit/1d04b51f56d24ddba0ffc46f3e27558e4173ff13))
* **mcp:** formatting ([f603037](https://github.com/img-processing/node-sdk/commit/f603037e658fcf541a1154689ba2890dba401888))
* **mcp:** rework imports in tools ([46bcee5](https://github.com/img-processing/node-sdk/commit/46bcee57c247c2958f486ac38f07c35a498085d2))
* **readme:** update badges ([9140b23](https://github.com/img-processing/node-sdk/commit/9140b2343a4680fffec2654f5abdfb05abcb8d52))
* **readme:** use better example snippet for undocumented params ([7aab77f](https://github.com/img-processing/node-sdk/commit/7aab77f822ded35771e3c5047dddef4fd694e371))
* **ts:** reorder package.json imports ([a87bc9a](https://github.com/img-processing/node-sdk/commit/a87bc9aa3cd78c99a410bdb0747d4f42df9e0cc4))

## 2.1.0 (2025-06-15)

Full Changelog: [v2.0.0...v2.1.0](https://github.com/img-processing/node-sdk/compare/v2.0.0...v2.1.0)

### Features

* **api:** update via SDK Studio ([8e27f15](https://github.com/img-processing/node-sdk/commit/8e27f158dd6dbc708417820b232fc5046e72613d))


### Chores

* configure new SDK language ([4b9af94](https://github.com/img-processing/node-sdk/commit/4b9af947d0f1bd5c7e355b90ad522439bf7cfafb))

## 2.0.0 (2025-06-15)

Full Changelog: [v1.4.0...v2.0.0](https://github.com/img-processing/node-sdk/compare/v1.4.0...v2.0.0)

### Features

* access methods ([d8c8ca4](https://github.com/img-processing/node-sdk/commit/d8c8ca4f840a2cdabf0091f9cf1e5e37782cb882))
* added biome ([6e1f718](https://github.com/img-processing/node-sdk/commit/6e1f718146eeda46fc873c1dbf019ae6f78a9baf))
* added blur ([7314cf9](https://github.com/img-processing/node-sdk/commit/7314cf9f5192ff916cb5b3457aba4c23c48c159f))
* added blur ([4c050fe](https://github.com/img-processing/node-sdk/commit/4c050feef16a21fbd0977313ed80ec6cbc066101))
* added changesets ([fd0f355](https://github.com/img-processing/node-sdk/commit/fd0f3559fd8bc713175d7dd8ca2da198165463b4))
* added changesets ([6743a73](https://github.com/img-processing/node-sdk/commit/6743a73c48280284b1a1bf40bd223f8175f38672))
* added delete method ([76fadb3](https://github.com/img-processing/node-sdk/commit/76fadb31bdbbf309c982b03d790f6fc808ec4830))
* added extract formatted text ([#3](https://github.com/img-processing/node-sdk/issues/3)) ([4dfa9eb](https://github.com/img-processing/node-sdk/commit/4dfa9eb446d82d4e4fdbf00d9289d2adec946345))
* added prepublish script ([d377a5a](https://github.com/img-processing/node-sdk/commit/d377a5a4c1c30bed79b4bec47965da164e9f8028))
* analysis ([f68098a](https://github.com/img-processing/node-sdk/commit/f68098aa1ab1662a4f27617cb3df6ea732c4ade9))
* analysis function ([21ffa3c](https://github.com/img-processing/node-sdk/commit/21ffa3cf4e12c501d675f6b89170cdc4300510f1))
* changed package name ([77f4aa7](https://github.com/img-processing/node-sdk/commit/77f4aa72beb46bde9568c9fd70a6f45c515f1e0f))
* changed package name ([fceb5c9](https://github.com/img-processing/node-sdk/commit/fceb5c96e4db021c845c6499f47ad693a4f25273))
* creation methods ([225696e](https://github.com/img-processing/node-sdk/commit/225696e56f74e76bcf7ae89beec21f852f1ad4e3))
* download ([e834148](https://github.com/img-processing/node-sdk/commit/e83414866210c41f8d87e190825feef2f6e89eab))
* edition methods ([79bf2b7](https://github.com/img-processing/node-sdk/commit/79bf2b796642303534d57a2c6114c47bab0eb507))
* edition methods ([6c61103](https://github.com/img-processing/node-sdk/commit/6c61103ade656f8f20eb8c490df353597d95b133))
* finished image creation ([c4ef375](https://github.com/img-processing/node-sdk/commit/c4ef3755677372b706e9318d216b849d5bf207f7))
* finished transformation endpoints ([596d089](https://github.com/img-processing/node-sdk/commit/596d089a631affbed5972786570bbb39219af75c))
* finished upload ([4aa3255](https://github.com/img-processing/node-sdk/commit/4aa3255567c663d297d9388744a2702dd68b1554))
* optional params on remove image background ([0bed71b](https://github.com/img-processing/node-sdk/commit/0bed71b6f47ed52d1f65a1a62c7e468a3b8f32a7))
* paginated results ([72d389c](https://github.com/img-processing/node-sdk/commit/72d389c19c4ab6d40719fbc4dd25cc220b4f8ade))
* publish and unpublish ([99ced0a](https://github.com/img-processing/node-sdk/commit/99ced0a22e43b166c78382876bd9fe1267cad497))
* resize ([fd283b2](https://github.com/img-processing/node-sdk/commit/fd283b23f7e63be7bde1db3b90cb7b189d96dc11))
* starting client ([dabfb17](https://github.com/img-processing/node-sdk/commit/dabfb17134a083b6dfc32c4d5d68f76494ae2b34))
* starting package ([70a11f4](https://github.com/img-processing/node-sdk/commit/70a11f463521ce69b9a42c3291a8a2fa48947e38))
* starting sdk documentation ([1840ccb](https://github.com/img-processing/node-sdk/commit/1840ccb4fe5a0a9961aec03f92be35719cef976d))
* transformation ([05a935d](https://github.com/img-processing/node-sdk/commit/05a935d2c813447d24eda76be84e0a7abbcd688f))
* transformation tests 1 ([1c87cf5](https://github.com/img-processing/node-sdk/commit/1c87cf5ec22aeb43030534e4c5f4bfb3a29f01db))
* transformation tests 2 ([f7054f1](https://github.com/img-processing/node-sdk/commit/f7054f12c708c1a0aab7c9e9b38ed4a6ea1d1aad))


### Bug Fixes

* imagine ([141b14a](https://github.com/img-processing/node-sdk/commit/141b14aee604c3b41d185478c32cd6439ee0fac6))
* imports ([3ce4619](https://github.com/img-processing/node-sdk/commit/3ce46196dc6fb97ef8649c5a155c340aa565689f))
* readme ([efe1942](https://github.com/img-processing/node-sdk/commit/efe19428c36dddd7705ef7daf31e20075ae6b675))
* tests ([cecc9b1](https://github.com/img-processing/node-sdk/commit/cecc9b16924456beb5284a46051faf947518b98e))
* watermark ([0526b54](https://github.com/img-processing/node-sdk/commit/0526b541ffa86ff37494316cb162bd8aeb9b1fa9))
* watermark ([4417b4c](https://github.com/img-processing/node-sdk/commit/4417b4cd3f794f2152ed6d72af663e161d6b7b94))
* wrong parameter on mirror ([a26b46b](https://github.com/img-processing/node-sdk/commit/a26b46b94463b63caf4e9ae5026c0c1978706502))


### Chores

* contributing guidelines ([042355a](https://github.com/img-processing/node-sdk/commit/042355a6530ebb8e2879eea0f405c7d21de80906))
* first release ([ddbfaf3](https://github.com/img-processing/node-sdk/commit/ddbfaf33b7b11ee9e5f8dd23b357572bbfd8d11f))
* npm publish ([28c4744](https://github.com/img-processing/node-sdk/commit/28c474436a2ca58263e1792cb23d962e61501613))
* publish ([9819ab8](https://github.com/img-processing/node-sdk/commit/9819ab80281f1cc7265ff98db42296a02e4dbbf7))
* run linter ([66fab36](https://github.com/img-processing/node-sdk/commit/66fab36e646c3e7d4a9ad14e1858eff06a6fdc7b))
* sync repo ([5d7b1d6](https://github.com/img-processing/node-sdk/commit/5d7b1d689e62db4c81f972519ecc69cb3944c773))
* update SDK settings ([d7cdd40](https://github.com/img-processing/node-sdk/commit/d7cdd4090bdc92b274a73fff6d40c5cbc7d18f41))
* update SDK settings ([d884c24](https://github.com/img-processing/node-sdk/commit/d884c2441a0e957fb4c6c69aa7df3b46ffdde346))
* update SDK settings ([f6461a9](https://github.com/img-processing/node-sdk/commit/f6461a9cba9c7fff945449e47de02b576a93fee1))
* update SDK settings ([45e10d8](https://github.com/img-processing/node-sdk/commit/45e10d8a8415d4c43898e504502dd71a489bb9d0))


### Documentation

* **changeset:** - Added `extractText` method to the client. ([db57b93](https://github.com/img-processing/node-sdk/commit/db57b9376b123cd056ff9374e10b3fea5252a708))
* **changeset:** Changed package name ([96586bb](https://github.com/img-processing/node-sdk/commit/96586bbb38512cc98dca4be88038dc996a876245))
* **changeset:** Initial package ([70aae6d](https://github.com/img-processing/node-sdk/commit/70aae6d204b65d0cacf8840b51f7d33a0e258ab1))
* **changeset:** Optional remove background param ([e6107e7](https://github.com/img-processing/node-sdk/commit/e6107e7a1c33e23538af56174412df6c07f42a91))
