package sk.tuke.fei.icube.mapper;

import org.mapstruct.Mapper;
import sk.tuke.fei.icube.dto.MeasurementDTO;
import sk.tuke.fei.icube.model.Measurement;

import java.util.Set;

/**
 * @author Šimon Hašák
 */
@Mapper
public interface MeasurementMapper {

    MeasurementDTO toMeasurementDTO(Measurement measurement);

    Set<MeasurementDTO> toMeasurementDTOs(Set<Measurement> measurements);

    Set<Measurement> toMeasurements(Set<MeasurementDTO> measurementDTOs);

}
