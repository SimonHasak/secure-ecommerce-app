package sk.tuke.fei.icube.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sk.tuke.fei.icube.model.Product;

import java.util.List;
import java.util.Optional;

/**
 * @author Šimon Hašák
 */
@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    Page<Product> findAll(Pageable pageable);

    Page<Product> findAllByNameContaining(String searchWord, Pageable pageable);

    Optional<Product> findByUrlName(String urlName);

    Optional<Product> findByCode(String code);

    @Query(value = "SELECT p FROM Product p JOIN FETCH p.categories pc WHERE pc.id = :categoryId",
       countQuery = "SELECT count(p) FROM Product p JOIN p.categories pc WHERE pc.id = :categoryId")
    Page<Product> findAllByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query(value = "SELECT p FROM Product p JOIN FETCH p.categories pc WHERE pc.name LIKE :categoryName",
      countQuery = "SELECT count(p) FROM Product p JOIN p.categories pc WHERE pc.name LIKE :categoryName")
    Page<Product> findAllByCategoryName(@Param("categoryName") String categoryName, Pageable pageable);

    @Query(value = "SELECT p FROM Product p JOIN FETCH p.labels pl WHERE pl.name LIKE :labelName",
      countQuery = "SELECT count(p) FROM Product p JOIN p.labels pl WHERE pl.name LIKE :labelName")
    Page<Product> findAllByLabelName(@Param("labelName") String labelName, Pageable pageable);

}
