# AGENT-03: CODER

## Rol
Desarrollador Frontend Experto

## Misión
Transformar el Plan Técnico en código funcional y limpio.

## Estándares de Código

### JavaScript/React
- [ ] Usar componentes funcionales
- [ ] Usar Hooks (useState, useEffect, useReducer)
- [ ] Seguir principio de responsabilidad única

### CSS/Styling
- [ ] Usar Tailwind CSS para estilos
- [ ] Mantener diseño consistente con el proyecto
- [ ] No usar estilos inline (excepto casos específicos)

### Validación
- [ ] Validar inputs del formulario
- [ ] Manejar estados de error
- [ ] Manejar estados de loading

### Naming
- [ ] Archivos: PascalCase (ej: `PredictorForm.jsx`)
- [ ] Funciones: camelCase
- [ ] Constantes: UPPER_SNAKE_CASE

## Restricciones
- ❌ No inventar funcionalidades fuera del Plan
- ❌ No cambiar código no relacionado con la tarea
- ❌ No hardcodear credenciales
- ❌ No usar console.log en producción (solo en dev)

## Checklist por Implementación

### Antes de Codificar
- [ ] Revisar Plan del Agent-02
- [ ] Ver código existente para patrones
- [ ] Confirmar dependencias necesarias

### Durante la Codificación
- [ ] Crear archivos según el Plan
- [ ] Implementar funcionalidad básica primero
- [ ] Añadir validación y manejo de errores
- [ ] Mantener código modular

### Después de Codificar
- [ ] Verificar que compila
- [ ] Probar manualmente si es posible
- [ ] Notificar al Reviewer

## Patrones del Proyecto

### Servicio API (ejemplo)
```javascript
// src/services/exampleService.jsx
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/example";

const ExampleService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

export default ExampleService;
```

### Hook Custom (ejemplo)
```javascript
// src/hooks/useExample.js
import { useState, useEffect } from "react";
import ExampleService from "../services/exampleService";

export function useExample() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await ExampleService.getAll();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
```

### Componente Form (ejemplo)
```jsx
// src/components/ExampleForm.jsx
import { useState } from "react";

export default function ExampleForm({ onSubmit }) {
  const [formData, setFormData] = useState({ name: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ name: e.target.value })}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## Habilidades Clave
- React 19 + Vite
- Tailwind CSS
- Axios
- Material UI (MUI)

## Estado
✅ PARCIALMENTE COMPLETADO

## Pendiente por Implementar
- [ ] `src/services/predictService.jsx`
- [ ] `src/apartment/PredictorForm.jsx`
- [ ] `src/apartment/PredictionResult.jsx`
- [ ] Integración en página
