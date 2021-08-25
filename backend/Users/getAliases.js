require("dotenv").config();
const { google } = require("googleapis");
const gmail = google.gmail("v1");

async function main(id) {
  const client_email = process.env.GOOGLE_CLIENT_EMAIL;
  // add some necessary escaping so to avoid errors when parsing the private key.
  const private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  // impersonate an account with rights to create team drives
  const emailToImpersonate = id;
  var jwtClient = new google.auth.JWT(
    client_email,
    null,
    private_key,
    [
      "https://www.googleapis.com/auth/gmail.settings.basic",
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
    emailToImpersonate
  );

  // Do the magic
  const res = await gmail.users.settings.sendAs.list({
    // User's email address. The special value "me" can be used to indicate the authenticated user.
    userId: id,
    auth: jwtClient,
  });
  console.log(res.data);
  return res.data;

  // Example response
  // {
  //   "displayName": "my_displayName",
  //   "isDefault": false,
  //   "isPrimary": false,
  //   "replyToAddress": "my_replyToAddress",
  //   "sendAsEmail": "my_sendAsEmail",
  //   "signature": "my_signature",
  //   "smtpMsa": {},
  //   "treatAsAlias": false,
  //   "verificationStatus": "my_verificationStatus"
  // }
}

module.exports = main;
