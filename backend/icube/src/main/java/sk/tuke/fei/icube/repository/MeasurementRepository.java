package sk.tuke.fei.icube.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import sk.tuke.fei.icube.model.Measurement;

import java.util.Optional;

/**
 * @author Šimon Hašák
 */
@Repository
public interface MeasurementRepository extends PagingAndSortingRepository<Measurement, Long> {

    Optional<Measurement> findByName(String name);

}
