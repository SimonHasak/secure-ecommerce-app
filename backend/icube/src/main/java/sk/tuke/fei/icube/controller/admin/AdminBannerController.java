package sk.tuke.fei.icube.controller.admin;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.tuke.fei.icube.model.*;
import sk.tuke.fei.icube.service.*;

import java.util.List;

/**
 * @author Šimon Hašák
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin/banners")
public class AdminBannerController {

    private final AdvertisementService advertisementService;

    private final ImageSliderService imageSliderService;

    private final LabelService labelService;

    private final CategoryService categoryService;

    private final MeasurementService measurementService;

    @Autowired
    public AdminBannerController(AdvertisementService advertisementService,
                                 ImageSliderService imageSliderService,
                                 LabelService labelService,
                                 MeasurementService measurementService,
                                 CategoryService categoryService) {
        this.advertisementService = advertisementService;
        this.imageSliderService = imageSliderService;
        this.labelService = labelService;
        this.measurementService = measurementService;
        this.categoryService = categoryService;
    }

    @GetMapping("/advertisement")
    @SneakyThrows
    public Advertisement getAdvertisement() {
        return advertisementService.findById(1L).orElseThrow(() -> new IllegalArgumentException("Advertisement with id 1 not found"));
    }

    @PutMapping("/advertisement")
    public Advertisement updateAdvertisement() {
        return advertisementService.update();
    }

    @GetMapping("/slider")
    @SneakyThrows
    public ImageSlider getSlider() {
        return imageSliderService.findById(1L).orElseThrow(() -> new IllegalArgumentException("ImageSlider with id 1 not found"));
    }

    @GetMapping("/label")
    public ResponseEntity<List<Label>> getAllLabels() {
        return ResponseEntity.ok(this.labelService.findAll());
    }

    @DeleteMapping("/label/{id}")
    public ResponseEntity<?> deleteLabel(@PathVariable("id") long id) {
        this.labelService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(this.categoryService.findAll());
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") long id) {
        this.categoryService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/measurement")
    public ResponseEntity<List<Measurement>> getAllMeasurements() {
        return ResponseEntity.ok(this.measurementService.findAll());
    }

    @DeleteMapping("/measurement/{id}")
    public ResponseEntity<?> deleteMeasurement(@PathVariable("id") long id) {
        this.measurementService.delete(id);
        return ResponseEntity.ok().build();
    }

}
