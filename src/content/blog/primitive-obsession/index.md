---
title: "Primitive Obsession"
description: "Descubre cómo evitar el code smell 'Primitive Obsession' en Java. Aprende a identificarlo y refactorizar tu código. Ejemplos prácticos y consejos para desarrolladores."
date: "2025-02-11"
draft: false
tags:
  - code-smells
  - bloaters
---

Cuando desarrollamos software, solemos recurrir a tipos de datos básicos como String, int o Map para modelar información. Sin embargo, aunque estos tipos están siempre disponibles, **abusar de ellos puede ocultar la intención de nuestro código y dificultar su mantenimiento**. Este problema se conoce como **Primitive Obsession**.

El **Primitive Obsession** ocurre cuando usamos tipos primitivos o genéricos para representar conceptos complejos o con reglas de negocio propias. Esto puede llevarnos a errores sutiles, pérdida de expresividad o código duplicado.

Veamos la clase `Person`, que almacena información personal:

```java
public record Person(
  String id,
  String name,
  String email,
  String street,
  String zipCode,
  String city,
  String country) {
}
```

A primera vista, este diseño parece correcto. Sin embargo, si lo analizamos en profundad, podemos ver algunos problemas:

- **Falta de agrupación semántica**: Los atributos `street`, `zipCode`, `city` y `country` representan una dirección, pero están dispersos en la clase.

- **Duplicación de lógica:** Cada vez que necesitemos validar el formato del `email` o del `zipCode`, deberemos repetir la lógica o crear utilidades externas.

- **Falta de validación:** Cualquier valor puede usarse para construir un objeto Person. Por ejemplo, podríamos intercambiar el id y el email sin que el compilador lo detecte.

```java
  var person1 = new Person("abcde-fgh", "Fulano", "fulano@example.com", ...);
  var person2 = new Person("fulano@example.com", "Fulano", "abcde-fgh", ...);
```

Cada vez que necesitemos asegurarnos de que el `email` es válido o que el `zipCode` cumple un formato específico, tendremos que duplicar esa lógica en distintos lugares o crear una clase utilitaria `Validator` para manejar esa funcionalidad. Por último, los atributos `street`, `zipCode`, `city` y `country`, engloban un mismo concepto (`Address`) y, seguramente, se utilizan juntos.


Podemos mejorar nuestro ejemplo utilizando una técnica conocida como **Value Objects**. La idea  es encapsular conceptos relevantes en clases específicas. De esta manera, no solo revelamos la intención de nuestro código, sino que también nos abre las puertas a otras mejoras.

```java
public record Person(PersonId id, String name, Email email, Address address) {
}

public record PersonId(String value) {
  public Id {
    if (value == null || value.isBlank()) {
        throw new IllegalArgumentException("El ID no puede estar vacío");
    }
  }
}

public record Email(String email) {
  private static final String VALID_EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";

  public Email {
    if (email == null || !email.matches(VALID_EMAIL_REGEX)) {
      throw new IllegalArgumentException("Invalid email address");
    }
  }
}

public record Address(String street, ZipCode zipCode, String city, String country) {
}

public record ZipCode(String zipCode) {
  private static final int MAX_ZIP_CODE_LENGTH = 5;

  public ZipCode {
    if (MAX_ZIP_CODE_LENGTH != zipCode.length()) {
      throw new IllegalArgumentException("Zip code must be " + MAX_ZIP_CODE_LENGTH + " characters long");
    }
  }
}
```

Luego del refactor, 

- **Mayor seguridad en tiempo de compilación:** El compilador detectará errores si intentamos asignar un tipo incorrecto a un campo (por ejemplo, pasar un `Email` donde se espera un `PersonId`).

- **Validación centralizada:** Las reglas de negocio y validaciones se definen una sola vez, dentro de la clase correspondiente, evitando posibles inconsistencias.

**Código más expresivo y mantenible:** Los tipos específicos comunican mejor la intención del código, facilitando su lectura y mantenimiento.
   
**Agrupación semántica:** Conceptos relacionados, como la dirección, se encapsulan en una sola clase.