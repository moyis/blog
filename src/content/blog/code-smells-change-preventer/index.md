---
title: "Code smells: 'change preventer'"
description: "Descubre y elimina los 'bloaters' en tu código."
date: "2025-04-23"
draft: false
tags:
  - code-smells
---

> Si algo huele mal, hay que cambiarlo

Code smell es un termino acuñado por **Kent Beck** y **Martin Fowler** para referirse a porciones de **código que nos
sugiere** (a veces nos pida a gritos) **un refactor**. En este articulo vamos a cubrir un grupo de 'smells' conocidos
como change preventer. Imaginemos que queremos renovar una habitación de nuestra casa, pero cada vez que intentamos mover un mueble, descubrimos que está atornillado al suelo, conectado a las paredes y enredado con otros elementos. La tarea, que parecía sencilla, se convierte en una pesadilla compleja y costosa. De manera similar, los **change preventer** en el código actúan como obstáculos invisibles que complican y encarecen cualquier intento de modificación.

## Magic Number
Magic numbers are literal values that appear in the code. The meaning of the values is unclear from the code

## Uncommunicative Name
A name that doesn't communicate its intent well enough. Poor names make it harder to understand what's going on in the code. They can also be misinterpreted and hurt the flow of reading.

## Divergent Change
You find yourself changing a class for different reasons repeatedly. Your class may have too many responsibilities

## Shotgun Surgery
Changes affect many classes.

## Referencias

- TBW
