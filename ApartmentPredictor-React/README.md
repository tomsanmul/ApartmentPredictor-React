# APARTMENTPREDICTOR  (FRONTEND REACT)
# VERSIO ACTUAL: V. 6.0

UBICACION DEL PROJECTE EN GITHUB:  https://github.com/tomsanmul/ApartmentPredictor-React

 

#  V. 6.0  SISTEMA DE 6 AGENTES DE IA
FEATURES :
    - Sistema de 6 Agents d'IA + 1 Orquestador per a la gestio intel ligent del projecte. Documentats a [/agents](./agents/)
    - 51 tests unitarios con Vitest en [/src/__tests__/](./src/__tests__/)
    - Nova funcionalitat de PREDICCIO de preus mitjancant ML (Machine Learning)
    - Integracio amb el backend Spring Boot per a predictions en temps real
    - Documentacio JSDoc en componentes principales
    - Guia de prediccion en [/docs/GUIAPrediccion.md](./docs/GUIAPrediccion.md)

       Agente               Mision Principal                                                Skill Clave
       ----------------     ------------------------------------------------------------    ----------------------------------------------

       0. Orchestrator:     Gestionar el ciclo de vida y dar el "visto bueno" final.        Gestion de proyectos y logica de flujo.
       1. Analyzer:         Analizar el impacto de los cambios en el codigo existente.      Lectura de dependencias y arquitectura React.
       2. Plan:             Desglosar la tarea en micro-pasos tecnicos.                     Arquitectura de software.
       3. Coder:            Escribir codigo limpio, modular y siguiendo el estilo actual.   React, Hooks, Tailwind/CSS.
       4. Reviewer:         Hacer de "Senior Developer" critico.                            Seguridad, Performance y Clean Code.
       5. Testing:          Garantizar que el componente de prediccion es robusto.          Unit Testing y Edge Cases.
       6. Documentation:    Explicar el "que" y el "como" para humanos.                     Markdown y documentacion tecnica.

    ORQUESTADOR - FUNCIONALITATS:
    - Coordina i supervisatots els 6 agents
    - Gestiona el flux de treball de desenvolupament
    - Aprova o rebutja els canvis proposats

    PREDICCIO - FUNCIONALITATS:
    - Prediccio de preus d'apartaments basant-se en caracteristiques
    - Factors considerats: area, habitacions, banys, pisos, etc.
    - Utilitza models de regressio per a l'estimacio



#  V. 5.0
FEATURES :
    - Implementacio d'Schools (per donar d'alta) + 1 Mapa
    - Implementacio de LOGIN amb AWS Cognito (sense amplify).


#  V. 4.0
FEATURES :
    - Implementacio d'una nova feature: ApartmentFilter.jsx
    - Implementacio d'una barra de navegacio inferior.
    - Es mostra tambe la etiqueta informacio "Showing 1-30 of 644 apartments" que indica on estas de la barra de navegacio.


#  V. 3.0
FEATURES :
    - Mes desacoplament d'Apartment en:
        ApartmentCreate.jsx
        ApartmentCRUD.jsx
        ApartmentDetail.jsx -> Nova feature!!
        ApartmentListContainer.jsx <- Aquest era l'antic ApartmentListView.jsx . Nomas l'he renombrat.
    - Implementacio dun "CircularProgress" from "@mui/material/CircularProgress";    
    - Implementacio d'una SideBar.
    - Implementacio d'una pagina HOME.
    - Implementacio dun selector mode clar / oscur
    - Implementacio dun LOGIN (NO FUNCIONAL, nomes es un mookup Formulari)


#  V. 2.0
FEATURES TECNIQUES PER MILLORAR ESCALABILITAT I COMPRENSIÓ  (READABLE) DEL PROJECTE.
    - Desacoplament d'Apartment en:
        ApartmentList.jsx
        ApartmentListView.jsx
    - Implementacio dun Service, Context i Provider per gestionar les dades.
    - Centralitzacio amb 1 HOOK, una versio sense Reducer i un altre amb un useReducer.


#  V. 1.0
FEATURES:
    Implementades les funcions basics dun CRUD mitjancant API REST.
        Llistar, Crear, Modificar i Esborrar un apartment.


--------------------------------------------------------------------------------------------------------------------------


INSTRUCCIONS BASIQUES PER FER FUNCIONAR EL  PROJECTE.

1: Instalar les dependencies del projecte.

    Obrim la terminal. Escribim: 
        cd ApartmentPredictor-React 
    per ubicant.se a: \ApartmentPredictor-React\ApartmentPredictor-React>
    
    i despres escribim: 

    "npm install"

    Aixo instara les dependencies.


2: Arrancar el projecte, primer, ens situem a la branca LOCAL desde la terminal escribim:

    "git checkout local"

    I despres escribim per la terminal: 

    "npm run dev"

    Aixecara el projecte local, probablement a:   http://localhost:5173/

    Ja podem obrir el navegador escribint aquesta ruta.


3: !!IMPORTANT!! Ara, hem d'aixecar un SPRING BOOT "ApartmentPredictor" , que es el BACKEND del Projecte.

# APARTMENTPREDICTOR  (BACKEND REACT) 
    UBICACION DEL PROJECTE EN GITHUB:  https://github.com/tomsanmul/ApartmentPredictor

    Lo mateix: 
        1. Descarregar el projecte 
        2. Obrir-lo en VsCode 
        3. Instalar les dependencies escribint per la Terminal  "npm run install"  
        4. Canviar la branca escribint per la Terminal  "git checkout local" 
        5. Exccutar controller/ApartmentRestController
    

----------------------------------------------------------------------------------------------------------------------------

Llista d'EndPoints que s'utilitzant en el Frontend:

    "/getAll"   -> Metode GET que retorna el llistat complet d'Apartments. Sutilitza a la HOME.


    "/getById"  -> Metode GET que retorna un Apartament en concret, passant-li per parametre el seu ID.
    
    "/create"   -> Metode POST que crea un Apartament. 
                Obligatoriament se li ha de pasar un parametre objecte "Apartament" amb totes les dades per ser creat.

    "/update"   -> Metode POST que modifica un Apartament. 
                Obligatoriament se li ha de pasar un parametre "Apartament" amb totes les dades per ser modificat.

    "/deleteById" -> Metode POST que modifica un Apartament. 
   

    "/create_apartments" -> Metode POST que crea una llista d'Apartaments aleatoriament (amb FAKER).
                Obligatoriament se li ha de pasar un paramaetre integer "quantity" que definira la quantitat d'apartament a crear.
                Aquesta funcio si existeix en el Backend de Java, pero no en Frontend de React. 
                Dubto si shauria dimplementar aqui tambe?? 


    "/predict" -> Metode POST que retorna una prediccio de preu dapartament.
                Utilitza models de Machine Learning per estimar el preu.
                S'utilitza a la seccio de prediccio de la aplicacio.


---

## TESTING

El proyecto incluye tests unitarios con **Vitest**.

```bash
npm run test:run    # Ejecutar tests una vez
npm test            # Modo watch
npm run test:coverage  # Reporte de cobertura
```

**Estado:** 51 tests pasando en 3 archivos de test.

