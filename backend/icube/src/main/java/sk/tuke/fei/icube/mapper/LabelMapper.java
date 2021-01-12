package sk.tuke.fei.icube.mapper;

import org.mapstruct.Mapper;
import sk.tuke.fei.icube.dto.LabelDTO;
import sk.tuke.fei.icube.model.Label;

import java.util.Set;

/**
 * @author Šimon Hašák
 */
@Mapper
public interface LabelMapper {

    Set<Label> toLabels(Set<LabelDTO> labelCreateProductDTOs);

    Set<LabelDTO> toLabelDTOs(Set<Label> labels);

}
