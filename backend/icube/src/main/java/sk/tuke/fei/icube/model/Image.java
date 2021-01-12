package sk.tuke.fei.icube.model;


import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author Šimon Hašák
 */
@Data
@Entity
@Table(name = "image")
public class Image implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "image_name", nullable = true)
    private String name;

    @Column(name = "url_address", nullable = false)
    private String urlAddressOfImage;

    public Image() {}

    public Image(String urlAddressOfImage) {
        this.urlAddressOfImage = urlAddressOfImage;
    }

}
