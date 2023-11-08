package g1t1.backend.user;

public class FirebaseLogin {
    private String email;
    private String password;
    private boolean returnSecureToken;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public boolean getReturnSecureToken() {
        return returnSecureToken;
    }

    public FirebaseLogin(String email, String password){
        this.email = email;
        this.password = password;
        this.returnSecureToken = true;
    }
}
