package sk.tuke.fei.icube.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductAdminViewDTO {

    private Long id;
    private String mainImage;
    private String name;
    private BigDecimal price;
    private Integer quantity;
    private String code;

}
