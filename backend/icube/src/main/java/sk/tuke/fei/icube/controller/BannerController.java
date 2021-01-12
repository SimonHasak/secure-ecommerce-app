package sk.tuke.fei.icube.controller;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sk.tuke.fei.icube.model.Advertisement;
import sk.tuke.fei.icube.model.ImageSlider;
import sk.tuke.fei.icube.service.AdvertisementService;
import sk.tuke.fei.icube.service.ImageSliderService;

/**
 * @author Šimon Hašák
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/api/banner")
public class BannerController {

    private final AdvertisementService advertisementService;

    private final ImageSliderService imageSliderService;

    @Autowired
    public BannerController(AdvertisementService advertisementService, ImageSliderService imageSliderService) {
        this.advertisementService = advertisementService;
        this.imageSliderService = imageSliderService;
    }

    @GetMapping("/advertisement")
    @SneakyThrows
    public Advertisement getAdvertisement() {
        return advertisementService.findById(1L).orElseThrow(() -> new IllegalArgumentException("Advertisement with id 1 not found"));
    }

    @GetMapping("/slider")
    @SneakyThrows
    public ImageSlider getSlider() {
        return imageSliderService.findById(1L).orElseThrow(() -> new IllegalArgumentException("ImageSlider with id 1 not found"));
    }

}
