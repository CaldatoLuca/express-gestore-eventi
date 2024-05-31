# Express Gestore Eventi

Creare API per un applicazione che gestirà degli eventi.

## Milestone 1

Creare le rotte, lasciando vuote le funzioni nel controller:

- **/events** GET (index)
- **/events** POST (store)
- **/events/:event** PUT (update)

## Milestone 2

Creare il model **models/event.js** con le seguenti proprietà:

- **id**
- **title**
- **description**
- **date**
- **maxSeats**

Tramite metodi statici, far in modo di leggere e salvare i dati su un file json dedicato.

## Milestone 3

Implementare il model nelle funzioni del controller, poter recuperare uno(tramite id) o tutti gli eventi.
Possibilità di passare dei filtri tramite query string alla rotta index.

## Milestone 4

Gestire eventuali errori 404 e 500 tramite middleware.
