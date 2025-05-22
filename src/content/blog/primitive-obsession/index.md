---
title: "Primitive Obsession"
description: "Descubre cómo evitar el code smell 'Primitive Obsession' en Java. Aprende a identificarlo y refactorizar tu código. Ejemplos prácticos y consejos para desarrolladores."
date: "2025-02-11"
draft: false
tags:
  - code-smells
  - bloaters
---

Cuando desarollamos, tenemos a nuestra disposición tipos de datos básicos como `String`, `int` o incluso `Map`.
Sin embargo, que los tengamos disponibles no significa que debamos utilizarlos para todo. El **uso excesivo de tipos primitivos**,
también conocido como **Primitive Obsession**, ocurre cuando usamos estas estructuras de datos genéricas en lugar de encapsular conceptos en clases específicas.

Para entender mejor este problema, veamos un ejemplo común: una clase `Person` que guarda información personal:

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

A primera vista, este diseño parece claro y directo, pero si lo analizamos con más detalle, encontramos algunos problemas:

- Al tener muchos atributos de tipo `String`, cualquier valor podría usarse para construir este objeto. Incluso
  podríamos intercambiar el orden de los argumentos y el código seguiría compilando sin errores.

```java
  var person1 = new Person("abcde-fgh", "Fulano", "fulano@example.com", ...);
  var person2 = new Person("fulano@example.com", "Fulano", "abcde-fgh", ...);
```

- Cada vez que necesitemos asegurarnos de que el `email` es válido o que el `zipCode` cumple un formato específico, tendremos
  que duplicar esa lógica en distintos lugares o crear una clase utilitaria `Validator` para manejar esa funcionalidad.

- Hay atributos (`street`, `zipCode`, `city` y `country`) que pareciera hacen referencia a un mismo concepto
  (`Address`), pero están al mismo nivel de los demás.

Para solucionar estos problemas, podemos encapsular conceptos en clases propias, una técnica conocida como **Value Classes**.
Este enfoque no solo mejora la claridad del código, sino que también simplifica su mantenimiento.

Así es como podemos refactorizar nuestro ejemplo:

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

- Ahora, cada atributo de nuestra clase `Person` tiene un **tipo específico**, lo que evita confusiones y nos protege en
  tiempo de compilación contra errores al pasar valores incorrectos.
- `email` y `zipCode` validan automáticamente que los datos sean correctos, eliminando la necesidad de repetir
  comprobaciones en distintas partes del código.
- `street`, `zipCode`, `city` y `country` ahora forman parte de una clase `Address`, agrupando estos conceptos
  relacionados en una única entidad.