// var { google } = require("googleapis");
// var fs = require("fs");
// require("dotenv").config();

// function initializeDrive(version = "v3") {
//   const client_email = process.env.GOOGLE_CLIENT_EMAIL;
//   // add some necessary escaping so to avoid errors when parsing the private key.
//   const private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
//   // impersonate an account with rights to create team drives
//   const emailToImpersonate = "waqar@edu.cloudware.tn";
//   const jwtClient = new google.auth.JWT(
//     client_email,
//     null,
//     private_key,
//     ["https://www.googleapis.com/auth/drive"],
//     emailToImpersonate
//   );

//   return google.gmail({
//     version: version,
//     auth: jwtClient,
//   });
// }
// async function main() {
//   const drive = initializeDrive("v3");
//   //   drive.files.delete()
//   const res = await drive.files.create({
//     requestBody: {
//       name: "testimage.png",
//       mimeType: "image/png",
//     },
//     media: {
//       mimeType: "image/png",
//       body: fs.createReadStream("awesome.png"),
//     },
//   });
//   console.log(res.data);
// }
// // const listTeamDrives = async ({ pageToken = "" } = {}) => {
// //   const drive = initializeDrive("v3");
// //   return new Promise((resolve, reject) => {
// //     drive.teamdrives.list(
// //       {
// //         pageSize: 100,
// //         ...(pageToken ? { pageToken } : {}),
// //       },
// //       function (err, { data: { nextPageToken = "", teamDrives = [] } = {} }) {
// //         if (err) {
// //           return reject(err);
// //         }
// //         if (!nextPageToken) {
// //           return resolve(teamDrives);
// //         }
// //         // if page token is present we'll recursively call ourselves until
// //         // we have a complete team drive list.
// //         return listTeamDrives({ pageToken: nextPageToken }).then(
// //           (otherTeamDrives) => {
// //             resolve(teamDrives.concat(otherTeamDrives));
// //           }
// //         );
// //       }
// //     );
// //   });
// // };

// // an example of how the listTeamDrives() function would be called
// // const main = async () => {
// //   try {
// //     teamDriveFolders = await listTeamDrives();
// //     console.log({ teamDriveFolders });
// //   } catch (e) {
// //     console.error("Failed to list folders", e);
// //   }
// // };

// // main();

// var gmail = google.gmail("v1");

// function gmailService() {
//   const gmail = initializeDrive("v1");
//   gmail.users.settings.sendAs.update(
//     {
//       userId: "me",
//       auth: gmail.auth,
//       sendAsEmail: "some_email@somewhere.com",
//       fields: "signature",
//       resource: {
//         signature: '<div dir="ltr">Hello there</div>',
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
// }

// gmailService();

const { google } = require("googleapis");
const gmail = google.gmail("v1");
require("dotenv").config();

async function main() {
  const client_email = process.env.GOOGLE_CLIENT_EMAIL;
  // add some necessary escaping so to avoid errors when parsing the private key.
  const private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  // impersonate an account with rights to create team drives
  const emailToImpersonate = "waqar@edu.cloudware.tn";

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
  const res = await gmail.users.settings.sendAs.get({
    // The send-as alias to be retrieved.
    sendAsEmail: "waqar.ahmad@edu.cloudware.tn",
    auth: jwtClient,
    // User's email address. The special value "me" can be used to indicate the authenticated user.
    userId: "me",
  });
  console.log(res.data);

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

main().catch((e) => {
  console.error(e);
  throw e;
});
