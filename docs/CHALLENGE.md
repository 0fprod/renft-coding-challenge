****Goal:**** front-end assessment. ****Time:**** 6 hours or less.

## 📝 User story

The goal is to display a list of rentable NFTs. Critical properties for a user are:

- NFT title
- availability
- collateral required (‘nftPrice’ in schema)
- cost of rent

A user may favourite ❤️ or unfavourite 💔 a domain to keep track of attractive rental options.

### 🚀 Stretch goals

Optionally, if time or considered priority permits, we love to see to polishes 💅 in the code, the UI/UX, tests. Maybe even add additional features like:

- an NFT detail view
- filter by NFTs by title
- *anything you think will add value. Go nuts!*

### 🛠 Technical requirements

- Use Git to manage your source code.
- Use React & React DOM with TypeScript.
- Use our Azreal Collateralized Contracts indexer on The Graph. This dapp will provide you a `graphql` endpoint to query. You can create an account and get 1000 requests for free. Assuming you won’t do anything crazy this should suffice!
[https://thegraph.com/explorer/subgraph?id=BEkzgsGPhih7VE6aVwUL4h7EZyXJjZYn16T9PE5XCmou&view=Playground](https://thegraph.com/explorer/subgraph?id=BEkzgsGPhih7VE6aVwUL4h7EZyXJjZYn16T9PE5XCmou&view=Playground)
- Use an NFT API provider like Alchemy ([https://www.alchemy.com](https://www.alchemy.com/)) or NFTPort ([https://www.nftport.xyz](https://www.nftport.xyz/)). Again, these services offer generous free tiers.
- Use `window.localStorage` to save favourited state.
- Provide at least one test for one of the UI components.

### ✅ Acceptance criteria

- Application MUST support evergreen browsers.
- User MUST be able to browse a list of NFTs and their key properties.
- User MUST be able to favourite ❤️ and unfavourite NFTs.
- User MUST be able to revisit the application on the same device and see which domains the user has favorited.