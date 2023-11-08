package g1t1.backend.user;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

import g1t1.backend.user.UserException.CannotCreateUserException;
import g1t1.backend.user.UserException.CannotLoginException;
import g1t1.backend.user.UserException.CannotUpdateUserDetailsException;

@RestController
@RequestMapping(path="api/v2")
@CrossOrigin(origins = "https://fin-bros.vercel.app/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    /**
     * Description of the method: invoke userService getUser() method to retrieve all user data using uid
     *
     * @param uid userId of user to retrieve
     * @return return userRecord which is all the user data as an object
     */
    @GetMapping("/user")
    public UserRecord getUser(@RequestParam String uid) {
        return userService.getUser(uid);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody FirebaseLogin firebaseLogin ){
        
        try{
            return userService.loginUser(firebaseLogin);
        }

        catch(CannotLoginException e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());

        }
        catch(Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has occurred");
        }
    }



    /**
     * Description of the method: invoke userService getUserByEmail() method to retrieve all user data using the user's email
     *
     * @param email email of user to retrieve
     * @return return userRecord which is all the user data as an object
     */
    @GetMapping("/userbyemail")
    // @CrossOrigin(origins = "http://localhost:5173")
    public UserRecord getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }


    /**
     * Description of the method: invoke userService createUser() method to create user using email and password
     *
     * @param email email of user to create
     * @param password password of user to create
     * @return return userRecord which is all the user data as an object
     */
    @PostMapping("/user/create")
    // @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> createUser(@RequestParam String email, @RequestParam String password) {
        try{
            UserRecord userRecord = userService.createUser(email, password);
            return new ResponseEntity<UserRecord> (userRecord,HttpStatus.OK);
        }
        catch(CannotCreateUserException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has occurred");
        }
        
    }


    /**
     * Description of the method: edit user's email using user uid to change user's email
     *
    //  * @param uid uid of user to edit
    //  * @param email email of user to edit
    //  * @return return userRecord which is all the updated user data as an object
    //  */
    // @PutMapping("/user/changeemail")
    // public ResponseEntity<?> editUser(@RequestParam String uid, @RequestParam String email) {
    //     try{
    //         UserRecord userRecord = userService.editUserEmail(uid, email);
    //         return new ResponseEntity<UserRecord> (userRecord,HttpStatus.OK);


    //     }
    //     catch(CannotUpdateUserDetailsException e){
    //         return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    //     }
// 
    // }


    /**
     * Description of the method: send user a reset password email link using user uid to change user's password
     *
     * @param uid uid of user to edit
     */
    @PostMapping("/user/changepassword")
    // @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> changePassword(@RequestParam String email) {
        try{
            UserRecord userRecord = userService.editUserChangePassword(email);
            return new ResponseEntity<UserRecord> (userRecord,HttpStatus.OK);
        }
        catch(CannotUpdateUserDetailsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has occurred");
        }
    }


    /**
     * Description of the method: to invoke userService deleteUser() method to delete user details using uid
     *
     * @param uid uid of user to edit
     * @return do not return anything
     */
    @DeleteMapping("/user/delete")
    public ResponseEntity<String> deleteUser(@RequestParam String uid) {
        return userService.deleteUser(uid);
    }

}

