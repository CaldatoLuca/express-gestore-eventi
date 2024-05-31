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

## Bonus

Creare le rotte per gestire le prenotazioni:

- **/events/:event/reservations** GET (index)
- **/events/:event/reservations** POST (store)
- **/events/:event/reservations/:reservation** DELETE (destroy)

Creare il model **models/reservation.js** con le seguenti proprietà:

- **id**
- **firstName**
- **lastName**
- **email**
- **eventId**

Creare nel model degli eventi una funzione per recuperare tutte le prenotazioni associate

Creare setter per ogni proprietà dei nostri model e validiamo i dati ricevuti, lanciando un errore

Creare errori personalizzati estendendo la classe Error

Se un evento è scaduto/passato non posso aggiungere o toglierci una prenotazione

Se un evento non ha piu posti diponibili non possiamo aggiungerci la prenotazione
