package edu.comillas.icai.gitt.pat.spring.mvc;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/plants")
public class PlantController {

    // Usamos una lista para almacenar las plantas mientras la aplicación esté en ejecución.
    private List<Plant> plants = new ArrayList<>();
    private int idCounter = 1;  // Para asegurar que cada planta tenga un ID único.

    // Crear una nueva planta
    @PostMapping
    public Plant createPlant(@RequestBody Plant plant) {
        // Validar si el nombre de la planta ya existe
        if (plants.stream().anyMatch(existingPlant -> existingPlant.getName().equalsIgnoreCase(plant.getName()))) {
            throw new DuplicatePlantNameException("El nombre de la planta '" + plant.getName() + "' ya existe. Introduce un nombre único.");
        }

        plant.setId(idCounter++);
        plants.add(plant);
        return plant;
    }

    // Leer todas las plantas
    @GetMapping
    public List<Plant> getAllPlants() {
        return plants;
    }

    // Leer una planta específica por su id
    @GetMapping("/{id}")
    public Plant getPlant(@PathVariable int id) {
        return plants.stream().filter(plant -> plant.getId() == id).findFirst().orElse(null);
    }

    // Actualizar una planta
    @PutMapping("/{id}")
    public Plant updatePlant(@PathVariable int id, @RequestBody Plant updatedPlant) {
        for (Plant plant : plants) {
            if (plant.getId() == id) {
                plant.setName(updatedPlant.getName());
                plant.setDescription(updatedPlant.getDescription());
                return plant;
            }
        }
        return null;  // Si no encontramos la planta con el id dado.
    }

    // Borrar una planta
    @DeleteMapping("/{id}")
    public String deletePlant(@PathVariable int id) {
        boolean removed = plants.removeIf(plant -> plant.getId() == id);
        if (removed) {
            return "Planta eliminada con éxito.";
        } else {
            return "Planta no encontrada.";
        }
    }
}

// Clase Planta, podríamos realizar otra clase pero al ser muy simple la definimos en el Controller

class Plant {
    private int id;
    private String name;
    private String description;

    // Constructor, getters y setters
    public Plant(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
