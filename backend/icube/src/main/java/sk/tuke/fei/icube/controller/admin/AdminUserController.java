package sk.tuke.fei.icube.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import sk.tuke.fei.icube.dto.ProductViewDTO;
import sk.tuke.fei.icube.dto.UserDTO;
import sk.tuke.fei.icube.dto.UserViewDTO;
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
@RequestMapping("api/admin/user")
public class AdminUserController {

    @Autowired
    private UserService userService;

    private final UserMapper userMapper;

    @Autowired
    public AdminUserController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }


    @GetMapping("/")
    public Page<UserViewDTO> getAllUsers(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "9") int size) {
        Page<UserViewDTO> userViewDTOS = this.userService.findAll(PageRequest.of(page, size))
                .map(UserMapper.INSTANCE::toUserViewDTO);

        return userViewDTOS;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
        this.userService.delete(id);
        return ResponseEntity.ok().build();
    }

}

