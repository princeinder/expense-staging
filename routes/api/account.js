const express = require("express");
const plaid = require("plaid");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");

const Account = require("../../models/account");
const makeRandomNumber = require("../../utils/helper");

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;

const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments.sandbox,
  { version: "2018-05-22" }
);

router.post(
  "/acctype/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.getAccountType(req.body.acctype);
    result.then((doc) => {
      if (doc)
        return res.status(404).json({ accType: "Account type exists already" });
      const result = account.createAccountType(req.body.acctype);
      result
        .then((data) => {
          res.json(data);
        })
        .catch((err) => res.status(404).json({ err }));
    });
  }
);

router.delete(
  "/acctype/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.deleteAccountType(req.params.id);
    result
      .then((data) => {
        if (data) res.json({ message: "Account deleted successfully" });
      })
      .catch((err) => res.status(404).json({ err }));
  }
);

router.get(
  "/acctypes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.getAccountTypes();
    result
      .then((doc) => {
        if (doc) return res.json(doc);
      })
      .catch((err) => res.status(404).json({ err }));
  }
);

router.post(
  "/acccategory/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.getAccountCategory(req.body.acccategory);
    result.then((doc) => {
      if (doc)
        return res
          .status(404)
          .json({ accCategory: "Account category exists already" });
      const result = account.addAccountCategory(req.body);
      result
        .then((data) => {
          res.json(data);
        })
        .catch((err) => res.status(404).json({ err }));
    });
  }
);

router.get(
  "/acccategories",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.getAccountCategories();
    result
      .then((doc) => {
        if (doc) res.json(doc);
      })
      .catch((err) => res.status(404).json({ err }));
  }
);

router.get(
  "/acccategories/:typeid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params.typeid);
    const account = Account.getAccountInstance();
    const result = account.getAccountCategoriesByName(req.params.typeid);
    result
      .then((doc) => {
        if (doc) res.json(doc);
      })
      .catch((err) => res.status(404).json({ err }));
  }
);

router.post(
  "/accsubcategory/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.getAccountSubCategory(req.body.accsubcategory);
    result.then((doc) => {
      console.log(doc);
      if (doc)
        return res
          .status(404)
          .json({ accSubCategory: "Account category exists already" });
      const result = account.addAccountSubCategories(req.body, req.user.id);
      result
        .then((cat) => {
          res.json({ message: "Sub category added successfully", data: cat });
        })
        .catch((err) => res.status(404).json({ err }));
    });
  }
);

router.get(
  "/accsubcategories",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.getAccountSubCategories();
    result
      .then((doc) => {
        console.log(doc);
        if (doc) res.json(doc);
      })
      .catch((err) => res.status(404).json({ err }));
  }
);

router.get(
  "/accsubcategories/:catid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.getAccountSubCategoriesByName(
      req.params.catid,
      req.user.id
    );
    result
      .then((doc) => {
        if (doc) res.json(doc);
      })
      .catch((err) => res.status(404).json({ err }));
  }
);

// router.get(
//   "/acctransactions",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const account = Account.getAccountInstance();
//     const result = account.getAccountTransactions();
//     result
//       .then((doc) => {
//         if (doc) res.json(doc);
//       })
//       .catch((err) => res.status(404).json({ err }));
//   }
// );

router.post(
  "/acctransaction/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    req.body.user_id = req.user.id;
    const rand = makeRandomNumber(9);
    req.body.journal_number = rand;
    console.log(req.body);
    const result = account.getAccountTransaction(req.body.description);
    result.then((doc) => {
      if (doc)
        return res
          .status(404)
          .json({ accTransaction: "Account transaction  exists already" });
      const result = account.addAccountTransaction(req.body);
      result
        .then((data) => {
          res.json({ accTransaction: "Transaction added successfully" });
        })
        .catch((err) => res.status(404).json({ err }));
    });
  }
);

router.put(
  "/acctransaction/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.updateAccountTransaction(req.params.id, req.body);
    result
      .then((id) => {
        if (id)
          return res.json({
            // data: id,
            accTransaction: "Transaction Updated Successfully",
          });
      })
      .catch((err) => res.status(401).json(err));
  }
);
router.delete(
  "/acctransaction/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const account = Account.getAccountInstance();
    const result = account.deleteAccountTransaction(req.params.id);
    result
      .then((id) => {
        if (id)
          return res.json({
            data: id,
            message: { accTransaction: "Transaction Deleted Successfully" },
          });
      })
      .catch((err) => res.status(401).json(err));
  }
);

router.get(
  "/acctransactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const now = moment();
    const today = now.format("YYYY-MM-DD");
    const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");
    const account = Account.getAccountInstance();
    transactions = [];
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
          const result = account.getAccountTransactions(req.user.id);
          result.then((acc) => {
            var transactions = acc.concat(data.transactions);
            res.json(transactions);
          });
        })
        .catch((err) => {
          res.json(err);
        });
    });
  }
);
module.exports = router;
