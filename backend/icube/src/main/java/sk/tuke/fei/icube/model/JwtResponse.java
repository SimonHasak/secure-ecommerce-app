package sk.tuke.fei.icube.model;

import lombok.Data;

import java.io.Serializable;


@Data
public class JwtResponse implements Serializable {
    private String token;
    private String type;
    private String email;
    private String role;

    public JwtResponse(String token, String email, String role) {
        this.token = token;
        this.type = "Bearer";
        this.email = email;
        this.role = role;
    }
}
