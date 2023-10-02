import { action, makeAutoObservable } from "mobx";

export default class AppStore {
  email: String = "test";
  userId: String = "123";
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getEmail = () => {
    return this.email;
  };

  getUserId = () => {
    return this.userId;
  };
}
