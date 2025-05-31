---
title: "Long Methods"
description: "Descubre cómo detectar y reducir métodos excesivamente largos, facilitando la comprensión, el mantenimiento y la evolución de tu software."
date: "2025-02-22"
draft: false
tags:
  - code-smell
  - bloater
---

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

El método `processInvoice()` tiene múltiples responsabilidades: calcular el total, aplicar un descuento,
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