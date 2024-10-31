const express = require('express');
const router = express.Router();
const axios = require('axios');
const Token = require('../../models/Token');
const checkImg = require('../../utils/check');
const TokenUtils = require('../../utils/tokens');

router.get('/', async (req, res) => {
  try {
    // Fetch token data from MongoDB
    const existingTokens = await Token.find({});
    const existingTokenMap = new Map(
      existingTokens.map((token) => [token.id.toLowerCase(), token])
    );

    // Fetch token data from external APIs
    const response = await axios.get(
      'https://swap-api.thetatoken.org/swap/top-tokens'
    );
    const fetchedTokens = response.data.body.tokens;
    const data = await axios.get(
      'https://assets.thetatoken.org/wallet-metadata/v1/data.json'
    );

    // Iterate through each fetched token
    const tokens = await Promise.all(
      fetchedTokens.map(async (obj) => {
        const lowerCaseId = obj.id.toLowerCase();
        if (existingTokenMap.has(lowerCaseId)) {
          return existingTokenMap.get(lowerCaseId); // Return existing token
        }

        const tokenData =
          data.data.mainnet.tokens[
            Object.keys(data.data.mainnet.tokens).find(
              (id) => id.toLowerCase() === lowerCaseId
            )
          ];

        let logo;
        if (tokenData) {
          logo = `https://assets.thetatoken.org/tokens/${tokenData.logo}`;
        } else {
          const imgExist = await checkImg(obj.symbol.toLowerCase()); // Ensure checkImg is asynchronous if needed
          logo = imgExist
            ? `https://assets.thetatoken.org/tokens/${TokenUtils.removeW(
                obj.symbol
              ).toLowerCase()}.png`
            : TokenUtils.svg2img();
        }

        const token = {
          id: obj.id,
          name: obj.name,
          symbol: obj.symbol,
          derivedETH: obj.derivedETH,
          tradeVolume: obj.tradeVolume,
          tradeVolumeETH: obj.tradeVolumeETH,
          untrackedVolumeETH: obj.untrackedVolumeETH,
          totalLiquidity: obj.totalLiquidity,
          txCount: obj.txCount,
          volume24HrsETH: obj.volume24HrsETH,
          volume24HrsUSD: obj.volume24HrsUSD,
          tradeVolumeUSD: obj.tradeVolumeUSD,
          totalLiquidityUSD: obj.totalLiquidityUSD,
          derivedUSD: obj.derivedUSD,
          logo: logo,
          start_date: obj.start_date,
          date: obj.date
        };

        // Save the new token to the database
        const savedToken = await new Token(token).save();

        return savedToken;
      })
    );

    res.json({ tokens: tokens, success: 'ok' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error' + err.message);
  }
});


router.get('/:id', async (req, res) => {
  try {
    // Extract the token pair ID from the request parameters
    const { id } = req.params;

    // Fetch token data from external APIs
    const response = await axios.get(
      `https://explorer-api.thetatoken.org/api/tokenSummary/${id}`
    );

    const tokenInfo = response.data.body;

    // If the token exists, return it in the response
    res.json({ tokenInfo, success: 'ok' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error' + err.message);
  }
});

module.exports = router;
