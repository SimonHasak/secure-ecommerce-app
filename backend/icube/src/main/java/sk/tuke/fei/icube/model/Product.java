package sk.tuke.fei.icube.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.context.annotation.EnableMBeanExport;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

@Entity
@Data
@Table(name = "product")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String code;

    private String description;

    private String mainImage;

    @Column(name = "product_name", nullable = false)
    private String name;

    private BigDecimal price;
    private int quantity;

    @Column(name = "url_name", nullable = false, unique = true)
    private String urlName;

    @Column(name = "visible_label")
    private String visibleLabel;

    @ManyToMany(cascade = { CascadeType.MERGE }, fetch = FetchType.LAZY)
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id"))
    @JsonIgnore
    private Set<Category> categories = new HashSet<>();

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinTable(
            name = "product_label",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "label_id"))
    @JsonIgnore
    private Set<Label> labels = new HashSet<>();

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinTable(
            name = "product_measurement",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "measurement_id"))
    @JsonIgnore
    private Set<Measurement> measurements = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private List<Image> images = new ArrayList<>();

    public Product(String code,
                   String description,
                   String mainImage,
                   String name,
                   BigDecimal price,
                   int quantity,
                   String urlName,
                   String visibleLabel,
                   Set<Category> categories,
                   Set<Label> labels,
                   Set<Measurement> measurements,
                   List<Image> images) {
        this.code = code;
        this.description = description;
        this.mainImage = mainImage;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.urlName = urlName;
        this.visibleLabel = visibleLabel;
        this.categories = categories;
        this.labels = labels;
        this.measurements = measurements;
        this.images = images;
    }

    public Product() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(id, product.id) &&
                Objects.equals(code, product.code) &&
                Objects.equals(urlName, product.urlName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, urlName);
    }
}