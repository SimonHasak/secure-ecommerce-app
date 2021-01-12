package sk.tuke.fei.icube.controller;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import sk.tuke.fei.icube.dto.ProductViewDTO;
import sk.tuke.fei.icube.dto.UserDTO;
import sk.tuke.fei.icube.mapper.ProductMapper;
import sk.tuke.fei.icube.mapper.UserMapper;
import sk.tuke.fei.icube.model.JwtResponse;
import sk.tuke.fei.icube.model.LoginForm;
import sk.tuke.fei.icube.model.User;
import sk.tuke.fei.icube.security.jwt.JwtTokenUtil;
import sk.tuke.fei.icube.service.UserService;

import java.util.List;

/**
 * @author Šimon Hašák
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    private final UserMapper userMapper;

    @Autowired
    public UserController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }


//    @SneakyThrows
    @PostMapping(path = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginForm loginForm) {

        try {
            final UserDetails userDetails = userService.loadUserByUsername(loginForm.getUsername());

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginForm.getUsername(),
                    loginForm.getPassword(), userDetails.getAuthorities()));

            final String token = jwtTokenUtil.generateToken(userDetails);

            String role = "USER";

            if (!userDetails.getAuthorities().isEmpty()) role = userDetails.getAuthorities().iterator().next().toString();

            return ResponseEntity.ok(new JwtResponse(token, userDetails.getUsername(), role));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping(path = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDTO> save(@RequestBody UserDTO userDTO) {

        if (userService.findByEmail(userDTO.getEmail()).isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        User user = userMapper.toUser(userDTO);

        try {

            UserDTO savedUserDTO = userMapper.toUserDTO(userService.save(user));

            return ResponseEntity.ok(savedUserDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

//    @PutMapping("/profile")
//    public ResponseEntity<User> update(@RequestBody User user, Principal principal) {
//
//        try {
//            if (!principal.getEmail().equals(user.getEmail())) throw new IllegalArgumentException();
//            return ResponseEntity.ok(userService.update(user));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }

//    @GetMapping(path = "/profile/{email}", consumes = "application/json", produces = "application/json")
//    public ResponseEntity<User> getProfile(@PathVariable("email") String email, Principal principal) {
//        if (principal.getEmail().equals(email)) {
//            return ResponseEntity.ok(userService.findByEmail(email));
//        } else {
//            return ResponseEntity.badRequest().build();
//        }
//    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return this.userService.findAll();
    }

}

