---
title: "Magic Number"
description: "Descubre cómo los 'magic numbers' afectan la legibilidad del código y aprende buenas prácticas para identificarlos y eliminarlos en tus proyectos de software."
date: "2025-04-26"
draft: false
tags:
  - code-smells
  - change-preventers
---

El `Magic Number` es un `smell` que se refiere al uso directo de números sin explicación en el código, dificultando la legibilidad, el mantenimiento y aumentando el riesgo de errores, ya que su significado no es obvio y las modificaciones son propensas a inconsistencias.

```java
double calculateFinalPrice(double price) {
  double total = price + 3.5;
  return total + (total * 0.21);
}
```

¿Qué significan el `3` y el `1.21`? No es explícito, uno está leyendo el código y se queda pensando: ¿Por qué justo `3` y no `5`, por ejemplo? La solución por suerte es simple. Darle nombre a estos números.

```java
private static final int SHIPPING_COST = 3;
private static final double TAX_RATE = 0.21;

double calculateFinalPrice(double price) {
  double total = price + SHIPPING_COST;
  return total + (total * TAX_RATE);
}
```

Al darles un nombre, su intención es clara. Ademas, evita confusiones, ya que podríamos estar usando otro `3` en otra parte del código, el cual tiene un significado completamente distinto. Algo a tener en cuenta, si el propósito del numero es obvio, no hay necesidad de reemplazarlo. Un ejemplo de esto seria inicializar un contador en 0 o incrementar en 1.

En resumen, evitar los magic numbers no solo mejora la claridad del código, sino que también facilita su mantenimiento y reduce el riesgo de errores.