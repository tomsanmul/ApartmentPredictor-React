# GUIA DE USO: Sistema de Prediccion de Precios

## Descripcion General

El sistema de prediccion de ApartmentPredictor utiliza modelos de Machine Learning para estimar el precio de apartamentos basandose en diversas caracteristicas fisicas y de ubicacion.

---

## Arquitectura del Sistema

```
+-------------------------------------------------------------+
|                    FRONTEND (React)                         |
|  +-----------------------------------------------------+   |
|  |  ApartmentPredictor-React                            |   |
|  |  - ApartmentsFilter.jsx (JSDoc documentado)          |   |
|  |  - apartmentsApiService.jsx (JSDoc documentado)      |   |
|  +-----------------------------------------------------+   |
+-------------------------------------------------------------+
                            |
                            | REST API
                            v
+-------------------------------------------------------------+
|                    BACKEND (Spring Boot)                     |
|  +-----------------------------------------------------+   |
|  |  ApartmentPredictor (Java)                           |   |
|  |  - ML Model (Linear Regression)                      |   |
|  |  - Prediction Endpoint (/api/v1/apartment/predict)  |   |
|  +-----------------------------------------------------+   |
+-------------------------------------------------------------+
```

---

## Factores de Prediccion

El modelo considera los siguientes factores para calcular el precio estimado:

| Factor                | Descripcion                              | Tipo    |
|-----------------------|------------------------------------------|---------|
| area                  | Area del apartamento en metros cuadrados | numeric |
| bedrooms              | Numero de habitaciones                   | numeric |
| bathrooms             | Numero de banos                          | numeric |
| stories               | Numero de pisos                          | numeric |
| parking               | Numero de plazas de parking              | numeric |
| mainroad              | Cerca de carretera principal             | boolean |
| guestroom             | Tiene habitacion de invitados           | boolean |
| basement             | Tiene sotano                             | boolean |
| hotwaterheating      | Calefaccion de agua caliente            | boolean |
| airconditioning      | Aire acondicionado                       | boolean |
| prefarea             | Area preferida                           | boolean |
| furnishingstatus     | Estado de amueblamiento                  | enum    |

---

## Uso del API de Prediccion

### Endpoint: POST /api/v1/apartment/predict

#### Peticion (Request Body)

```json
{
  "area": 120,
  "bedrooms": 3,
  "bathrooms": 2,
  "stories": 2,
  "parking": 1,
  "mainroad": "yes",
  "guestroom": "no",
  "basement": "yes",
  "hotwaterheating": "no",
  "airconditioning": "yes",
  "prefarea": "no",
  "furnishingstatus": "furnished"
}
```

#### Respuesta (Response)

```json
{
  "predictedPrice": 275000.00,
  "confidence": 0.92,
  "factors": {
    "area": 120,
    "bedrooms": 3
  },
  "modelVersion": "1.0.0"
}
```

---

## Ejemplo de Implementacion Frontend

### 1. Agregar metodo de prediccion al servicio

```javascript
// En src/middleware/apartmentsApiService.jsx

/**
 * Predice el precio de un apartamento basandose en sus caracteristicas
 * 
 * @function predictPrice
 * @memberof ApartmentsAPIService
 * @async
 * @param {Object} apartmentFeatures - Caracteristicas del apartamento
 * @returns {Promise<Object>} Promise con el precio predicho y confianza
 */
predictPrice: async (apartmentFeatures) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/predict`, apartmentFeatures);
        console.log("Predicted price:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error predicting price:", error);
        throw error;
    }
}
```

### 2. Componente de Prediccion

```jsx
// src/components/PricePredictor.jsx

import React, { useState } from "react";
import ApartmentsAPIService from "../middleware/apartmentsApiService";

export default function PricePredictor() {
  const [features, setFeatures] = useState({
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    stories: 0,
    parking: 0,
    mainroad: "no",
    guestroom: "no",
    basement: "no",
    hotwaterheating: "no",
    airconditioning: "no",
    prefarea: "no",
    furnishingstatus: "none"
  });
  
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const result = await ApartmentsAPIService.predictPrice(features);
      setPrediction(result);
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  return (
    <div className="predictor-container">
      {/* Formulario de caracteristicas */}
      <button onClick={handlePredict}>Predecir Precio</button>
      
      {prediction && (
        <div className="prediction-result">
          <h3>Precio Estimado: ${prediction.predictedPrice}</h3>
          <p>Confianza: {(prediction.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}
```

---

## Consideraciones Importantes

### 1. Calidad de Datos
- El modelo requiere datos historicos precisos para funcionar correctamente
- Valores faltantes pueden afectar la precision de la prediccion

### 2. Rangos Validos
- **area**: 100 - 10000 metros cuadrados
- **bedrooms**: 1 - 10
- **bathrooms**: 1 - 10
- **stories**: 1 - 5
- **parking**: 0 - 10

### 3. Limitaciones
- El modelo es una estimacion, no un valor exacto
- Factores externos (mercado economico, ubicacion especifica) no estan incluidos
- Se recomienda usar el resultado como referencia, no como valor definitivo

---

## Sistema de 6 Agentes + Orquestador (V. 6.0 - V. 7.0)

El proyecto utiliza un sistema multi-agente para gestionar el desarrollo:

| Agente          | Rol                          |
|-----------------|------------------------------|
| 0. Orchestrator | Coordina todos los agentes    |
| 1. Analyzer     | Analiza impacto de cambios   |
| 2. Plan         | Desglosa tareas tecnicas     |
| 3. Coder        | Escribe codigo               |
| 4. Reviewer     | Revisa seguridad y calidad   |
| 5. Testing      | Garantiza robustez           |
| 6. Documentation| Documenta el proyecto        |

---

## Archivos Documentados con JSDoc

### 1. ApartmentsFilter.jsx
- Ubicacion: `src/apartment/ApartmentsFilter.jsx`
- Proposito: Componente de filtrado de apartamentos
- Caracteristicas documentadas:
  - Tipos de datos (FilterState, ParsedFilters)
  - Props del componente
  - Metodos privados con JSDoc
  - Ejemplos de uso

### 2. apartmentsApiService.jsx
- Ubicacion: `src/middleware/apartmentsApiService.jsx`
- Proposito: Servicio API para operaciones CRUD
- Caracteristicas documentadas:
  - Tipos de datos (Apartment, PageResponse, ParsedFilters)
  - Todos los metodos del servicio
  - Parametros y valores de retorno
  - Ejemplos de uso con codigo

---

## Actualizaciones en V. 7.0

- Se actualizo el README.md con la nueva seccion de caracteristicas
- Se anadieron comentarios JSDoc completos a ApartmentsFilter.jsx
- Se anadieron comentarios JSDoc completos a apartmentsApiService.jsx
- Se documento el endpoint de prediccion /predict

---

*Ultima actualizacion: Abril 2026*
*Autor: ApartmentPredictor Team*
