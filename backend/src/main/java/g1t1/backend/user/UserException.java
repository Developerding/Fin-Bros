package g1t1.backend.user;

import java.util.List;

public class UserException {

    public class FirebaseError extends RuntimeException {
        private int code;
        private String message;
        private List<ErrorDetail> errors;

        public String getMessages(){
            return message;
        }
    
    }
    
    public class ErrorDetail extends RuntimeException {
        private String message;
        private String domain;
        private String reason;
    
    }
    public static class CannotLoginException extends RuntimeException{
        public CannotLoginException(String msg) {
            super(msg);
        }
    }

    public static class CannotFetchUserDataException extends RuntimeException {
        public CannotFetchUserDataException(String msg) {
            super(msg);
        }
    }

    public static class CannotCreateUserException extends RuntimeException {
        public CannotCreateUserException(String msg) {
            super(msg);
        }
    }

    public static class CannotSendEmailException extends RuntimeException {
        public CannotSendEmailException(String msg) {
            super(msg);
        }
    }

    public static class CannotUpdateUserDetailsException extends RuntimeException {
        public CannotUpdateUserDetailsException(String msg) {
            super(msg);
        }
    }

    public static class CannotDeleteUserException extends RuntimeException {
        public CannotDeleteUserException(String msg) {
            super(msg);
        }
    }

}
