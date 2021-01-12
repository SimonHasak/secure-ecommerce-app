package sk.tuke.fei.icube.mapper;

import org.mapstruct.Mapper;
import sk.tuke.fei.icube.dto.ImageCreateProductDTO;
import sk.tuke.fei.icube.dto.ImageDTO;
import sk.tuke.fei.icube.model.Image;

import java.util.List;

/**
 * @author Šimon Hašák
 */
@Mapper
public interface ImageMapper {

    ImageDTO toImageDTO(Image image);

    List<Image> toImages(List<ImageCreateProductDTO> imageCreateProductDTOs);

}
