package lt.techin.booksDB.repository;

import lt.techin.booksDB.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}

