package sk.tuke.fei.icube.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import sk.tuke.fei.icube.model.Category;

/**
 * @author Šimon Hašák
 */
@Repository
public interface CategoryRepository extends PagingAndSortingRepository<Category, Long> {
}
