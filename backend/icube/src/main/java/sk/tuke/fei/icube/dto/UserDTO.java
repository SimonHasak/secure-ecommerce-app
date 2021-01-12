package sk.tuke.fei.icube.dto;

import lombok.Data;

@Data
public class UserDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String zipCode;
    private String password;

}
