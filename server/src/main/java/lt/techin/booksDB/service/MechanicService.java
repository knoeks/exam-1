package lt.techin.booksDB.service;

import lombok.Data;
import lt.techin.booksDB.model.Mechanic;
import lt.techin.booksDB.model.Review;
import lt.techin.booksDB.repository.MechanicRepository;
import lt.techin.booksDB.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Data
@Service
public class MechanicService {
    private final MechanicRepository mechanicRepository;
    private final ReviewRepository reviewRepository;

    public List<Mechanic> findAllMechanics() {
        return mechanicRepository.findAll();
    }

    public Mechanic findMechanicById(long id) {
        return mechanicRepository.findById(id).orElse(null);
    }

    public Mechanic saveMechanic(Mechanic mechanic) {
        return mechanicRepository.save(mechanic);
    }

    public void deleteMechanicById(long id) {
        mechanicRepository.deleteById(id);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
}
