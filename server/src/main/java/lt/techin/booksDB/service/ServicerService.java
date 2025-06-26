package lt.techin.booksDB.service;


import lombok.Data;
import lt.techin.booksDB.model.Servicer;
import lt.techin.booksDB.repository.ServicerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Service
public class ServicerService {
    private final ServicerRepository servicerRepository;

    public List<Servicer> findAllServicers() {
        return servicerRepository.findAll();
    }

    public Servicer findServicerById(long id) {
        return servicerRepository.findById(id).orElse(null);
    }

    public Servicer saveServicer(Servicer servicer) {
        return servicerRepository.save(servicer);
    }

    public void deleteServicerById(long id) {
        servicerRepository.deleteById(id);
    }
}