---
title: "Long Method: Cómo Refactorizar Métodos Largos"
description: "Descubre qué es el Long Method, sus riesgos y cómo refactorizar métodos largos para mejorar la claridad, pruebas y mantenimiento del código"
date: "2025-02-22"
draft: false
tags:
  - code-smell
  - bloater
---

Como su nombre lo indica, **Long Method** (Método Largo en inglés) surge cuando un método tiene demasiadas líneas de código. Esto lo hace difícil de entender, testear y mantener. A menudo, los métodos largos aparecen de manera gradual. Comienzan como funciones simples, pero con el tiempo se les van agregando responsabilidades adicionales. Esta práctica, aunque parezca inofensiva a corto plazo, puede generar problemas serios a largo plazo.

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

El método `processInvoice()` tiene múltiples responsabilidades: calcular el total, aplicar un descuento, verificar el saldo del cliente, procesar el pago e imprimir un resumen del pedido. Todo esto se encuentra dentro de **un único bloque de código**. Este enfoque puede parecer sencillo al principio, pero a medida que un proyecto crece, este tipo de métodos largos se vuelve cada vez más difícil de mantener y de probar.

¿Cómo podemos abordar este problema? Una opción inicial es **extraer cada paso a un método privado** dentro de nuestra clase. Aunque esta solución ayuda a reducir la cantidad de código en el método, puede llevar a violar el principio de responsabilidad única. Por lo tanto, una alternativa más efectiva sería **extraer cada funcionalidad en una clase independiente**.

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

De este modo, delegamos el cálculo del total a una nueva clase llamada `PriceCalculator`. La verificación y reducción del saldo del cliente ahora se gestionan a través de un nuevo método `pay()` dentro de la clase `Customer`. Finalmente, la impresión del resumen de la orden se ha trasladado a una nueva clase denominada `OrderSummaryPrinter`.

Esta estrategia no solo mejora la claridad del método `processInvoice()`, sino que también simplifica los tests. Ahora podemos crear unit tests específicos para `priceCalculator.calculate()`, `customer.pay()` y `orderSummaryPrinter.print()` de manera independiente. Al refactorizar el código de esta forma, logramos métodos más concisos, que son más fáciles de entender, probar y mantener.