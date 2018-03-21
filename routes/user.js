var express = require("express");
var router = express.Router();
var csrf = require("csurf");
var passport = require("passport");

var Order = require("../models/order");
var Cart = require("../models/cart");
var Wishlist = require("../models/wishlist");

var csrfProtection = csrf();
router.use(csrfProtection);

router.get("/profile", isLoggedIn, function(req, res, next) {
  var wishlist = [];
  Wishlist.find({ user: req.user }, function(err, list) {
    if (err) {
      return res.write("Error!");
    }
    console.log(list);
    wishlist.push(list);
  });
  console.log(wishlist);
  Order.find({ user: req.user }, function(err, orders) {
    if (err) {
      return res.write("Error!");
    }
    var cart;
    orders.forEach(function(order) {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    // res.render("user/profile", {
    //   orders: orders,
    //   user: req.user,
    //   wishlist: wishlist
    // });
  });
});

router.get("/logout", isLoggedIn, function(req, res, next) {
  req.logout();
  res.redirect("/");
});

router.use("/", notLoggedIn, function(req, res, next) {
  next();
});

router.get("/signup", function(req, res, next) {
  var messages = req.flash("error");
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    failureRedirect: "/user/signup",
    failureFlash: true
  }),
  function(req, res, next) {
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect("/user/profile");
    }
  }
);

router.get("/signin", function(req, res, next) {
  var messages = req.flash("error");
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post(
  "/signin",
  passport.authenticate("local.signin", {
    failureRedirect: "/user/signin",
    failureFlash: true
  }),
  function(req, res, next) {
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect("/user/profile");
    }
  }
);

// Facebook oAuth routes
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/user/signin" }),
  function(req, res) {
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect("/user/profile");
    }
  }
);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
