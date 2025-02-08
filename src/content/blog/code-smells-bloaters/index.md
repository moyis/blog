---
title: "Code smells: Los 'bloaters'"
description: "Descubre y elimina los 'bloaters' en tu código."
date: "2024-11-20"
draft: false
---

>Si algo huele mal, hay que cambiarlo

Code smell es un termino acuñado por **Kent Beck** y **Martin Fowler** para referirse a porciones de **código que nos sugiere** (a veces nos pida a gritos) **un refactor**. En este articulo vamos a cubrir un grupo de 'smells' conocidos como bloaters. Los **bloaters** son smells que colaboran a que nuestro **código aumente** en proporciones tan gigantescas que son difíciles de manejar. Por lo general, estos smells **no aparecen de inmediato**, sino que **se acumulan con el tiempo** a medida que nuestro software evoluciona.

## Primitive Obsession

Uno de los errores más comunes en el diseño de software es el **uso excesivo de tipos primitivos**, también conocido como **Primitive Obsession**. El hecho de que podamos representar algo como `String`, `int` o incluso un `Map` no significa que siempre debamos hacerlo.

Para entender mejor este problema, veamos nuestro ejemplo de una clase `Person`, que almacena información personal:

```java
public record Person(
    String id,
    String name,
    String email,
    String street,
    String zipCode,
    String city,
    String country) {}
```

A simple vista, este diseño parece claro y directo, pero si lo analizamos con más detalle, encontramos algunos problemas:

- Al tener muchos atributos del tipo `String`, cualquier valor podría utilizarse para construir este objeto. Incluso podríamos intercambiar el orden de los argumentos y el código seguiría compilando sin errores.

```java
var person1 = new Person("abcde-fgh", "Fulano", "fulano@example.com", ...);
var person2 = new Person("fulano@example.com", "Fulano", "abcde-fgh", ...);
```

- Cada vez que necesitemos asegurarnos de que el `email` es válido o que el `zipCode` cumple un formato específico, tendremos que duplicar esa lógica en distintos lugares o crear una clase utils.Validator para manejar esa funcionalidad.

- Hay atributos (`street`, `zipCode`, `city` y `country`) que pareciera hacen referencia a un mismo concepto (`Address`), pero están al mismo nivel de los demás atributos.

Para solucionar estos problemas, podemos encapsular conceptos en clases propias, una técnica conocida como **Value Classes**. Este enfoque no solo mejora la claridad del código, sino que también simplifica su mantenimiento. Así es como podemos refactorizar nuestro ejemplo:

```java
public record Person(PersonId id, String name, Email email, Address address) {}

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

public record Address(String street, ZipCode zipCode, String city, String country) {}

public record ZipCode(String zipCode) {
  private static final int MAX_ZIP_CODE_LENGTH = 5;

  public ZipCode {
    if (MAX_ZIP_CODE_LENGTH != zipCode.length()) {
      throw new IllegalArgumentException(
          "Zip code must be " + MAX_ZIP_CODE_LENGTH + " characters long");
    }
  }
}
```

- Ahora, cada atributo de nuestra clase `Person` tiene un tipo específico, lo que evita confusiones y nos protege en tiempo de compilación contra errores al pasar valores incorrectos.
-  `email` y `zipCode` validan automáticamente que los datos sean correctos, eliminando la necesidad de repetir comprobaciones en distintas partes del código.
- `street`, `zipCode`, `city` y `country` ahora forman parte de una clase `Address`, agrupando estos conceptos relacionados en una única entidad.

## Long Methods

Como su nombre lo indica, Long Method (Método Largo en ingles) es un *smell* que ocurre cuando un método tiene demasiadas líneas de código, lo que lo hace difícil de entender, probar y mantener. A menudo, los métodos largos surgen de manera gradual. Se inicia con una función simple, pero con el tiempo se le agregan responsabilidades adicionales. Esta práctica, aunque parezca inofensiva en el corto plazo, conlleva problemas graves a largo plazo.

Podemos verlo en el siguiente ejemplo:

```java
public void processInvoice(Customer customer, List<Item> items, double discountRate) {
  double total = 0;

  for (Item item : items) {
    total += item.getPrice() * item.getQuantity();
  }

  if (discountRate > 0) {
    total -= total * discountRate;
  }

  if (customer.getBalance() >= total) {
    customer.setBalance(customer.getBalance() - total);
    logger.info("Pago exitoso. Saldo restante: {}", customer.getBalance());
  } else {
    logger.warn("Pago fallido. Saldo insuficiente.");
    return;
  }

  logger.info("Resumen del pedido para el cliente: {}", customer.getName());
  for (Item item : items) {
    logger.info("{} x {}", item.getName(), item.getQuantity());
  }
}
```

El método `processInvoice()` es largo y posee múltiples responsabilidades: el cálculo del total, aplicar el descuento, la verificación del saldo del cliente, el procesamiento del pago y la impresión del resumen del pedido. Todo esto en un solo bloque de código. Este enfoque puede parecer sencillo al principio, pero a medida que el proyecto crece, este tipo de métodos largos se vuelve cada vez más difícil de mantener y testear.

Podemos solucionarlo extrayendo cada paso en un método privado dentro de nuestra clase. Si bien eso agruparía cada responsabilidad en su propio método, una mejor solución seria extraer cada funcionalidad en una clase independiente.

```java
public void processInvoice(Customer customer, List<Item> items, double discountRate) {
  double total = priceCalculator.calculate(items, discountRate);

  if (!customer.pay(total)) {
    logger.warn("Pago fallido. Saldo insuficiente.");
    return;
  }

  logger.info("Pago exitoso. Saldo restante: {}", customer.getBalance());
  orderSummaryPrinter.print(customer, items);
}
```

Esta estrategia no solo facilita el entendimiento de nuestro método `processInvoice()`, sino que también nos facilita su testeo. Ya que podemos crear pruebas para `priceCalculator.calculate()`, `customer.pay()` y `orderSummaryPrinter.print()` de manera independiente.


## Data Clumps
Data Clumps are repeated list of fields, parameters, or both. Sometimes duplication is not apparent, as the names are different, yet their intent is the same.
Several Rename refactorings may be necessary to make the Data Clumps obvious

### ¿Cómo reconocerlo?

- deja vu in field lists or parameter lists of both

### ¿Cómo solucionarlo?

- Introduce Parameter Object
- Extract Class
- Preserve Whole Object

## Conditional Complexity

Complex conditional statements often grow from a simple if. We should be critical about conditionals and boolean expressions, as they appear more difficult to read and maintain than you might expect.

### ¿Cómo reconocerlo?
- conditionals with primitive boolean expressions

### ¿Cómo solucionarlo?
- Replace conditional with strategy
- Move Embellishment to Decorator
- Decompose Conditional
- Replace State-Altering conditionals with State
- Introduce Null Object 

## Referencias

- <a href="https://martinfowler.com/books/refactoring.html" target="_blank">Refactoring by Martin Fowler, with Kent Beck - Second Edition 2018</a>
- <a href="https://acairns.co.uk/posts/primitive-obsession" target="_blank">Primitive Obsession - Andrew Cairns</a>