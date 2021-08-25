// User id -> 100453271586559314848  //Adel
// User id -> 116001923555572855863  //Waqar

// require("dotenv").config();
// const { google } = require("googleapis");

// async function main() {
//   const client_email = process.env.GOOGLE_CLIENT_EMAIL;
//   // add some necessary escaping so to avoid errors when parsing the private key.
//   const private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
//   // impersonate an account with rights to create team drives
//   const emailToImpersonate = "waqar.ahmad@edu.cloudware.tn";

//   var jwtClient = new google.auth.JWT(
//     client_email,
//     null,
//     private_key,
//     [
//       "https://www.googleapis.com/auth/admin.directory.user",
//       "https://www.googleapis.com/auth/admin.directory.user.readonly",
//     ],
//     emailToImpersonate
//   );

//   listUserById(jwtClient, "116001923555572855863");
// }

// function listUserById(auth, userId) {
//   const service = google.admin({ version: "directory_v1", auth });
//   service.users.get(
//     {
//       userKey: userId,
//     },
//     (err, res) => {
//       if (err) return console.error("The API returned an error:", err.message);
//       console.log(res.data);
//     }
//   );
// }

// main().catch((e) => {
//   console.error(e);
//   throw e;
// });

require("dotenv").config();
const { google } = require("googleapis");
const gmail = google.gmail("v1");

const client_email = process.env.GOOGLE_CLIENT_EMAIL;
// add some necessary escaping so to avoid errors when parsing the private key.
const private_key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
// impersonate an account with rights to create team drives
const emailToImpersonate = "waqar.ahmad@edu.cloudware.tn";
async function main(id) {
  var jwtClient = new google.auth.JWT(
    client_email,
    null,
    private_key,
    [
      "https://www.googleapis.com/auth/admin.directory.user",
      "https://www.googleapis.com/auth/admin.directory.user.readonly",
    ],
    emailToImpersonate
  );

  const service = google.admin({ version: "directory_v1", auth: jwtClient });
  const res = await service.users.get({
    projection: "Full",
    userKey: id,
  });
  // console.log(res.data.users);
  const users = res.data;
  // console.log(!!users);

  if (!!users) {
    // console.log("Users:");
    // console.log(users);

    return users;
  } else {
    console.log("No user found.");
  }
  // console.log(result);
}

async function listUsers(auth) {
  (err, res) => {
    if (err) return console.error("The API returned an error:", err.message);
    // console.log(res.data.users);

    if (users.length) {
      // console.log("Users:");
      users.forEach((user) => {
        // console.log(`${user.primaryEmail} ${user.name.fullName}`);
        result.push(`${user.primaryEmail} ${user.name.fullName}`);
      });
    } else {
      console.log("No users found.");
    }
    console.log(result);
  };
  // console.log(result);
  return result;
}

// main().catch((e) => {
//   console.error(e);
//   throw e;
// });

module.exports = main;
