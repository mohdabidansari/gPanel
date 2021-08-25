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
  const res = await service.twoStepVerification.context({
    projection: "FULL",
    userKey: "waqar@edu.cloudware.tn",
  });
  // console.log(res.data.users);
  const users = res.data;
  // console.log(!!users);

  if (!!users) {
    // console.log("Users:");
    console.log(users);
    return users;
  } else {
    console.log("No user found.");
  }
  // console.log(result);
}
