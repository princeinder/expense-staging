const express = require("express");
const plaid = require("plaid");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");

const Account = require("../../models/account");

const PLAID_CLIENT_ID = "5ede91ea354a87001296bada";
const PLAID_SECRET = "021655060bb03754ff6d8a36450e7f";
const PLAID_PUBLIC_KEY = "1081d0c03138252152adc52608d250";

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments.sandbox,
  { version: "2018-05-22" }
);

var PUBLIC_TOKEN = null;
var ACCESS_TOKEN = null;
var ITEM_ID = null;

// @route GET api/plaid/accounts
// @desc Get all accounts linked with plaid for a specific user
// @access Private
router.get(
  "/items",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.getUserAccounts(req.user.id);
    result
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

router.get(
  "/accounts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const account = Account.getAccountInstance();
    // const result = account.getUserAccounts(req.user.id);
    // result
    //   .then((data) => {
    //     accounts = [];
    //     var len = data.length;
    //     data.forEach(function (item, index) {
    client
      .getAccounts("access-sandbox-d9d3d0ae-2634-492f-a2de-98799e178e7f")
      .then((data) => {
        // console.log(data.accounts);
        // accounts.push(data.accounts);
        // if (accounts.length == len) {
        console.log(data.accounts);
        res.json(data.accounts);
        // }
      })
      .catch((err) => {
        res.json(err);
      });
  }
);
// })
// .catch((err) => {
//   res.json(err);
// });
//}
//);

router.post(
  "/accounts/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PUBLIC_TOKEN = req.body.public_token;
    const userId = req.user.id;
    const institution = req.body.metadata.institution;
    const { name, institution_id } = institution;
    if (PUBLIC_TOKEN) {
      client
        .exchangePublicToken(PUBLIC_TOKEN)
        .then((exchangeResponse) => {
          ACCESS_TOKEN = exchangeResponse.access_token;
          ITEM_ID = exchangeResponse.item_id;
          const newAccount = {
            userId: userId,
            accessToken: ACCESS_TOKEN,
            itemId: ITEM_ID,
            institutionId: institution_id,
            institutionName: name,
          };

          const account = Account.getAccountInstance();
          const result = account.createUserAccounts(newAccount);
          result
            .then((account) => {
              res.json(account);
            })
            .catch((err) => {
              res.json(err);
            });
        })
        .catch((err) => console.log(err)); // Plaid Error
    }
  }
);

router.delete(
  "/accounts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.findById(req.params.id).then((account) => {
      // Delete account
      account.remove().then(() => res.json({ success: true }));
    });
  }
);

// @route POST api/plaid/accounts/transactions
// @desc Fetch transactions from past 30 days from all linked accounts
// @access Private
router.get(
  "/accounts/transactions/:accessToken",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const now = moment();
    const today = now.format("YYYY-MM-DD");
    const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");
    const account = Account.getAccountInstance();
    const result = account.getUserAccounts(req.user.id);
    result.then((items) => {
      var items = items;
      client
        .getTransactions(
          "access-sandbox-d9d3d0ae-2634-492f-a2de-98799e178e7f",
          thirtyDaysAgo,
          today
        )
        .then((data) => {
          res.json(data.transactions);
        })
        .catch((err) => {
          res.json(err);
        });
    });
  }
);

module.exports = router;
