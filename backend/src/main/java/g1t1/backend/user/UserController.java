// package g1t1.backend.user;

// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.google.firebase.auth.UserRecord;

// @RestController
// @RequestMapping(path="api/v2")
// public class UserController {

//     private final UserService userService;

//     public UserController(UserService userService) {
//         this.userService = userService;
//     }
    
//     /**
//      * Description of the method: invoke userService getUser() method to retrieve all user data using uid
//      *
//      * @param uid userId of user to retrieve
//      * @return return userRecord which is all the user data as an object
//      */
//     @GetMapping("/user")
//     public UserRecord getUser(@RequestParam String uid) {
//         return userService.getUser(uid);
//     }


//     /**
//      * Description of the method: invoke userService createUser() method to create user using email and password
//      *
//      * @param email email of user to create
//      * @param password password of user to create
//      * @return return userRecord which is all the user data as an object
//      */
//     @PostMapping("/user/create")
//     public UserRecord createUser(@RequestParam String email, @RequestParam String password) {
//         return userService.createUser(email, password);
//     }


//     /**
//      * Description of the method: edit user's email using user uid to change user's email
//      *
//      * @param uid uid of user to edit
//      * @param email email of user to edit
//      * @return return userRecord which is all the updated user data as an object
//      */
//     @PutMapping("/user/changeemail")
//     public UserRecord editUser(@RequestParam String uid, @RequestParam String email) {
//         return userService.editUserEmail(uid, email);
//     }


//     /**
//      * Description of the method: send user a reset password email link using user uid to change user's password
//      *
//      * @param uid uid of user to edit
//      */
//     @PostMapping("/user/changepassword")
//     public void changePassword(@RequestParam String uid) {
//         userService.editUserChangePassword(uid);
//     }


//     /**
//      * Description of the method: to invoke userService deleteUser() method to delete user details using uid
//      *
//      * @param uid uid of user to edit
//      * @return do not return anything
//      */
//     @DeleteMapping("/user/delete")
//     public void deleteUser(@RequestParam String uid) {
//         userService.deleteUser(uid);
//     }

// }

