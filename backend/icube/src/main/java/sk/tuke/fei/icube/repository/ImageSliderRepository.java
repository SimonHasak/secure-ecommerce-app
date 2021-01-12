package sk.tuke.fei.icube.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import sk.tuke.fei.icube.model.ImageSlider;

/**
 * @author Šimon Hašák
 */
@Repository
public interface ImageSliderRepository extends PagingAndSortingRepository<ImageSlider, Long> {
}
