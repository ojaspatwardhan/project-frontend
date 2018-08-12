export class UserServiceClient {
  //heroku_url "https://student-enrollment-backend.herokuapp.com";
  //projectHerokuUrl "https://lotus-lab-backend.herokuapp.com/";
  //local_url "http://localhost:4000";

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch("http://localhost:4000/api/user", {
      body: JSON.stringify(user),
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    });
  }

  profile() {
    return fetch("http://localhost:4000/api/profile",{
      credentials: "include",
    }).then(response => response.json());
  }

  findUserById(userId) {
    console.log("inside user.service.client.ts" + " " +userId);
    return fetch("http://localhost:4000/api/user/" + userId).then(response => response.json());
  }

  updateUser(user) {
    return fetch("http://localhost:4000/api/profile", {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }

  findAllUsers() {
    return fetch("http://localhost:4000/api/user", {
      credentials: "include"
    }).then(response => response.json());
  }

  removeUser(id) {
    return fetch("http://localhost:4000/api/delete/" + id, {
      method: "DELETE"
    })
    .then(response => console.log(response.json()));
  }

  logout() {
    return fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include"
    });
  }

  findUserByEmail(emailId) {
    return fetch("http://localhost:4000/api/forgotPassword/" + emailId)
    .then(response => response.json());
  }

  login(username, password) {
    var credentials = {username, password};
    return fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }
}
