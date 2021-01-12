package sk.tuke.fei.icube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import sk.tuke.fei.icube.model.Image;
import sk.tuke.fei.icube.model.Label;
import sk.tuke.fei.icube.repository.ImageRepository;
import sk.tuke.fei.icube.repository.LabelRepository;

/**
 * @author Šimon Hašák
 */
@Service
public class ImageService extends CrudService<Image> {

    private final ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    protected PagingAndSortingRepository<Image, Long> getRepository() {
        return imageRepository;
    }
}
