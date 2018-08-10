export class SymptomCheckerServiceClient {
  getToken(key, hashString) {
    return fetch("https://sandbox-authservice.priaid.ch/login", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + key + ":" + hashString
      }
    }).then(response => response.json());
  }

  //Get Symptoms
  getSymptoms(token) {
  return fetch("https://sandbox-healthservice.priaid.ch/symptoms?token=" + token +"&language=en-gb&format=json", {
    headers: {
      "Accept": "application/json"
    }
  }).then(response => response.json());
}

  //Get Diagnosis
  getDiagnosis(symptom, gender, birthYear, token) {
  console.log(symptom + " " + gender + " " + birthYear);
  symptom = JSON.stringify(symptom);
  return fetch("https://sandbox-healthservice.priaid.ch/diagnosis?token=" + token + "&language=en-gb&symptoms=" + "[" + symptom + "]" + "&gender=" + gender + "&year_of_birth=" + birthYear, {
    headers: {
      "Accept": "application/json"
    }
  }).then(response => response.json());
}

  //Get Description
  getDescription(id, token) {
  return fetch("https://sandbox-healthservice.priaid.ch/issues/" + id + "/info?token=" + token + "&language=en-gb&format=json", {
    headers: {
      "Accept": "application/json"
    }
  }).then(response => response.json());
}

}
