---
title: "Data Clumps: Qué son y cómo eliminarlos en tu código"
description: "Descubre qué son los Data Clumps, por qué dificultan el mantenimiento del código y aprende a eliminarlos con ejemplos prácticos y refactorización efectiva."
date: "2025-02-22"
draft: false
tags:
  - code-smell
  - bloater
---

Los **Data Clumps** son conjuntos de datos que aparecen repetidamente en distintos lugares del código, como listas de campos en clases o parámetros en múltiples métodos. Esta repetición puede llevar a que cualquier cambio en su estructura requiera modificaciones en varios lugares, aumentando el riesgo de errores y dificultando el mantenimiento del código.

A menudo, estos datos **comparten un propósito común**, aunque su relación no siempre sea evidente. Una señal clara de la presencia de Data Clumps es la **sensación de _déjà vu_** al examinar los parámetros de distintos métodos o los atributos de varias clases.

Veamos esto con un ejemplo:

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

Si los atributos (rojo, verde y azul) se repiten en varias clases o métodos, estamos dificultando la evolución de nuestro código. Por ejemplo, si deseamos añadir el atributo `opacity`, tendríamos que buscar en todo el código donde se utilizan estas tres variables para incorporar la nueva propiedad. Esta tarea se vuelve aún más complicada si, como en el ejemplo, los atributos tienen nombres diferentes en distintas partes del código.

Para solucionar este problema, podemos **extraer estos atributos a una nueva clase** `Color`
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

Con este refactor, eliminamos la repetición de los mismos tres atributos en múltiples clases y métodos. La clase `Color` hace que el código sea más intuitivo, fácil de entender y extensible. Si decidimos agregar el atributo `opacity`, simplemente lo añadimos a la clase `Color`, y este nuevo valor estará disponible en todos los lugares donde se utilice.

Además, la clase `Color` puede incluir métodos útiles, como la conversión a formato hexadecimal. De esta manera encapsulamos la lógica relacionada con el concepto de color en un solo lugar. Esto no solo mejora la claridad del código, sino que también facilita su mantenimiento y evolución a lo largo del tiempo.