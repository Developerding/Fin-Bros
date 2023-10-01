// package g1t1.backend.user;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.web.bind.annotation.RequestParam;

// import com.google.firebase.auth.FirebaseAuth;
// import com.google.firebase.auth.FirebaseAuthException;
// import com.google.firebase.auth.UserRecord;
// import com.google.firebase.auth.UserRecord.CreateRequest;
// import com.google.firebase.auth.UserRecord.UpdateRequest;

// import g1t1.backend.email.EmailService;

// @Service
// public class UserService {

//     // initialise a emailService to use the service to send emails
//     @Autowired
//     private EmailService emailService;

//     public UserService(EmailService emailService) {
//         this.emailService = emailService;
//     } 

//     /**
//      * Description of the method: retrieve all user data using uid
//      *
//      * @param uid userId of user to retrieve
//      * @return return userRecord which is all the user data as an object
//      * @throws FirebaseAuthException Generic exception related to Firebase Authentication. Check the error code and message for more details.
//      */
//     public UserRecord getUser(@RequestParam String uid) {

//         UserRecord userRecord;

//         try {
//             userRecord = FirebaseAuth.getInstance().getUser(uid);

//             System.out.println("Successfully fetched user data: " + userRecord.getUid());
    
//             return userRecord;

//         } catch (FirebaseAuthException e) {
//             e.printStackTrace();
//             System.out.println("Failed to fetch user data: " + uid);
//         }
//         return null;
//     }


//     /**
//      * Description of the method: create user using email and password
//      *
//      * @param email email of user to create
//      * @param password password of user to create
//      * @return return userRecord which is all the user data as an object
//      * @throws FirebaseAuthException Generic exception related to Firebase Authentication. Check the error code and message for more details.
//      */
//     public UserRecord createUser(@RequestParam String email, @RequestParam String password) {

//         try {            
//             CreateRequest request = new CreateRequest()
//                 .setEmail(email)
//                 .setEmailVerified(false)
//                 .setPassword(password)
//                 .setDisabled(false);

//             UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
//             System.out.println("Successfully created new user: " + userRecord.getUid());

//             System.out.println("Email not verified");

//             // generate email verification link
//             try {
//                 String link = FirebaseAuth.getInstance().generateEmailVerificationLink(
//                     email);

//                 emailService.sendEmailForNewUser(email, userRecord.getUid(), link);

//                 System.out.println("Email verification link sent!");

//                 } catch (FirebaseAuthException e) {
//                     System.out.println("Error generating email link: " + e.getMessage());
//             }

//             return userRecord;

//         } catch (FirebaseAuthException e) {
//             e.printStackTrace();
//             System.out.println("Failed to create new user.");
//         }
//         return null;
//     }


//     /**
//      * Description of the method: edit user's email using user uid to change user's email
//      *
//      * @param uid uid of user to edit
//      * @param email email of user to edit
//      * @return return userRecord which is all the updated user data as an object
//      * @throws FirebaseAuthException Generic exception related to Firebase Authentication. Check the error code and message for more details.
//      */
//     public UserRecord editUserEmail(@RequestParam String uid, @RequestParam String email) {

//         try {
//             UpdateRequest request = new UpdateRequest(uid)
//                 .setEmail(email);

//             UserRecord userRecord = FirebaseAuth.getInstance().updateUser(request);
//             System.out.println("Successfully updated user's email: " + userRecord.getUid());

//             return userRecord;

//         } catch (FirebaseAuthException e) {
//             e.printStackTrace();
//             System.out.println("Failed to update user's email.");
//         }
//         return null;
//     } 


//     /**
//      * Description of the method: send user a reset password email link using user uid to change user's password
//      *
//      * @param uid uid of user to edit
//      * @throws FirebaseAuthException Generic exception related to Firebase Authentication. Check the error code and message for more details.
//      */
//     public void editUserChangePassword(@RequestParam String uid) {

//         // get user's email using user uid first
//         UserRecord userRecord = getUser(uid);
//         String email = userRecord.getEmail();
//         String displayName = userRecord.getUid();

//         try {
//             String link = FirebaseAuth.getInstance().generatePasswordResetLink(email);
//             // Construct email verification template, embed the link and send
//             emailService.sendEmailForChangePassword(email, displayName, link);
//         } catch (FirebaseAuthException e) {
//             System.out.println("Error generating email link: " + e.getMessage());
//         }
//     }


//     /**
//      * Description of the method: delete user details using uid
//      *
//      * @param uid uid of user to edit
//      * @return do not return anything
//      * @throws FirebaseAuthException Generic exception related to Firebase Authentication. Check the error code and message for more details.
//      */
//     public void deleteUser(@RequestParam String uid) {

//         try {
//             FirebaseAuth.getInstance().deleteUser(uid);
//             System.out.println("Successfully deleted user.");
//         } catch (FirebaseAuthException e) {
//             e.printStackTrace();
//             System.out.println("Failed to delete user.");
//         }
//     }

// }

