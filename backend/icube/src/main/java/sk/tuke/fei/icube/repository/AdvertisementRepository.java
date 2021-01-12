package sk.tuke.fei.icube.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import sk.tuke.fei.icube.model.Advertisement;

/**
 * @author Šimon Hašák
 */
@Repository
public interface AdvertisementRepository extends PagingAndSortingRepository<Advertisement, Long> {
}
