import { action, makeAutoObservable } from "mobx";
import { create, persist } from "mobx-persist";

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
