---
title: "Feature Envy: Identifica y Soluciona este Code Smell"
description: "Evita el acoplamiento innecesario entre clases eliminando Feature Envy. Aplica buenas prácticas y el principio Tell, Don't Ask en tus proyectos."
date: "2025-06-07"
draft: false
tags:
  - code-smell
  - coupler
---

Tanto en el desarrollo de software, como en la vida en general, la "envidia" nunca es buena. Cuando notamos que una parte de nuestro código está más interesada en los datos de otra clase que en los propios, es una señal clara de que algo no está bien. A este problema se le conoce como **Feature Envy**.

**Feature Envy** es un _code smell_ que ocurre cuando un método **accede con frecuencia a los datos o métodos de otra clase**, en lugar de trabajar principalmente con los datos de su propia clase. Esto suele indicar un acoplamiento innecesario entre clases. ¿Cuántas veces hemos visto (o escrito) código como este?

```java
​public​ ​void​ applyDiscount(Customer customer, OrderId orderId, double discount) {​
  Totals totals = customer​
      .getOrders()
      .find(orderId)
      .getTotals();
​   totals.setGrandTotal(totals.grandTotal - discount);
​   totals.setDiscount(discount);
​}
```

En este caso, el método `applyDiscount()` accede a varios niveles de otras clases: obtiene la lista de pedidos del cliente, busca un pedido específico y luego accede a los totales de ese pedido. Por último, se encarga de actualizar el total y el descuento. Esto genera un fuerte acoplamiento entre las clases `Customer`, `Order` y `Totals`. Si alguna de estas clases cambia, es probable que este método también deba modificarse.

Para evitar este problema, podemos aplicar el principio **Tell, Don't Ask** ("Ordena, no preguntes"). Este principio sugiere que, en lugar de solicitar datos internos de un objeto para luego modificarlos, deberíamos pedirle al objeto que realice la acción por sí mismo.

Sabiendo esto, podemos comenzar a erradicar el **Feature Envy** de nuestro ejemplo al delegar las responsabilidades a cada clase. El primer paso seria darle la responsabilidad aplicar el descuento a la clase `Totals`.

```java
​public​ ​void​ applyDiscount(Customer customer, OrderId orderId, double discount) {​
  customer​
      .getOrders()
      .find(orderId)
      .getTotals()
      .applyDiscount(discount);
```

Lo mismo aplica a la clase `Customer`. En lugar de traernos todas las ordenes y buscar la que nos interesa, deberíamos obtener la orden que queremos directamente del cliente.

```java
​public​ ​void​ applyDiscount(Customer customer, OrderId orderId, double discount) {​
  customer​
      .findOrder(orderId)
      .getTotals()
      .applyDiscount(discount);
```

Por ultimo, podríamos aplicar el mismo criterio a nuestras clases `Order` y `Totals`. ¿Por qué el mundo exterior debe saber que una orden usa un objeto aparte para guardar sus totales?

```java
​public​ ​void​ applyDiscount(Customer customer, OrderId orderId, Discount discount) {​   customer
  customer
  ​     .findOrder(orderId)​
       .applyDiscount(discount);
  ​ }
```

De esta forma, **cada clase se encarga de sus propias responsabilidades** y el método principal deja de depender de los detalles internos de otras clases.

En este punto, podríamos pensar que deberíamos añadir un método `applyDiscountToOrder(orderId)` a los clientes. Pero no es asi, el principio **Tell, don't ask** es una guía para detectar posibles problemas, pero no una regla absoluta.

¿Hasta dónde debemos delegar? En toda aplicación existen ciertos conceptos de alto nivel que son universales. En este ejemplo, esos conceptos incluyen clientes y pedidos. No tiene sentido ocultar los pedidos completamente dentro de los objetos cliente ya que estos tienen existencia propia.
