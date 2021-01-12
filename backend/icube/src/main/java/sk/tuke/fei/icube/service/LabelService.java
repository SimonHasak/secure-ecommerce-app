package sk.tuke.fei.icube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import sk.tuke.fei.icube.model.Label;
import sk.tuke.fei.icube.repository.LabelRepository;

/**
 * @author Šimon Hašák
 */
@Service
public class LabelService extends CrudService<Label> {

    private final LabelRepository labelRepository;

    @Autowired
    public LabelService(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    @Override
    protected PagingAndSortingRepository<Label, Long> getRepository() {
        return labelRepository;
    }
}
