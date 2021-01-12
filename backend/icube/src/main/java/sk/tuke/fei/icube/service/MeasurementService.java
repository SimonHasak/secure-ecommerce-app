package sk.tuke.fei.icube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import sk.tuke.fei.icube.model.Label;
import sk.tuke.fei.icube.model.Measurement;
import sk.tuke.fei.icube.repository.LabelRepository;
import sk.tuke.fei.icube.repository.MeasurementRepository;

/**
 * @author Šimon Hašák
 */
@Service
public class MeasurementService extends CrudService<Measurement> {

    private final MeasurementRepository measurementRepository;

    @Autowired
    public MeasurementService(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    @Override
    protected PagingAndSortingRepository<Measurement, Long> getRepository() {
        return this.measurementRepository;
    }
}
