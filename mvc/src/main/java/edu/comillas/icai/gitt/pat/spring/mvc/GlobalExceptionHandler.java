/// Quería hacer un controlador de excepciones pero no se que he hecho mal
/// que no llega a salir el 400 en la consola aunque funcione asi que lo dejo comentado ya que se sigue lanzando la
/// excepcion con el mensaje aunque no sea el código de error exacto y al final esto es un extra

/*

package edu.comillas.icai.gitt.pat.spring.mvc;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Maneja la excepción de nombre duplicado
    @ExceptionHandler(DuplicatePlantNameException.class)
    public ResponseEntity<String> handleDuplicatePlantNameException(DuplicatePlantNameException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);  // 400 Bad Request
    }
} */