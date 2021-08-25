require("dotenv").config();
const { google } = require("googleapis");
const gmail = google.gmail("v1");

async function main(obj) {
  console.log(obj.sendAs);
  const client_email = process.env.GOOGLE_CLIENT_EMAIL;
  // add some necessary escaping so to avoid errors when parsing the private key.
  const private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  // impersonate an account with rights to create team drives
  const emailToImpersonate = obj.sendAs;
  var jwtClient = new google.auth.JWT(
    client_email,
    null,
    private_key,
    [
      "https://www.googleapis.com/auth/gmail.settings.basic",
      "https://www.googleapis.com/auth/gmail.settings.sharing",
    ],
    emailToImpersonate
  );

  // Do the magic
  try {
    const res = await gmail.users.settings.sendAs.patch({
      // User's email address. The special value "me" can be used to indicate the authenticated user.
      userId: "me",
      sendAsEmail: obj.sendAs,
      auth: jwtClient,

      requestBody: {
        signature: obj.signature,
      },
    });
    console.log("-----------------------------------------------");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return "There was an error";
  }

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
