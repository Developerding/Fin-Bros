package g1t1.backend.user;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.UserRecord;

@RestController
@RequestMapping(path="api/v2")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/user")
    public UserRecord getUser(@RequestParam String uid) {
        return userService.getUser(uid);
    }


    @PostMapping("/user/create")
    public UserRecord createUser(@RequestParam String email, @RequestParam String password) {
        return userService.createUser(email, password);
    }


    @PutMapping("/user/edit")
    public UserRecord editUser(@RequestParam String uid, @RequestParam String email, @RequestParam String password) {
        return userService.editUser(uid, email, password);
    }


    @DeleteMapping("/user/delete")
    public void deleteUser(@RequestParam String uid) {
        userService.deleteUser(uid);
    }

}

