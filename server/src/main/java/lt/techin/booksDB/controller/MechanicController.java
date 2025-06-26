package lt.techin.booksDB.controller;

import lt.techin.booksDB.model.Mechanic;
import lt.techin.booksDB.model.Review;
import lt.techin.booksDB.service.MechanicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
@CrossOrigin(origins = "http://localhost:5173")
public class MechanicController {

    private final MechanicService mechanicService;

    // Using constructor injection is a best practice for dependencies.
    public MechanicController(MechanicService mechanicService) {
        this.mechanicService = mechanicService;
    }

    @GetMapping
    public ResponseEntity<List<Mechanic>> getMechanics() {
        List<Mechanic> mechanics = mechanicService.findAllMechanics();
        return ResponseEntity.ok(mechanics);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mechanic> getMechanicById(@PathVariable long id) {
        Mechanic mechanic = mechanicService.findMechanicById(id);
        if (mechanic == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mechanic);
    }

    @PostMapping("/{mechanicId}/reviews")
    public ResponseEntity<Mechanic> createMechanic(@RequestBody Mechanic mechanic) {
        Mechanic savedMechanic = mechanicService.saveMechanic(mechanic);

        // Build the location URI of the newly created resource.
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedMechanic.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedMechanic);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@PathVariable long id, @RequestBody Review review) { // The @PathVariable long id here is not used to associate the review with a mechanic.
        Review savedReview = mechanicService.saveReview(review); // This saves the review but doesn't link it to the mechanic.

        // Build the location URI of the newly created resource.
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedReview.getId()) // Should be savedReview.getId()
                .toUri();

        return ResponseEntity.created(location).body(savedReview); // Should be savedReview
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mechanic> updateMechanic(@PathVariable long id, @RequestBody Mechanic mechanicDetails) {
        Mechanic existingMechanic = mechanicService.findMechanicById(id);
        if (existingMechanic == null) {
            return ResponseEntity.notFound().build();
        }

        // Update fields from the request body
        existingMechanic.setName(mechanicDetails.getName());
        existingMechanic.setSurname(mechanicDetails.getSurname());
        existingMechanic.setSpecialization(mechanicDetails.getSpecialization());
        existingMechanic.setCity(mechanicDetails.getCity());
        // You might need a more sophisticated way to update relationships
        // but for a simple update, this works.
        existingMechanic.setServicer(mechanicDetails.getServicer());

        Mechanic updatedMechanic = mechanicService.saveMechanic(existingMechanic);
        return ResponseEntity.ok(updatedMechanic);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMechanic(@PathVariable long id) {
        if (mechanicService.findMechanicById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        mechanicService.deleteMechanicById(id);
        return ResponseEntity.noContent().build();
    }
}
