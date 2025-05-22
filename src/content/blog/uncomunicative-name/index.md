---
title: "Uncommunicative Name"
description: "Aprende a identificar y evitar el code smell 'Uncommunicative Name'. Mejora la legibilidad y mantenibilidad de tu código con ejemplos claros, buenas prácticas y consejos para desarrolladores."
date: "2025-05-22"
draft: false
tags:
  - code-smells
  - change-preventers
---

El nombre debe transmitir un significado y, preferiblemente, que este no sea ambiguo o engañoso. Si no se puede confiar en los nombres de variables, métodos y clases, se reduce drásticamente nuestra capacidad de entender todo, haciendo el código poco comunicativo.
Java

```java
public double calc(List<Double> l) {
    if (d.isEmpty()) {
      return 0.0;
    }
    double s = 0;
    for (double n : l) {
        s += n;
    }
    return s / d.size();
}
```

Si bien el método es simple, cuesta saber a simple vista qué está haciendo. Debemos intentar que nuestro código sea lo más expresivo posible. A menudo, no nos animamos a cambiar el nombre de las cosas, pensando que no vale la pena, pero un buen nombre puede ahorrar horas de confusión en el futuro, no solo para quien lo escribe, sino para todo el equipo y quienes mantendrán el código en el tiempo.
Java

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

Analizar un texto para entender qué sucede está buenísimo siempre y cuando estemos leyendo una novela policial, no código. Nuestro código debe ser simple y claro. Invertir tiempo en nombres que comunican es una necesidad fundamental para un código mantenible y un desarrollo eficiente.