package sk.tuke.fei.icube.controller;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sk.tuke.fei.icube.dto.ProductDetailDTO;
import sk.tuke.fei.icube.dto.ProductViewDTO;
import sk.tuke.fei.icube.exception.EntityNotFoundException;
import sk.tuke.fei.icube.model.Product;
import sk.tuke.fei.icube.mapper.ProductMapper;
import sk.tuke.fei.icube.service.CategoryService;
import sk.tuke.fei.icube.service.ProductService;

import java.util.List;
import java.util.Optional;

/**
 * @author Šimon Hašák
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    private final ProductMapper productMapper;

    @Autowired
    public ProductController(ProductService productService,
                             CategoryService categoryService,
                             ProductMapper productMapper) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.productMapper = productMapper;
    }

    @GetMapping("/category/{id}")
    public Page<ProductViewDTO> getAllByCategoryId(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "9") int size,
                                          @PathVariable("id") long id) {
        Page<ProductViewDTO> productViewDTOS = this.productService.findAllByCategoryId(id, PageRequest.of(page, size))
                .map(ProductMapper.INSTANCE::toProductViewDTO);

        return productViewDTOS;
    }

    @GetMapping("/category-name/{name}")
    public Page<ProductViewDTO> getAllByCategoryName(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "9") int size,
                                            @PathVariable("name") String name) {
        Page<ProductViewDTO> productViewDTOS = this.productService.findAllByCategoryName(name, PageRequest.of(page, size))
                .map(ProductMapper.INSTANCE::toProductViewDTO);

        return productViewDTOS;
    }

    @GetMapping("label-name/{name}")
    public Page<ProductViewDTO> getAllByLabelName(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "9") int size,
                                                  @PathVariable("name") String name) {
        Page<ProductViewDTO> productViewDTOS = this.productService.findAllByLabelName(name, PageRequest.of(page, size))
                .map(ProductMapper.INSTANCE::toProductViewDTO);

        return productViewDTOS;
    }

    @GetMapping("product/name-contains/{keyword}")
    public Page<ProductViewDTO> getAllByNameContaining(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "9") int size,
                                                @PathVariable("keyword") String keyword) {
        Page<ProductViewDTO> productViewDTOS = this.productService.findByNameContaining(keyword, PageRequest.of(page, size))
                .map(ProductMapper.INSTANCE::toProductViewDTO);

        return productViewDTOS;
    }

    @SneakyThrows
    @GetMapping("/product/url-name/{name}")
    public ResponseEntity<ProductDetailDTO> getProductByUrlName(@PathVariable("name") String name) {
        Optional<Product> product = this.productService.findByUrlName(name);

        if (product.isEmpty()) throw new EntityNotFoundException("Product with " + name + " was not found");

        ProductDetailDTO productDetailDTO = productMapper.toProductDetailDTO(product.get());

        return ResponseEntity.ok(productDetailDTO);
    }

    @SneakyThrows
    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable("id") long id) {
        return this.productService.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with " + id + " was not found"));
    }

}
