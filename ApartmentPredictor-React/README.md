# APARTMENTPREDICTOR  (FRONTEND REACT) 
# VERSIÓ ACTUAL: V. 1.0 

UBICACIÓN DEL PROJECTE EN GITHUB:  https://github.com/tomsanmul/ApartmentPredictor-React


DESCRIPCIÓ. ¿QUE ES APARTMENT PREDICTOR? 

ApartmentPredictor es una aplicació per prediure el preu d'un Apartment, depenent d'altres factors i variables típis del mercat.
En la primera versió, només es una aplicació per crear y gestionar Apartament fàcilment amb operacions CRUD.
En versions posteriors implementaremt diverses features per prediure els preus, així com llegir opinones dels clients.



#  V. 1.0
FEATURES:
    Implementades les funcions bàsiques d'un CRUD mitjançant API REST.
        Llistar, Crear, Modificar i Esborrar un apartment.



Proximes FEATURES:  (si arribem!)

    - Quan es crea un apartament, a més, s'ha de poguer pujar un fitxer JPG  (de 300 kb com a màxim) que es la foto i mostrar-la.
    (Ara mateix només tenen foto els Apartaments ja creats), els nous NO tenen foto.
    
    - PRediure el Preu d'un Apartament
    - Mostrar Reviews i Reviewers. 


----------------------------------------------------------------------------------------------------------------------


INSTRUCCIONS BÀSIQUES PER FER FUNCIONAR EL  PROJECTE.

1º: Instalar les dependècies del projecte.

    Obrim la terminal. Escribim: 
        cd ApartmentPredictor-React 
    per ubicant.se a: \ApartmentPredictor-React\ApartmentPredictor-React>
    
    i després escribim: 

    "npm install"

    Això instarà les dependències.


2º: Arrancar el projecte, escribint per la terminal: 

    "npm run dev"

    Aixecarà el projecte local:   http://localhost:5173/
    Ja podem obrir el navegador amn aquesta ruta.


3º: ¡¡IMPORTANT!! hem d'aixecar un SPRING BOOT "ApartmentPredictor" , que es el BACKEND del Projecte.
# APARTMENTPREDICTOR  (BACKEND REACT) 
    UBICACIÓN DEL PROJECTE EN GITHUB:  https://github.com/tomsanmul/ApartmentPredictor

    Lo mateix: Un cop descarregat el projecte, instalar les dependències amn "npm install" i executar el projecte. 


-----------------------------------------------------------------------------------------------------------------------

Llista d'EndPoints que s'utilitzant en el Frontend:

    "/getAll"   -> Mètode GET que retorna el llistat complet d'Apartments. Sútilitza a la HOME.


    "/getById"  -> Mètode GET que retorna un Apartament en concret, pasant-li per paràmetre el seu ID.
    
    "/create"   -> Mètode POST que crea un Apartament. 
                Obligatoriament se li ha de pasar un paràmetre objecte "Apartament" amb totes les dades per ser creat.

    "/update"   -> Mètode POST que modifica un Apartament. 
                Obligatoriament se li ha de pasar un paràmetre "Apartament" amb totes les dades per ser modificat.

    "/deleteById" -> Mètode POST que modifica un Apartament. 
   
    "/create_apartments" -> Mètode POST que crea una llista d'Apartaments aleatoriament (amb FAKER).
                Obligatoriament se li ha de pasar un paràemtre integer "quantity" que definirà la quantitat d'apartament a crear.
                Aquesta funció si existeix en el Backend de Java, però no en Frontend de React. Dubto si s'hauria d'implementar aqui també.



-------------------------------------------------------------------------------------------------------------
