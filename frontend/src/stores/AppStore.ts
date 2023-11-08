import { action, makeAutoObservable } from "mobx";
import { create, persist } from "mobx-persist";
import axios from "axios";

// const url = "http://localhost:8080";
const url = "http://ec2-54-79-97-245.ap-southeast-2.compute.amazonaws.com:8080";

class AppStore {
  @persist email: string = "";
  @persist userId: string = "";
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

  @action
  setIsLoggedIn = (value: boolean) => {
    this.isLoggedIn = value;
  };

  getEmail = () => {
    return this.email;
  };

  getUserId = () => {
    return this.userId;
  };

  getIsLoggedIn = () => {
    return this.isLoggedIn;
  };

  logout = () => {
    this.setIsLoggedIn(false);
    this.setEmail("");
    this.setUserId("");
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
  loginController = async (email: string, password: string) => {
    // checks whether email is valid:
    try {
      const response = await axios.get(
        url + "/api/v2/userbyemail?email=" + email
      );
      console.log(response.data);
      // checking if user is verified:
      if (!(response.data as any).emailVerified) {
        return {
          response: {
            data: "Email is not verified. Please check your inbox and verify your account",
            status: 400,
          },
        };
      }
    } catch (err) {
      console.log(err);
      return err;
    }

    // here checks whether password is valid
    try {
      const response = await axios.post(url + "/api/v2/user/login", {
        email: email,
        password: password,
        returnSecureToken: true,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  registerController = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        url + "/api/v2/user/create?email=" + email + "&password=" + password
      );

      console.log("User created ", response.data);
      return { data: response.data, status: 200 };
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  resetPasswordController = async (email: string) => {
    try {
      const response = await axios.post(
        url + "/api/v2/user/changepassword?email=" + email
      );
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  // To be implemented in viewPortfolioDetails
  viewStockController = async (stockSymbol: string) => {
    try {
      const response = await axios.get(
        url + "/api/stock/findstockbysymbol?symbol=" + stockSymbol
      );
      // console.log(`http://localhost:8080/api/stock/findstockbysymbol?symbol=${stockSymbol}`)
      // console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  viewPortfolioController = async (portfolioName: string, userId: string) => {
    try {
      const response = await axios.get(
        url + "/api/portfolio/" + portfolioName + "/" + userId
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  uploadPortfolioController = async (data: Object) => {
    try {
      const response = await axios.post(url + "/api/portfolio", data);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  updatePortfolioController = async (data: Object, portfolioName: String) => {
    try {
      const response = await axios.put(
        url + "/api/portfolio/edit/" + portfolioName,
        data
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getPortfolioByUserIdController = async (
    userId: String,
    portfolioName: String
  ) => {
    try {
      const response = await axios.get(
        `${url}/api/portfolio/${portfolioName}/${userId}`
      );
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  createLogController = async (data: Object) => {
    try {
      const response = await axios.post(url + "/api/log", data);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getAllLogsController = async () => {
    try {
      const response = await axios.get(url + "/api/log");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getPortfoliosController = async (userId: String) => {
    try {
      const response = await axios.get(`${url}/${userId}`);

      // portfolios array is response.data
      // iterate through portfolios array
      // for each portfolio, get allocations array using portfolio.allocations
      // iterate through allocations array
      // for each allocation, get the stockName using allocation.stockName
      // run the /gettotalmovingaverage backend api, providing stockName as symbol, creation of portfolio which is portfolio.dateTime as startDate and today date as endDate

      const portfoliosArray = response.data;
      for (const portfolio of portfoliosArray) {
        // to calculate total performance of portfolio
        let totalPerformance = 0;

        // convert the portfolio creation date and today's date into appropriate string format to call /getmovingaverage API
        const startDateObject = new Date(portfolio.dateTime);
        const dd = String(startDateObject.getDate()).padStart(2, "0");
        const mm = String(startDateObject.getMonth() + 1).padStart(2, "0");
        const yyyy = startDateObject.getFullYear();
        const startDate = `${yyyy}-${mm}-${dd}`;

        const today = new Date();
        const dd2 = String(today.getDate()).padStart(2, "0");
        const mm2 = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy2 = today.getFullYear();
        const endDate = `${yyyy2}-${mm2}-${dd2}`;

        const allocationsArray = portfolio.allocations;
        await Promise.all(
          allocationsArray.map(async (allocation) => {
            const symbol = allocation.stockName;
            const price = allocation.averagePrice;
            const percentage = allocation.percentage;

            try {
              const response2 = await axios.get(
                `${url}/api/stock/getmovingaverage?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}`
              );
              console.log("response2: ", response2);

              // get the difference from /getmovingaverage, calculate the percentage, then add it as a new field in allocation
              const difference = response2.data.difference;
              const percentageDifference = (difference / price) * 100;
              allocation.differenceVsPriorPeriod = (
                Math.round(percentageDifference * 100) / 100
              ).toFixed(2);

              totalPerformance +=
                (percentage / 100) * (percentageDifference / 100);
            } catch (err2) {
              console.log(err2);
              // if got error, set it to default 0
              allocation.differenceVsPriorPeriod = 0;
            }
          })
        );
        // add totalPerformance as a new field to every portfolio
        if (isNaN(totalPerformance)) {
          portfolio.totalPerformance = 0;
        } else {
          portfolio.totalPerformance = totalPerformance;
        }
      }

      console.log("portfoliosArray", portfoliosArray);
      return portfoliosArray;
      // return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  deletePortfolioController = async (portfolioName: String, userId: String) => {
    try {
      const response = await axios.delete(
        `${url}/api/portfolio/${portfolioName}/${userId}`
      );
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

// getStocksAnalyticsController = async (symbol: String, startDate: String, endDate: String => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8080/api/stock/getmovingaverage/?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}`
//     );
//     return response;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// }

const hydrate = create({
  storage: localStorage, // default: localStorage
  jsonify: true, // default: true
});

const store = new AppStore();

hydrate("AppStore", store).then(() => {
  console.log("AppStore has been hydrated");
});

export { AppStore, store };
