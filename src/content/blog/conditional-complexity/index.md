---
title: "Complejidad Condicional: Cómo Simplificar tu Código"
description: "Descubre cómo reducir la complejidad condicional en tu código usando el Patrón Estrategia. Mejora la legibilidad, mantenimiento y flexibilidad de tu código."
date: "2025-04-23"
draft: false
tags:
  - code-smell
  - bloater
---

La complejidad condicional (**Conditional Complexity**) es un problema que surge en nuestro código cuando se presentan estructuras condicionales (como `if`, `else`, `switch`, etc.) anidadas y entrelazadas. Cuando la lógica condicional se vuelve demasiado intrincada, el código se torna difícil de leer, mantener y testear. Este fenómeno puede llevar a errores y a un aumento en el tiempo de desarrollo.

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

En este fragmento de código, la función `calculateDiscount()` presenta una complejidad notable. Para entender qué descuento se aplica en cada caso, debemos analizar cuidadosamente cada condición. Este tipo de lógica puede volverse aún más confusa a medida que se añaden nuevas condiciones o se modifican las existentes.

¿Cómo podemos simplificar esta complejidad? Una solución efectiva es recurrir a los Patrones de Estrategia. Este patrón de diseño nos permite definir una familia de algoritmos, encapsularlos y hacerlos intercambiables. Podemos definir una interfaz `Discount` que represente el concepto de descuento y crear clases concretas para cada tipo de descuento.

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

Las reglas de descuento ahora están distribuidas en clases separadas, cada una con **una responsabilidad única**. Aunque inicialmente puede parecer que tenemos más líneas de código, hemos delegado la lógica de cálculo del descuento a la implementación concreta de `Discount` que corresponda al cliente. Esto nos permite añadir o quitar descuentos sin necesidad de modificar el método `getPrice()`, ganando flexibilidad y facilitando el mantenimiento futuro.
