// UPDATE SIGNATURE

// const { google } = require("googleapis");
// const gmail = google.gmail("v1");
// require("dotenv").config();

// const client_email = process.env.GOOGLE_CLIENT_EMAIL;
// // add some necessary escaping so to avoid errors when parsing the private key.
// const private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
// // impersonate an account with rights to create team drives
// const emailToImpersonate = "waqar@edu.cloudware.tn";

// var jwtClient = new google.auth.JWT(
//   client_email,
//   null,
//   private_key,
//   [
//     "https://mail.google.com",
//     "https://www.googleapis.com/auth/gmail.settings.basic",
//     "https://www.googleapis.com/auth/gmail.settings.sharing",
//   ],
//   emailToImpersonate
// );

// jwtClient.authorize(function (err, tokens) {
//   if (err) {
//     console.log("Auth failed because: " + err);
//     return;
//   }
//   console.log(tokens);

//   gmail.users.settings.sendAs.update(
//     {
//       sendAsEmail: "waqar.ahmad@edu.cloudware.tn",
//       userId: "me",
//       auth: jwtClient,
//       fields: "signature",
//       resource: {
//         signature: '<div dir="ltr">This is signature</div>',
//       },
//     },

//     function (err, resp) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(resp);
//       }
//     }
//   );
// });

// CREATE SIGNATURE

// require("dotenv").config();
// const { google } = require("googleapis");
// const gmail = google.gmail("v1");

// async function main() {
//   const client_email = process.env.GOOGLE_CLIENT_EMAIL;
//   // add some necessary escaping so to avoid errors when parsing the private key.
//   const private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
//   // impersonate an account with rights to create team drives
//   const emailToImpersonate = "waqar@edu.cloudware.tn";

//   var jwtClient = new google.auth.JWT(
//     client_email,
//     null,
//     private_key,
//     ["https://www.googleapis.com/auth/gmail.settings.sharing"],
//     emailToImpersonate
//   );

//   // Do the magic
//   const res = await gmail.users.settings.sendAs.create({
//     // User's email address. The special value "me" can be used to indicate the authenticated user.
//     sendAsEmail: "waqar@edu.cloudware.tn",
//     userId: "me",
//     auth: jwtClient,
//     signature: "<div><div>Thanls</div><div>Team Cloudfort</div></div>",

//     // Request body metadata
//     // requestBody: {
//     //   //   request body parameters
//     //     {
//     //   // "displayName": "my_displayName",
//     //   sendAsEmail: "waqar.ahmad@edu.cloudware.tn",
//     //   signature: "<div><div>Thanls</div><div>Team Cloudfort</div></div>",
//     //     }
//     // },
//   });
//   console.log(res.data);

//   // Example response
//   // {
//   //   "displayName": "my_displayName",
//   //   "isDefault": false,
//   //   "isPrimary": false,
//   //   "replyToAddress": "my_replyToAddress",
//   //   "sendAsEmail": "my_sendAsEmail",
//   //   "signature": "my_signature",
//   //   "smtpMsa": {},
//   //   "treatAsAlias": false,
//   //   "verificationStatus": "my_verificationStatus"
//   // }
// }

// main().catch((e) => {
//   console.error(e);
//   throw e;
// });

// LIST

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
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.settings.basic",
    ],
    emailToImpersonate
  );

  // Do the magic
  const res = await gmail.users.settings.sendAs.create({
    // User's email address. The special value "me" can be used to indicate the authenticated user.
    userId: "me",
    auth: jwtClient,
    signature: "<div><div>Thanks</div><div>Team CLOUDFORT</div></div>",
  });
  console.log(res.data);
}

main().catch((e) => {
  console.error(e);
  throw e;
});
