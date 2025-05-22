---
title: "Conditional Complexity"
description: "Aprende a identificar y reducir la complejidad condicional en tu código. Mejora la legibilidad, el mantenimiento y la escalabilidad de tus proyectos eliminando estructuras condicionales anidadas."
date: "2025-04-23"
draft: false
tags:
  - code-smells
  - bloaters
---

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
Si bien **inicialmente puede parecer que tenemos más líneas de código,** delegamos la lógica de cálculo del descuento a la implementación concreta de `Discount` que corresponda al cliente.
Esto nos permite quitar o agregar nuevos descuentos sin necesidad de tocar el método `getPrice()`, **ganando flexibilidad y facilitando el mantenimiento futuro.**