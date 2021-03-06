export class UserServiceClient {
  //heroku_url "https://student-enrollment-backend.herokuapp.com";
  //projectHerokuUrl "https://lotus-lab-backend.herokuapp.com/";
  //local_url "http://localhost:4000";

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch("https://lotus-lab-backend.herokuapp.com/api/user", {
      body: JSON.stringify(user),
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    });
  }

  createUserByAdmin(username, password, firstName, lastName, email, address, role) {
    const user = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      role: role
    };
    return fetch("https://lotus-lab-backend.herokuapp.com/api/user/admin", {
      body: JSON.stringify(user),
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }

  profile() {
    return fetch("https://lotus-lab-backend.herokuapp.com/api/profile",{
      credentials: "include",
    }).then(response => response.json());
  }

  findUserById(userId) {
    console.log("inside user.service.client.ts" + " " +userId);
    return fetch("https://lotus-lab-backend.herokuapp.com/api/user/" + userId).then(response => response.json());
  }

  updateUser(user) {
    return fetch("https://lotus-lab-backend.herokuapp.com/api/profile", {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }

  findAllUsers() {
    return fetch("https://lotus-lab-backend.herokuapp.com/api/user", {
      credentials: "include"
    }).then(response => response.json());
  }

  removeUser(id) {
    return fetch("https://lotus-lab-backend.herokuapp.com/api/delete/" + id, {
      method: "DELETE"
    })
    .then(response => console.log(response.json()));
  }

  logout() {
    return fetch("https://lotus-lab-backend.herokuapp.com/api/logout", {
      method: "POST",
      credentials: "include"
    });
  }

  findUserByEmail(emailId) {
    return fetch("https://lotus-lab-backend.herokuapp.com/api/forgotPassword/" + emailId)
    .then(response => response.json());
  }

  login(username, password) {
    var credentials = {username, password};
    return fetch("https://lotus-lab-backend.herokuapp.com/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }
}
