package sk.tuke.fei.icube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sk.tuke.fei.icube.model.Product;
import sk.tuke.fei.icube.repository.ProductRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;


@Service
public class ProductService extends CrudService<Product> {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> findAllByCategoryId(Long id, Pageable pageable) {
        return productRepository.findAllByCategoryId(id, pageable);
    }

    public Page<Product> findAllByCategoryName(String categoryName, Pageable pageable) {
        return productRepository.findAllByCategoryName(categoryName, pageable);
    }

    public Page<Product> findAllByLabelName(String labelName, Pageable pageable) {
        return productRepository.findAllByLabelName(labelName, pageable);
    }

    public Page<Product> findByNameContaining(String searchWord, Pageable pageable) {
        return productRepository.findAllByNameContaining(searchWord, pageable);
    }

    public Optional<Product> findByCode(String code) {
        return productRepository.findByCode(code);
    }

    @Transactional
    public void decreaseStock(Long productId, int amount) {
        Product product = findById(productId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Product with id %d was not found", productId)));

        int update = product.getQuantity() - amount;
        if (update <= 0) throw new IllegalArgumentException("Not enough product quantity");

        product.setQuantity(update);
        productRepository.save(product);
    }

    public Product update(Product product) {
        return null;
    }

    public Optional<Product> findByUrlName(String urlName) {
        return productRepository.findByUrlName(urlName);
    }

    @Override
    protected PagingAndSortingRepository<Product, Long> getRepository() {
        return productRepository;
    }

}
