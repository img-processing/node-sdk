# Changelog

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
