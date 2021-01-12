package sk.tuke.fei.icube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import sk.tuke.fei.icube.model.Advertisement;
import sk.tuke.fei.icube.repository.AdvertisementRepository;


/**
 * @author Šimon Hašák
 */
@Service
public class AdvertisementService extends CrudService<Advertisement> {

    private final AdvertisementRepository advertisementRepository;

    @Autowired
    public AdvertisementService(AdvertisementRepository advertisementRepository) {
        this.advertisementRepository = advertisementRepository;
    }

    @Override
    protected PagingAndSortingRepository<Advertisement, Long> getRepository() {
        return this.advertisementRepository;
    }

    public Advertisement update() {
        return null;
    }
}
