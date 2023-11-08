package g1t1.backend.email;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import g1t1.backend.email.EmailException.SendGridEmailException;

@Service
public class EmailService {

    private final SendGrid sendGrid;
    private final String fromEmail;

    public EmailService(
            @Autowired SendGrid sendGrid,
            @Value("${env.SENDGRID_EMAIL}")
            String fromEmail
    ) {
        this.sendGrid = sendGrid;
        this.fromEmail = fromEmail;
    }

    private void sendEmail(Mail mail) throws SendGridEmailException {
        try {
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            // perform the request and send the email
            Response response = sendGrid.api(request);
            int statusCode = response.getStatusCode();
            // if the status code is not 2xx
            if (statusCode < 200 || statusCode >= 300) {
                String responseMessage = "Error sending a request to SendGrid API";
                throw new SendGridEmailException(responseMessage);
            }
        } catch (IOException e) {
            String responseMessage = "Error sending a request to SendGrid API";
            throw new SendGridEmailException(responseMessage);
        }
    }

    // send email when a new user is created
    public void sendEmailForNewUser(String toEmail, String displayName, String link) {
        Email from = new Email(fromEmail);
        String subject = "Verify your email for FinBros";
        Email to = new Email(toEmail);
        Content content = new Content("text/plain", String.format("Hello %s,%n%nFollow this link to verify your email address.%n%n%s%n%nThanks,%nYour FinBros Team", displayName, link));
        
        // initialize the Mail helper class
        Mail mail = new Mail(from, subject, to, content);

        // send the email
        sendEmail(mail);
    }

    // send email when user requests for password change
    public void sendEmailForChangePassword(String toEmail, String displayName, String link) {
        Email from = new Email(fromEmail);
        String subject = "Reset password for FinBros";
        Email to = new Email(toEmail);
        Content content = new Content("text/plain", String.format("Hello %s,%n%nFollow this link to reset your passsword for FinBros.%n%n%s%n%nThanks,%nYour FinBros Team", displayName, link));
        
        // initialize the Mail helper class
        Mail mail = new Mail(from, subject, to, content);

        // send the email
        sendEmail(mail);
    }

}
