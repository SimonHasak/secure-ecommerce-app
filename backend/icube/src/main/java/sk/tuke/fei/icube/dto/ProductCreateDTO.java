package sk.tuke.fei.icube.dto;

import lombok.Data;
import sk.tuke.fei.icube.model.Category;
import sk.tuke.fei.icube.model.Label;
import sk.tuke.fei.icube.model.Measurement;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class ProductCreateDTO {

    private String code;
    private String name;
    private String description;
    private String urlName;
    private BigDecimal price;
    private Integer quantity;
    private String visibleLabel;
    private String mainImage;
    private Set<CategoryDTO> categories = new HashSet<>();
    private Set<MeasurementDTO> measurements = new HashSet<>();
    private Set<LabelDTO> labels = new HashSet<>();
    private List<String> images = new ArrayList<>();

}
