package lt.techin.booksDB.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "mechanics")
@Data
public class Mechanic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @NotBlank
    @Size(max = 60)
    private String name;

    @NotNull
    @NotBlank
    @Size(max = 60)
    private String surname;

    @NotNull
    @NotBlank
    @Size(max = 60)
    private String specialization;

    @NotNull
    @NotBlank
    @Size(max = 60)
    private String city;

    @ManyToOne
    @JoinColumn(name = "servicer_id")
    private Servicer servicer;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id")
    private List<Review> reviews;
}
