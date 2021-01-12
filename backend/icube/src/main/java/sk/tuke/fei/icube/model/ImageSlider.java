package sk.tuke.fei.icube.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.Generated;
import lombok.NonNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Šimon Hašák
 */
@Data
@Entity
@Table(name = "image_slider")
public class ImageSlider implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "slider_interval", nullable = false)
    private int interval;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "image_slider_id", referencedColumnName = "id")
    private List<Image> images = new ArrayList<>();
}
