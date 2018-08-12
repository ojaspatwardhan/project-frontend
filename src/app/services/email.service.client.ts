export class EmailServiceClient {

  //Heroku URL = https://lotus-lab-backend.herokuapp.com/
  //Local URL = http://localhost:4000/
  sendForgotPasswordEmail(emailId, password) {
    console.log(emailId + " " + password)
    return fetch("https://lotus-lab-backend.herokuapp.com/api/email/" + emailId + "/" + password);
  }

  sendQueryEmail(emailId, queryText) {
    console.log(emailId + " " + queryText);
    return fetch("https://lotus-lab-backend.herokuapp.com/api/queryEmail/" + emailId + "/" + queryText).then(response => response.json());
  }
}
