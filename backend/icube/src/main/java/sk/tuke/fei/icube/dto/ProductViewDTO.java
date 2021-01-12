package sk.tuke.fei.icube.dto;

import lombok.Data;
import sk.tuke.fei.icube.model.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Šimon Hašák
 */
@Data
public class ProductViewDTO {

    private Long id;
    private String mainImage;
    private String name;
    private BigDecimal price;
    private String urlName;
    private String visibleLabel;

}
