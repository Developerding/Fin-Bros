package g1t1.backend.user;

public class UserException {

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
