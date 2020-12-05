const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};


const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

const login = (request, response) => {
  const req = request;
  const res = response;

  // cast to string
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password ' });
    }
    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/map ' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/map' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const passwordChange = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const newPass = `${req.body.newPass}`;

  if (!req.body.username || !req.body.pass || !req.body.newPass) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.generateHash(newPass, (salt, hash) => {
    const newPasswordHash = {
      salt,
      password: hash,
    };

    Account.AccountModel.authenticate(username, pass, (err, account) => {  //authenticate the user
      if(err || !account){
        return res.status(401).json({ error: 'Wrong Username or Password' });
      }

     

    //if authenticated just search via username
     Account.AccountModel.findOneAndUpdate({ username: username }, { password: newPass }, { returnNewDocument: true })
      .then((updatedDocument) => {
        if (updatedDocument) {
          console.log(`Successfully updated password! new password info: ${updatedDocument}`);
          Account.AccountModel.toAPI(updatedDocument);
          return res.json({ redirect: '/login' });
        } else {
          console.log('No account with such username/password');
          return res.status(404).json({ error: 'No Account Found' });
        }
      })

      .catch((err) => {
        console.log(`Failed to find and update Document: ${err}`);
        return res.status(400).json({ error: 'An error occurred' });
      });
    });
  });
};


module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.changePass = passwordChange;
module.exports.getToken = getToken;
