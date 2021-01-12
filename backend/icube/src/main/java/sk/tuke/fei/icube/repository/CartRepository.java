package sk.tuke.fei.icube.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import sk.tuke.fei.icube.model.Cart;

/**
 * @author Šimon Hašák
 */
@Repository
public interface CartRepository extends PagingAndSortingRepository<Cart, Long> {

}
