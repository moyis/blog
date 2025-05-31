---
title: "Magic Number"
description: "Descubre cómo los 'magic numbers' afectan la legibilidad del código y aprende buenas prácticas para identificarlos y eliminarlos en tus proyectos de software."
date: "2025-04-26"
draft: false
tags:
  - code-smell
  - change-preventer
---

Los números sueltos, sin explicación, en nuestro código se conocen como `Magic Number`. Esta **practica dificulta la comprensión y el mantenimiento** del mismo. Si otra persona (o nosotros del futuro 😉) lee el código, no sabrá qué representa ese número ni por qué se eligió ese valor. Además, si el mismo número se usa en varios lugares y su significado cambia, es fácil cometer errores al modificarlo.

```java
double calculateFinalPrice(double price) {
  double total = price + 3.5;
  return total + (total * 0.21);
}
```

En este ejemplo, ¿Qué significan `3.5` y `0.21`? ¿Representan el costo de envío y el IVA? El código no lo deja claro, lo que puede generar confusión y errores.

La solución más sencilla es **darle un nombre significativo** a cada número, utilizando constantes:

```java
private static final int SHIPPING_COST = 3;
private static final double TAX_RATE = 0.21;

...

double calculateFinalPrice(double price) {
  double total = price + SHIPPING_COST;
  return total + (total * TAX_RATE);
}
```

Ahora, la intención de cada valor es clara y, si necesitamos cambiar el costo de envío o la tasa de IVA, solo debemos que modificarlo en un lugar.

¿Siempre hay que evitar los números en el código? No, **no todos los números son "magic numbers"**. Por ejemplo, inicializar un contador en `0` o incrementar en `1` es una práctica común y aceptada, ya que su significado es evidente:

```java
for (int i = 0; i < n; i++) {
  // ...
}
```
