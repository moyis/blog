---
title: "Code smells: Los 'bloaters'"
description: "Descubre y elimina los 'bloaters' en tu código."
date: "2025-02-11"
draft: false
tags:
  - code-smells
---

> Si algo huele mal, hay que cambiarlo

Code smell es un termino acuñado por **Kent Beck** y **Martin Fowler** para referirse a porciones de **código que nos
sugiere** (a veces nos pida a gritos) **un refactor**. En este articulo vamos a cubrir un grupo de 'smells' conocidos
como bloaters. Los **bloaters** son smells que colaboran a que nuestro **código aumente** en proporciones tan
gigantescas que son difíciles de manejar. Por lo general, estos smells **no aparecen de inmediato**, sino que **se
acumulan con el tiempo** a medida que nuestro software evoluciona.

## Primitive Obsession

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

## Long Methods

Como su nombre lo indica, **Long Method** (Método Largo en ingles) surge cuando un método tiene demasiadas líneas de código.
Esto lo hace difícil de entender, probar y mantener. A menudo, los métodos largos aparecen
de manera gradual. Comienzan como funciones simples, pero con el tiempo se les van agregando responsabilidades adicionales.
Esta práctica, aunque parezca inofensiva a corto plazo, puede generar problemas serios a largo plazo.

Veamos un ejemplo para ilustrar este punto:

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
El método `processInvoice()` tiene múltiples responsabilidades:  calcular el total, aplicar un descuento,
verificar el saldo del cliente, procesar el pago e imprimir un resumen del pedido. Y todo esto, dentro de un único bloque de código.
Este enfoque puede parecer sencillo al principio, pero a medida que un proyecto crece, este tipo de métodos largos se vuelve cada vez más
difícil de mantener y de probar.

¿Cómo podemos solucionar esto? Una opción inicial podría ser extraer cada paso a un método privado dentro de nuestra clase.
Si bien esto agruparía cada responsabilidad en su propio método,
una solución más robusta sería extraer cada funcionalidad a una **clase independiente**.

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
Esta estrategia no solo facilita la comprensión de nuestro método `processInvoice()`, sino que también simplifica los tests.
Ahora podemos crear pruebas específicas para `priceCalculator.calculate()`, `customer.pay()` y `orderSummaryPrinter.print()` de forma independiente.
Al refactorizar nuestro código de esta manera, logramos métodos más cortos, más fáciles de entender, probar y mantener.

## Data Clumps




Los **Data Clumps** son conjuntos de datos que aparecen repetidamente en distintos lugares del código.
Esto puede ser como listas de campos en clases o como parámetros en múltiples métodos.
Cuando los mismos conjuntos de datos se repiten en diversas secciones del programa, cualquier cambio en su estructura
requiere modificaciones en varios lugares, lo que incrementa la posibilidad de errores.

  A menudo, estos datos comparten un propósito común, a

Una señal clara de la presencia de **Data Clumps** es la sensación de **_déjà vu_** al examinar los parámetros de distintos métodos o los atributos de varias clases.
A menudo, estos datos comparten un propósito común, aunque su relación no sea evidente debido a diferencias en los nombres de las variables.

Consideremos la siguiente estructura en nuestra aplicación como ejemplo:
```java
record Shape(
  int red,
  int green,
  int blue,
  ... // Otros atributos
)
```

```java
void print(int r, int g, int b, String text) {
  ... // Lógica
}
```
Si estos mismos atributos (rojo, verde y azul) aparecen en varias clases o métodos, estamos duplicando código
innecesariamente, lo que dificulta la coherencia y la evolución del sistema.

Para solucionar este problema, podemos **extraer** estos atributos a una **nueva clase** `Color`
y utilizarla en lugar de repetir las mismas variables en múltiples lugares:

```java
record Color(
  int red,
  int green,
  int blue
)
```

```java
record Shape(
  Color color,
  ... // Otros atributos
)
```

```java
void print(Color color, String text) {
  ... // Lógica
}
```

Con esta refactorización, evitamos repetir los mismos tres atributos en múltiples clases y métodos.
`Color` se convierte en una representación más explícita de lo que significan esos valores, lo que hace que el código sea más intuitivo y fácil de entender.
Además, si en el futuro deseamos modificar la representación de los colores (por ejemplo, añadir un valor de transparencia), solo necesitaremos modificar
la clase `Color` en un único lugar, en vez de actualizar múltiples definiciones dispersas por el código.
Finalmente, la clase `Color` puede llegar a incluir métodos útiles, como la conversión a formato hexadecimal o la manipulación de tonos,
encapsulando la lógica relacionada con el concepto de color en un solo lugar.

## Conditional Complexity

Este problema surge cuando en nuestro código es difícil de entender debido a la abundancia de estructuras condicionales
(**`if`**, **`else`**, **`switch`**, etc.) anidadas y entrelazadas.
Cuando la lógica condicional se vuelve demasiado intrincada, el código se torna difícil de leer, mantener y probar.

Observemos el siguiente ejemplo para ilustrar este problema:

```java
double getPrice(Product product, Client client) {
  return product.price() * (1 - calculateDiscount(client));
}

double calculateDiscount(Client client) {
  if (client.vip()) {
    if (client.specialDiscount()) {
      return 0.30;
    } else {
      return 0.20;
    }
  } else {
    if (client.specialDiscount()) {
      return 0.10;
    } else {
      return 0.0;
    }
  }
}
```

En este fragmento de código, la función `calculateDiscount()` presenta una complejidad notable.
Para entender qué descuento se aplica en cada caso, debemos analizar cuidadosamente cada condición.
Este tipo de lógica intrincada puede volverse aún más confusa a medida que se añaden nuevas condiciones o se modifican las existentes.

¿Cómo podemos simplificar esta complejidad? Podemos recurrir a las **Strategies** (Patrones de Estrategia). Este patrón de diseño nos permite definir una familia de algoritmos, encapsularlos y hacerlos intercambiables.
Podemos definir una interfaz `Discount` que represente el concepto de descuento y crear clases concretas para cada tipo de descuento.

```java
interface Discount {
  double percentage();
}

record NoDiscount() implements Discount {
  @Override
  public double percentage() {
    return 0;
  }
}

record RegularDiscount() implements Discount {
  @Override
  public double percentage() {
    return 0.10;
  }
}

record VipDiscount() implements Discount {
  @Override
  public double percentage() {
    return 0.20;
  }
}

record SpecialVipDiscount() implements Discount {
  @Override
  public double percentage() {
    return 0.30;
  }
}
```

De esta manera, la función `getPrice()` quedaría simplificada a:

```java
double getPrice(Product product, Client client) {
  double discountPercentage = client.discount().percentage();
  return product.price() * (1 - discountPercentage);
}
```

Las reglas de descuento ahora están distribuidas en clases separadas, cada una con una responsabilidad única.
Si bien **inicialmente puede parecer que tenemos más líneas de código,**  delegamos la lógica de cálculo del descuento a la implementación concreta de `Discount` que corresponda al cliente.
Esto nos permite quitar o agregar nuevos descuentos sin necesidad de tocar el método `getPrice()`, **ganando flexibilidad y facilitando el mantenimiento futuro.**

## Referencias

- <a href="https://martinfowler.com/books/refactoring.html" target="_blank">Refactoring by Martin Fowler, with Kent
  Beck - Second Edition 2018</a>
- <a href="https://acairns.co.uk/posts/primitive-obsession" target="_blank">Primitive Obsession by Andrew Cairns</a>
- <a href="https://www.arhohuttunen.com/refactoring/" target="_blank">Refactoring by Arho Huttunen</a>
