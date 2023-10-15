import { action, makeAutoObservable } from "mobx";
import { create, persist } from "mobx-persist";
import axios from "axios";

class AppStore {
  @persist email: string = "test";
  @persist userId: string = "123";
  isLoading: boolean = false;
  @persist isLoggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setEmail = (value: string) => {
    this.email = value;
  };

  @action
  setUserId = (value: string) => {
    this.userId = value;
  };

  getEmail = () => {
    return this.email;
  };

  getUserId = () => {
    return this.userId;
  };

  //   loginController = (email: string, password: string) => {
  //     try{
  //         const response = await axios.post(
  //             "http://localhost:8080/api/v2/userbyemail?email="+email
  //         )

  //     }
  //     // axios
  //     //   .post("http://localhost:8080/api/v2/userbyemail", {
  //     //     email: email,
  //     //   })
  //     //   .then((res) => {
  //     //     console.log(res);
  //     //   });
  //   };

  registerController = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v2/user/create?email=" +
          email +
          "&password=" +
          password
      );
      console.log("User created ", response.data);
    } catch (err) {
      console.log(err);
    }
  };
}

const hydrate = create({
  storage: localStorage, // default: localStorage
  jsonify: true, // default: true
});

const store = new AppStore();

hydrate("AppStore", store).then(() => {
  console.log("AppStore has been hydrated");
});

export { AppStore, store };
