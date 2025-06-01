---
title: "Uncommunicative Name: La importancia de elegir nombres claros en programación"
description: "Descubre por qué evitar nombres poco descriptivos en variables y métodos mejora la legibilidad del código. Aprende buenas prácticas para nombrar en programación."
date: "2025-05-22"
draft: false
tags:
  - code-smell
  - change-preventer
---

> Existen dos problemas difíciles en la informática: la invalidación de caché, nombrar las cosas y los errores por uno.

<cite>Leon Bambrick</cite>

Si bien encontrar el nombre correcto para nuestras variables, métodos y clases suele resultar difícil. Un mal nombre obliga a los desarrolladores a invertir tiempo extra en descifrar qué representa cada elemento. Este code smell es conocido como `Uncommunicative Name`

**Un nombre debe transmitir un significado claro y, preferiblemente, no ser ambiguo ni engañoso.** Si no se puede confiar en los nombres de variables, métodos y clases, se reduce drásticamente nuestra capacidad de entender el código, haciéndolo propenso a errores.

Veamos el siguiente ejemplo:

```java
public double calc(List<Double> l) {
    if (l.isEmpty()) {
        return 0.0;
    }
    double s = 0;
    for (double n : l) {
        s += n;
    }
    return s / l.size();
}
```

Aunque el método es corto, cuesta entender a simple vista qué está haciendo. ¿Cuanto tiempo tardamos en darnos cuenta que el método calcula el promedio dentro de una lista de números? Los nombres como `calc`, `l`, `s` y `n` no aportan suficiente información sobre su función o contenido.

Ahora, ¿Qué pasa si damos nombres descriptivos a nuestras variables?:

```java
public double calculateAverage(List<Double> numbers) {
    if (numbers.isEmpty()) {
        return 0.0;
    }
    double total = 0;
    for (double number : numbers) {
        total += number;
    }
    return total / numbers.size();
}
```

En el ejemplo refactorizado, los nombres (`calculateAverage`, `numbers`, `total`, `number`) dejan clara su intención. De inmediato sabemos qué son y para qué se utilizan. Incluso, el nombre del método ya nos prepara para entender qué vamos a leer. Podemos saber exactamente qué hace sin necesidad de revisar su implementación.

Leer y analizar un texto para entender qué sucede está buenísimo, siempre y cuando se trate de una novela. Cuando leemos código, este **debe ser simple y claro**. Invertir tiempo en elegir nombres que comuniquen correctamente es fundamental para lograr un código fácil de iterar, beneficiando tanto a nosotros como al resto del equipo.
