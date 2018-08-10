import qs from 'qs';

export class AppointmentServiceClient {

  getAccessToken() {
    return fetch("https://sandbox-identity.onsched.com/connect/token", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      body: qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'c.498acd04',
        client_secret: 'nQLNJuVKp6GdiWrHHWlT',
        scope: 'OnSchedApi'
      })
    }).then(response => response.json());
  }

  getServices(accessToken) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/services", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    });
  }

  getResources(accessToken) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/resources", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    });
  }

  createAppointment(accessToken, startDateTime, endDateTime) {
    var data = {
      "serviceId": "2150",
      "startDateTime": startDateTime,
      "endDateTime": endDateTime,
      "resourceId": "5032"
    };
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if(response.status == 200) {
        return response.json();
      }
      else {
        return null;
      }
    });
  }

  confirmAppointment(accessToken, id, fullName, firstName, lastName, email, phone) {
    console.log(fullName + " " +email + " " + phone);
    var data = {
      "email": email,
      "name": fullName,
      "phone": phone,
      "customFields": {
        "customField1": firstName,
        "customField2": lastName,
        "customField3": email,
        "customField4": phone
      }
    };
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments/" + id + "/book", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
      body: JSON.stringify(data)
    }).then(response => response.json());
  }

  getCustomFields(accessToken) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments/customfields", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
      }
    })
  }

  getAPI(access_token) {
    console.log(access_token);
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments?status=RS", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access_token
      }
    }).then(response => response.json());
  }

  checkAvailability(accessToken) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/availability/2150/2018-08-09/2018-08-10?resourceId=5032", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    });
  }

  //Reschedule an appointment
  rescheduleAppointment(id, accessToken) {
  // console.log(id + " " +  accessToken);
  return fetch("https://sandbox-api.onsched.com/consumer/v1/availability/" + id + "/reschedule", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken
    }
  }).then(response => response.json());
}

  //Confirm Reschedule
  confirmReschedule(accessToken, id, startDateTime, endDateTime) {
  var data = {
    "serviceId": "2150",
    "startDateTime": startDateTime,
    "endDateTime": endDateTime,
    "resourceId": "5032"
  };
  return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments/" + id + "/reschedule", {
    method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
      body: JSON.stringify(data)
  }).then(response => response.json());
}

  //For appointments in BK, RS status
  cancelAppointment(id, accessToken) {
    console.log(id);
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments/" + id + "/cancel", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    });
  }

  //For appointments in IN status
  deleteAppointment(id, accessToken) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments/" + id, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }).then(response => response.json());
  }

  getInitialAppointments(accessToken) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments?status=IN", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }).then(response => response.json());
  }

  getConfirmedAppointments(accessToken) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments?status=BK", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }).then(response => response.json());
  }

  getAppointment(accessToken, appointmentId) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments/" + appointmentId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }).then(response => response.json());
  }

  getAppointments(accessToken) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }).then(response => response.json());
  }

  getAppointmentsForTechnician(accessToken) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/appointments?resourceId=5032&status=BK", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }).then(response => response.json());
  }

  getCustomers(accessToken) {
    return fetch("https://sandbox-api.onsched.com/consumer/v1/customers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    }).then(response => response.json());
  }
}
