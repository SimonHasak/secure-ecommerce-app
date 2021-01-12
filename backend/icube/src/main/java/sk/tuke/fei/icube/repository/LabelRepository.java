package sk.tuke.fei.icube.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import sk.tuke.fei.icube.model.Label;

/**
 * @author Šimon Hašák
 */
@Repository
public interface LabelRepository extends PagingAndSortingRepository<Label, Long> {
}
