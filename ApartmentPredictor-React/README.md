# APARTMENTPREDICTOR  (FRONTEND REACT) 
# VERSIÓ ACTUAL: V. 3.0 

UBICACIÓN DEL PROJECTE EN GITHUB:  https://github.com/tomsanmul/ApartmentPredictor-React


DESCRIPCIÓ. ¿QUE ES APARTMENT PREDICTOR? 

ApartmentPredictor es una aplicació per prediure el preu d'un Apartment, depenent d'altres factors i variables típus del mercat.


#  V. 3.0
FEATURES :
    - Més desacoplament d'Apartment en:
        ApartmentCreate.jsx
        ApartmentCRUD.jsx
        ApartmentDetail.jsx -> Nova feature!!
        ApartmentListContainer.jsx <- Aquest era l'antic ApartmentListView.jsx . Només l'he renombrat.
    - Implementació d'un "CircularProgress" from "@mui/material/CircularProgress";    
    - Implementació d'una SideBar.
    - Implementació d'una pàgina HOME.
    - Implementació d'un selector mode clar / oscur
    - Implementació d'un LOGIN (NO FUNCIONAL, només es un mookup Formulari)


#  V. 2.0
FEATURES TÈCNIQUES PER MILLORAR ESCALABILITAT I COMPRENSIÓ  (READABLE) DEL PROJECTE.
    - Desacoplament d'Apartment en:
        ApartmentList.jsx
        ApartmentListView.jsx
    - Implementació d'un Service, Context i Provider per gestionar les dades.
    - Centralització amb 1 HOOK, una versió sense Reducer i un altre amb un useReducer.


#  V. 1.0
FEATURES:
    Implementades les funcions bàsiques d'un CRUD mitjançant API REST.
        Llistar, Crear, Modificar i Esborrar un apartment.


--------------------------------------------------------------------------------------------------------------------------


INSTRUCCIONS BÀSIQUES PER FER FUNCIONAR EL  PROJECTE.

1º: Instalar les dependècies del projecte.

    Obrim la terminal. Escribim: 
        cd ApartmentPredictor-React 
    per ubicant.se a: \ApartmentPredictor-React\ApartmentPredictor-React>
    
    i després escribim: 

    "npm install"

    Això instarà les dependències.


2º: Arrancar el projecte, primer, ens situem a la branca LOCAL desde la terminal escribim:

    "git checkout local"

    I despres escribim per la terminal: 

    "npm run dev"

    Aixecarà el projecte local, probablement a:   http://localhost:5173/

    Ja podem obrir el navegador escribint aquesta ruta.


3º: ¡¡IMPORTANT!! Ara, hem d'aixecar un SPRING BOOT "ApartmentPredictor" , que es el BACKEND del Projecte.

# APARTMENTPREDICTOR  (BACKEND REACT) 
    UBICACIÓN DEL PROJECTE EN GITHUB:  https://github.com/tomsanmul/ApartmentPredictor

    Lo mateix: 
        1. Descarregar el projecte 
        2. Obrir-lo en VsCode 
        3. Instalar les dependències escribint per la Terminal  "npm run install"  
        4. Canviar la branca escribint per la Terminal  "git checkout local" 
        5. Exccutar controller/ApartmentRestController
    
   

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
                Aquesta funció si existeix en el Backend de Java, però no en Frontend de React. 
                ¿Dubto si s'hauria d'implementar aqui també??



---------------------------------------------------------------------------------------------------------------------
