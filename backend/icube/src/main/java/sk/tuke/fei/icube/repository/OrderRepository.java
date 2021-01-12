package sk.tuke.fei.icube.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import sk.tuke.fei.icube.model.Order;

/**
 * @author Šimon Hašák
 */
@Repository
public interface OrderRepository extends PagingAndSortingRepository<Order, Long> {
}
