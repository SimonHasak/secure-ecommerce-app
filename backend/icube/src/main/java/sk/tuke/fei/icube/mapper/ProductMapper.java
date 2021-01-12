package sk.tuke.fei.icube.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import sk.tuke.fei.icube.dto.ProductAdminViewDTO;
import sk.tuke.fei.icube.dto.ProductCreateDTO;
import sk.tuke.fei.icube.dto.ProductDetailDTO;
import sk.tuke.fei.icube.dto.ProductViewDTO;
import sk.tuke.fei.icube.model.Image;
import sk.tuke.fei.icube.model.Product;

import java.util.List;

/**
 * @author Šimon Hašák
 */
@Mapper(componentModel = "spring", uses = { MeasurementMapper.class, LabelMapper.class,
                                            ImageMapper.class, CategoryMapper.class})
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper( ProductMapper.class );

    ProductViewDTO toProductViewDTO(Product product);

    List<ProductViewDTO> toProductViewDTOs(List<Product> products);

    Product toProduct(ProductViewDTO productViewDTO);

//    Product toProduct(ProductCreateDTO productCreateDTO);

    ProductDetailDTO toProductDetailDTO(Product product);

    List<ProductDetailDTO> toProductDetailDTOs(List<Product> products);

    ProductAdminViewDTO toProductAdminViewDTO(Product product);

//    ProductCreateDTO toProductCreateDTO(Product product);

}
