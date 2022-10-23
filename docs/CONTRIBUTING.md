
## GIT Conventions
### Commits

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) along with [commitlintjs](https://commitlint.js.org/) to have more control. Here is a short brief:

- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- chore: updating grunt tasks etc; no production code change
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests



The commits have the following format:
- Starts with one of the allowed types
- All the text is lowercase 
- Verbs must be in infinitive form, for example: `implement`
- Concepts are written in UpperCamelCase, for example: `implement NFTModel mapper`

Example:

```
feat: implement NFT details view
```

### Branching
We use the `development` branch on a daily basis. If we need to implement a PoC [^1]or a really big feature, we create a new branch.

For the branchs we use kebab-case (`my-branch`).

The PoC will not be merged, there's no need to follow the conventions.

Example:

```sh
poc/meaningful-branch-name
refactor/change-nft-api
feature/filter-favourites
fix/user-saved-favourites
```

### Pull request
Add commits as description and use squash strategy


## Project structure
```sh

```



## Developing scripts
```sh
npm run dev
```

### Type-Check and Compile for Production

```sh
npm run lint
npm run build
```
### Testing
#### Unit tests
```sh
npm run test
npm run test:watch
```
<!--
##### E2E tests
```sh
npm run test:e2e:open
npm run test:e2e:run
```
-->

****
[^1]: Proof of Concept
****