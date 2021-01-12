package sk.tuke.fei.icube.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import sk.tuke.fei.icube.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

//    User findByFirstName(String firstName);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);
}