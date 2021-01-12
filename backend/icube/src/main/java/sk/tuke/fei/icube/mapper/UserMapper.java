package sk.tuke.fei.icube.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import sk.tuke.fei.icube.dto.UserDTO;
import sk.tuke.fei.icube.dto.UserViewDTO;
import sk.tuke.fei.icube.model.User;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper( UserMapper.class );

    User toUser(UserDTO userDTO);

    UserDTO toUserDTO(User user);

    UserViewDTO toUserViewDTO(User user);
}
