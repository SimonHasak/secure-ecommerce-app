package sk.tuke.fei.icube.service;

import javassist.NotFoundException;
import lombok.SneakyThrows;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import sk.tuke.fei.icube.model.Image;
import sk.tuke.fei.icube.model.ImageSlider;
import sk.tuke.fei.icube.repository.ImageSliderRepository;

import java.util.List;

/**
 * @author Šimon Hašák
 */
@Service
public class ImageSliderService extends CrudService<ImageSlider> {

    private final ImageSliderRepository imageSliderRepository;

    public ImageSliderService(ImageSliderRepository imageSliderRepository) {
        this.imageSliderRepository = imageSliderRepository;
    }

    public List<Image> getAllImages(ImageSlider imageSlider) {
        return imageSlider.getImages();
    }

    @SneakyThrows
    public List<Image> getAllImages(Long id) {
        var imageSlider = imageSliderRepository.findById(id);

        if (imageSlider.isEmpty()) throw new NotFoundException("ImageSlider with id " + id + " was not found");

        return imageSlider.get().getImages();
    }

    @Override
    protected PagingAndSortingRepository<ImageSlider, Long> getRepository() {
        return imageSliderRepository;
    }
}
