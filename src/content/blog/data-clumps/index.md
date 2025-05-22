---
title: "Data Clumps"
description: "Aprende qué son los 'data clumps', cómo identificarlos y refactorizarlos para mejorar la calidad y mantenibilidad de tu código."
date: "2025-02-22"
draft: false
tags:
  - code-smells
  - bloaters
---

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

Con este refactor, evitamos repetir los mismos tres atributos en múltiples clases y métodos.
`Color` se convierte en una representación más explícita de lo que significan esos valores, lo que hace que el código sea más intuitivo y fácil de entender.
Además, si en el futuro deseamos modificar la representación de los colores (por ejemplo, añadir un valor de transparencia), solo necesitaremos modificar
la clase `Color` en un único lugar, en vez de actualizar múltiples definiciones dispersas por el código.
Finalmente, la clase `Color` puede llegar a incluir métodos útiles, como la conversión a formato hexadecimal o la manipulación de tonos,
encapsulando la lógica relacionada con el concepto de color en un solo lugar.