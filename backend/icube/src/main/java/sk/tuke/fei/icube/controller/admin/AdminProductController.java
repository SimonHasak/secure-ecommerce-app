package sk.tuke.fei.icube.controller.admin;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.tuke.fei.icube.dto.ProductAdminViewDTO;
import sk.tuke.fei.icube.dto.ProductCreateDTO;
import sk.tuke.fei.icube.dto.ProductDetailDTO;
import sk.tuke.fei.icube.mapper.CategoryMapper;
import sk.tuke.fei.icube.mapper.LabelMapper;
import sk.tuke.fei.icube.mapper.MeasurementMapper;
import sk.tuke.fei.icube.mapper.ProductMapper;
import sk.tuke.fei.icube.model.Category;
import sk.tuke.fei.icube.model.Image;
import sk.tuke.fei.icube.model.Product;
import sk.tuke.fei.icube.service.CrudService;
import sk.tuke.fei.icube.service.ImageService;
import sk.tuke.fei.icube.service.ProductService;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 * @author Šimon Hašák
 */
@RestController
@RequestMapping("/api/admin/product")
public class AdminProductController {

    private final ProductService productService;

    private final ProductMapper productMapper;
    private final CategoryMapper categoryMapper;
    private final LabelMapper labelMapper;
    private final MeasurementMapper measurementMapper;

    private final ImageService imageService;

    @Autowired
    public AdminProductController(ProductService productService,
                                  ProductMapper productMapper,
                                  ImageService imageService,
                                  CategoryMapper categoryMapper,
                                  LabelMapper labelMapper,
                                  MeasurementMapper measurementMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
        this.imageService = imageService;
        this.categoryMapper = categoryMapper;
        this.labelMapper = labelMapper;
        this.measurementMapper = measurementMapper;
    }

    @GetMapping("/")
    public Page<ProductAdminViewDTO> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "9") int size) {
        Page<ProductAdminViewDTO> productAdminViewDTOS = this.productService.findAll(PageRequest.of(page, size))
                .map(ProductMapper.INSTANCE::toProductAdminViewDTO);

        return productAdminViewDTOS;
    }

    @PostMapping("/")
    @SneakyThrows
    public ResponseEntity<?> create(@RequestBody ProductCreateDTO productCreateDTO) {

        List<Image> savedImages = productCreateDTO.getImages()
                .stream()
                .map(Image::new)
                .map(this.imageService::save)
                .collect(Collectors.toList());

        Product productToSave = new Product(
                productCreateDTO.getCode(),
                productCreateDTO.getDescription(),
                productCreateDTO.getMainImage(),
                productCreateDTO.getName(),
                productCreateDTO.getPrice(),
                productCreateDTO.getQuantity(),
                productCreateDTO.getUrlName(),
                productCreateDTO.getVisibleLabel(),
                categoryMapper.toCategories(productCreateDTO.getCategories()),
                labelMapper.toLabels(productCreateDTO.getLabels()),
                measurementMapper.toMeasurements(productCreateDTO.getMeasurements()),
                savedImages);

//        Product productToSave = this.productMapper.toProduct(productCreateDTO);

//        Optional<Product> foundProduct = productService.findByCode(productToSave.getCode());
//        if (foundProduct.isEmpty()) {
//            System.out.println("emtpy");
//        }

        return ResponseEntity.ok(productService.save(productToSave));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long productId,
                                  @RequestBody ProductCreateDTO productData) {

        Product productToUpdate = this.productService.findById(productId).orElseThrow(
                () -> new EntityNotFoundException(String.format("Product with id %d was not found.", productId))
        );

//        if (!productId.equals(product.getId())) {
//            return ResponseEntity.badRequest().body("Id Not Matched");
//        }

        List<Image> savedImages = productData.getImages()
                .stream()
                .map(Image::new)
                .map(this.imageService::save)
                .collect(Collectors.toList());

        productToUpdate.setCode(productData.getCode());
        productToUpdate.setDescription(productData.getDescription());
        productToUpdate.setMainImage(productData.getMainImage());
        productToUpdate.setName(productData.getName());
        productToUpdate.setPrice(productData.getPrice());
        productToUpdate.setQuantity(productData.getQuantity());
        productToUpdate.setUrlName(productData.getUrlName());
        productToUpdate.setVisibleLabel(productData.getVisibleLabel());
        productToUpdate.setCategories(categoryMapper.toCategories(productData.getCategories()));
        productToUpdate.setLabels(labelMapper.toLabels(productData.getLabels()));
        productToUpdate.setMeasurements(measurementMapper.toMeasurements(productData.getMeasurements()));
        productToUpdate.setImages(savedImages);

        return ResponseEntity.ok(productService.save(productToUpdate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCreateDTO> getProductById(@PathVariable("id") Long id) {

        Product product = this.productService.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format("Product with id %d was not found.", id))
        );

        List<String> simpleFormatImages = product.getImages()
                .stream()
                .map(Image::getUrlAddressOfImage)
                .collect(Collectors.toList());

        ProductCreateDTO productCreateDTO = new ProductCreateDTO();

        productCreateDTO.setCode(product.getCode());
        productCreateDTO.setDescription(product.getDescription());
        productCreateDTO.setMainImage(product.getMainImage());
        productCreateDTO.setName(product.getName());
        productCreateDTO.setPrice(product.getPrice());
        productCreateDTO.setQuantity(product.getQuantity());
        productCreateDTO.setUrlName(product.getUrlName());
        productCreateDTO.setVisibleLabel(product.getVisibleLabel());
        productCreateDTO.setCategories(categoryMapper.toCategoryDTOs(product.getCategories()));
        productCreateDTO.setLabels(labelMapper.toLabelDTOs(product.getLabels()));
        productCreateDTO.setMeasurements(measurementMapper.toMeasurementDTOs(product.getMeasurements()));
        productCreateDTO.setImages(simpleFormatImages);

        return ResponseEntity.ok(productCreateDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long productId) {
        productService.delete(productId);
        return ResponseEntity.ok().build();
    }

}
