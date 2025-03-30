package edu.comillas.icai.gitt.pat.spring.mvc;


// Excepción personalizada para manejar la validación del nombre único
public class DuplicatePlantNameException extends RuntimeException {
    public DuplicatePlantNameException(String message) {
        super(message);
    }
}
