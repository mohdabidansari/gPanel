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
    ["https://www.googleapis.com/auth/admin.directory.user"],
    emailToImpersonate
  );

  const service = google.admin({ version: "directory_v1", auth: jwtClient });
  const result = [];
  const res = await service.users.list({
    customer: "my_customer",
  });
  const users = res.data.users;

  if (users.length) {
    users.forEach((user) => {
      result.push(`${user.primaryEmail} ${user.name.fullName}`);
    });
  } else {
    console.log("No users found.");
  }
  // console.log(result);
  console.log(users[0]);
  return users;
}

// main().catch((e) => {
//   console.error(e);
//   throw e;
// });

module.exports = main;
