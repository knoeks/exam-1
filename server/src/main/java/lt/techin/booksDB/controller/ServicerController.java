package lt.techin.booksDB.controller;

import lombok.Data;
import lt.techin.booksDB.model.Servicer;
import lt.techin.booksDB.service.ServicerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class ServicerController {
    private final ServicerService servicerService;

    public ServicerController(ServicerService servicerService) {
        this.servicerService = servicerService;
    }

    @GetMapping("/servicers")
    public ResponseEntity<List<Servicer>> getServicers() {
        return ResponseEntity.ok(servicerService.findAllServicers());
    }

    @GetMapping("/servicers/{id}")
    public ResponseEntity<Servicer> getServicerById(@PathVariable long id) {
        Servicer servicer = servicerService.findServicerById(id);
        if (servicer == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(servicer);
    }

    @PostMapping("/servicers")
    public ResponseEntity<Servicer> saveServicer(@RequestBody Servicer servicer) {
        Servicer savedServicer = servicerService.saveServicer(servicer);

        return ResponseEntity.ok(
                savedServicer
        );
    }

    @PutMapping("/servicers/{id}")
    public ResponseEntity<Servicer> updateServicer(@PathVariable long id, @RequestBody Servicer servicerDetails) {
        // First, find the existing servicer by its ID.
        Servicer existingServicer = servicerService.findServicerById(id);

        // If the servicer with the given ID doesn't exist, return a 404 Not Found response.
        if (existingServicer == null) {
            return ResponseEntity.notFound().build();
        }

        // Update the fields of the existing servicer with the data from the request body.
        existingServicer.setName(servicerDetails.getName());
        existingServicer.setAddress(servicerDetails.getAddress());
        existingServicer.setManagerName(servicerDetails.getManagerName());

        // Save the updated servicer to the database.
        final Servicer updatedServicer = servicerService.saveServicer(existingServicer);

        // Return the updated servicer with a 200 OK status.
        return ResponseEntity.ok(updatedServicer);
    }
}
