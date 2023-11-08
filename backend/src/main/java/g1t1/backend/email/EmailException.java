package g1t1.backend.email;

public class EmailException {
    
    public static class SendGridEmailException extends RuntimeException {
        public SendGridEmailException(String msg) {
            super(msg);
        }
    }

}
