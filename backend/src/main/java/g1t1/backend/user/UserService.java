package g1t1.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.auth.UserRecord.UpdateRequest;

import g1t1.backend.email.EmailService;
import g1t1.backend.user.UserException.*;


@Service
public class UserService {

    // initialise a emailService to use the service to send emails
    @Autowired
    private EmailService emailService;

    @Value("${env.FIREBASE_KEY}")
    private String firebaseKey;

    public UserService(EmailService emailService) {
        this.emailService = emailService;
    } 

    /**
     * Description of the method: retrieve all user data using uid
     *
     *  Takes in a FirebaseLogin class
     * @return return ResponseEntity class which contains status code, message and basic user profile details
     * @throws JsonProcessingException
     * @throws JsonMappingException
     * @throws CannotFetchUserDataException exception to indicate an error while fetching the user's data
     */
    public ResponseEntity<?> loginUser(FirebaseLogin firebaseLogin) throws JsonMappingException, JsonProcessingException, CannotLoginException{
        
        
        try{
            RestTemplate restTemplate = new RestTemplate();
            HttpEntity <FirebaseLogin> request = new HttpEntity<>(firebaseLogin);
            String response = restTemplate.postForObject(firebaseKey, request, String.class);
            System.out.println(response);
            return ResponseEntity.ok(response);

        }
        catch(HttpClientErrorException e){
            // e.printStackTrace();
            // System.out.println(e);
            throw new CannotLoginException("Invalid password. Please try again");
            // String responseBody = e.getResponseBodyAsString();
            // ObjectMapper mapper = new ObjectMapper();
            // FirebaseError firebaseError = mapper.readValue(responseBody, FirebaseError.class);
            // System.out.println(firebaseError.getMessages());
            // switch(firebaseError.getMessage()){
            //     case "EMAIL_NOT_FOUND":{
            //         throw new CannotLoginException("Email not found");

            //     }
            //     case"TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":{
            //         throw new CannotLoginException("Too many attempts, account has been disabled. Please reset your password");

            //     }
            //     case"INVALID_PASSWORD":{
            //         throw new CannotLoginException("Invalid password. Please try again");

            //     }
            // }

            // System.out.println(e);
            // // System.out.println(e.getMessage());
            // throw new CannotLoginException("Cannot login");
            // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while authenticating with Firebase.");
        }
    }

    /**
     * Description of the method: retrieve all user data using uid
     *
     * @param uid userId of user to retrieve
     * @return return userRecord which is all the user data as an object
     * @throws CannotFetchUserDataException exception to indicate an error while fetching the user's data
     */
    public UserRecord getUser(@RequestParam String uid) throws CannotFetchUserDataException {

        UserRecord userRecord;

        try {
            userRecord = FirebaseAuth.getInstance().getUser(uid);    
            return userRecord;

        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            String responseMessage = String.format("Failed to fetch user data: %s", uid);
            throw new CannotFetchUserDataException(responseMessage);
        }
    }


    /**
     * Description of the method: retrieve all user data using user's email
     *
     * @param email email of user to retrieve
     * @return return userRecord which is all the user data as an object
     * @throws CannotFetchUserDataException exception to indicate an error while fetching the user's data
     */
    public UserRecord getUserByEmail(@RequestParam String email) throws CannotFetchUserDataException {

        UserRecord userRecord;

        try {
            userRecord = FirebaseAuth.getInstance().getUserByEmail(email);   
            return userRecord;

        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            String responseMessage = String.format("Failed to fetch user data with the email: %s", email);
            throw new CannotFetchUserDataException(responseMessage);
        }
    }

     public UserRecord getUserByEmailNoParams(String email) throws CannotFetchUserDataException {

        UserRecord userRecord;

        try {
            userRecord = FirebaseAuth.getInstance().getUserByEmail(email);   
            return userRecord;

        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            String responseMessage = String.format("Failed to fetch user data with the email: %s", email);
            throw new CannotFetchUserDataException(responseMessage);
        }
    }


    /**
     * Description of the method: create user using email and password
     *
     * @param email email of user to create
     * @param password password of user to create
     * @return return userRecord which is all the user data as an object
     * @throws CannotCreateUserException exception to indicate an error while creating a new user
     * @throws CannotSendEmailException exception to indicate an error while sending a verification email to the new user
     */
    public UserRecord createUser(@RequestParam String email, @RequestParam String password) throws CannotCreateUserException, CannotSendEmailException {
        try {
                        
            CreateRequest request = new CreateRequest()
                .setEmail(email)
                .setEmailVerified(false)
                .setPassword(password)
                .setDisabled(false);

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

            // generate email verification link
            try {

                String link = FirebaseAuth.getInstance().generateEmailVerificationLink(
                    email);

                emailService.sendEmailForNewUser(email, userRecord.getUid(), link);
                } catch (FirebaseAuthException e) {
                    String responseMessage = "Error generating email verification link";
                    throw new CannotSendEmailException(responseMessage);
            }
            return userRecord;

        } catch (FirebaseAuthException e) {
            String responseMessage = "Failed to create new user.";
            throw new CannotCreateUserException(responseMessage);
        }
    }


    /**
     * Description of the method: edit user's email using user uid to change user's email
     *
     * @param uid uid of user to edit
     * @param email email of user to edit
     * @return return userRecord which is all the updated user data as an object
     * @throws CannotUpdateUserDetailsException exception to indicate an eroror while trying to update a user's details, more specifically email in this method
     */
    public UserRecord editUserEmail(@RequestParam String uid, @RequestParam String email) throws CannotUpdateUserDetailsException {

        try {
            UpdateRequest request = new UpdateRequest(uid)
                .setEmail(email);

            UserRecord userRecord = FirebaseAuth.getInstance().updateUser(request);

            return userRecord;

        } catch (FirebaseAuthException e) {
            String responseMessage = "Failed to update user's email";
            throw new CannotUpdateUserDetailsException(responseMessage);
        }
    } 


    /**
     * Description of the method: send user a reset password email link using user uid to change user's password
     *
     * @param uid uid of user to edit
     * @throws CannotUpdateUserDetailsException exception to indicate an error while trying to update the user's details, more specifically user's password in this method
     */
    public UserRecord editUserChangePassword(@RequestParam String email) throws CannotUpdateUserDetailsException {

        // get user's email using user uid first
        UserRecord userRecord = getUserByEmail(email);
        String uid = userRecord.getUid();

        try {
            String link = FirebaseAuth.getInstance().generatePasswordResetLink(email);
            // Construct email verification template, embed the link and send
            emailService.sendEmailForChangePassword(email, uid, link);
            return userRecord;
        } 
        catch (Exception e) {
            String responseMessage = "Error generating email link to change password";
            throw new CannotUpdateUserDetailsException(responseMessage);
        }
  
    }


    /**
     * Description of the method: delete user details using uid
     *
     * @param uid uid of user to edit
     * @return do not return anything
     * @throws ResponseEntity<String> A message of whether this operation is successful or not
     */
    public ResponseEntity<String> deleteUser(@RequestParam String uid) {

        try {
            FirebaseAuth.getInstance().deleteUser(uid);
            String responseMessage = "Successfully deleted user.";
            return new ResponseEntity<>(responseMessage, HttpStatus.ACCEPTED);
        } catch (FirebaseAuthException e) {
            String responseMessage = "Failed to delete user.";
            return new ResponseEntity<String>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

}

