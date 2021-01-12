package sk.tuke.fei.icube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import sk.tuke.fei.icube.model.Measurement;
import sk.tuke.fei.icube.repository.SizeRepository;

/**
 * @author Šimon Hašák
 */
@Service
public class SizeService extends CrudService<Measurement> {

    private final SizeRepository sizeRepository;

    @Autowired
    public SizeService(SizeRepository sizeRepository) {
        this.sizeRepository = sizeRepository;
    }

    @Override
    protected PagingAndSortingRepository<Measurement, Long> getRepository() {
        return sizeRepository;
    }
}
