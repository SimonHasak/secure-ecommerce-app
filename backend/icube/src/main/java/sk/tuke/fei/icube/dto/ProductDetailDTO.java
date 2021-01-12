package sk.tuke.fei.icube.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import sk.tuke.fei.icube.model.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Šimon Hašák
 */
@Data
public class ProductDetailDTO {

    private Long id;
    private String code;
    private String description;
    private String mainImage;
    private String name;
    private BigDecimal price;
    private Integer quantity;
    private String urlName;
    private String visibleLabel;
    private Set<MeasurementDTO> measurements = new HashSet<>();
    private List<Image> images = new ArrayList<>();

}
