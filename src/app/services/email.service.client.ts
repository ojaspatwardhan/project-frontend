export class EmailServiceClient {
  sendForgotPasswordEmail(emailId, password) {
    console.log(emailId + " " + password)
    return fetch("http://localhost:4000/api/email/" + emailId + "/" + password);
  }
}
