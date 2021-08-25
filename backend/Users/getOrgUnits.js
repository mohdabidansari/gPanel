require("dotenv").config();
const { google } = require("googleapis");
const gmail = google.gmail("v1");

async function main() {
  const client_email = process.env.GOOGLE_CLIENT_EMAIL;
  // add some necessary escaping so to avoid errors when parsing the private key.
  const private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  // impersonate an account with rights to create team drives
  const emailToImpersonate = "waqar.ahmad@edu.cloudware.tn";
  var jwtClient = new google.auth.JWT(
    client_email,
    null,
    private_key,
    [
      "https://apps-apis.google.com/a/feeds/policies/",
      "https://www.googleapis.com/auth/admin.directory.orgunit",
      "https://www.googleapis.com/auth/admin.directory.orgunit.readonly",
    ],
    emailToImpersonate
  );

  // Do the magic

  const service = google.admin({ version: "directory_v1", auth: jwtClient });
  const result = [];
  const res = await service.orgunits.get({
    customerId: "C03xqibs8",
    orgUnitPath: "/KiosK",
  });
  const users = res.data;

  //   if (users.length) {
  //     users.forEach((user) => {
  //       result.push(`${user.primaryEmail} ${user.name.fullName}`);
  //     });
  //   } else {
  //     console.log("No users found.");
  //   }
  // console.log(result);
  console.log(users);
  return users;

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
