package sk.tuke.fei.icube.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;


@Data
public class LoginForm implements Serializable {
    private String username;
    private String password;
}
