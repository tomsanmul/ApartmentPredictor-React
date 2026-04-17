# AGENT-05: TESTING

## Rol
Ingeniero de QA - Especialista en Testing

## Misión
Garantizar que los componentes son robustos mediante pruebas unitarias.

## Framework
**Vitest** (compatible con Vite y React 19)

## Checklist de Testing

### 1. Setup
- [ ] Configurar `vitest.config.js`
- [ ] Crear `src/__tests__/setup.js`
- [ ] Añadir scripts en `package.json`

### 2. Tests de Componentes
- [ ] Renderizado básico
- [ ] Estados iniciales
- [ ] Interacciones de usuario
- [ ] Casos de error

### 3. Tests de Servicios
- [ ] Llamadas API exitosas
- [ ] Manejo de errores
- [ ] Parámetros correctos

### 4. Tests de Hooks
- [ ] Estado inicial
- [ ] Efectos secundarios
- [ ] Actualizaciones de estado

### 5. Casos Borde
- [ ] Valores vacíos (null, undefined, "")
- [ ] Valores cero (0)
- [ ] Valores negativos
- [ ] Valores muy grandes
- [ ] Tipos incorrectos

## Casos de Prueba - Predicción

### ApartamentosFilter
| Test | Descripción | Esperado |
|------|-------------|----------|
| `renders correctly` | Renderiza todos los campos | Sin errores |
| `initial values` | Valores iniciales correctos | defaults correctos |
| `handles number input` | Cambio en campo numérico | Actualiza estado |
| `area=0` | metros cuadrados en 0 | Validación o manejo |
| `area negative` | metros cuadrados negativos | Error o拒绝 |
| `price negative` | precio negativo | Error o拒绝 |
| `empty fields` | Campos vacíos | Manejo correcto |
| `checkbox toggle` | Marcar/desmarcar | Actualiza estado |
| `submit filter` | Click en FILTER | Llama onFilter |
| `reset filter` | Click en RESET | Limpia formulario |

### PredictionService
| Test | Descripción | Esperado |
|------|-------------|----------|
| `predict with valid data` | Datos válidos | Precio predicho |
| `predict with missing fields` | Campos faltantes | Error 400 |
| `predict with invalid range` | Área > 10000 | Error 400 |

## Estructura de Archivos
```
src/
├── __tests__/
│   ├── setup.js              # Config global
│   ├── ApartmentsFilter.test.jsx
│   ├── predictionService.test.js
│   └── usePrediction.test.jsx
└── vitest.config.js
```

## Scripts Disponibles
```bash
npm run test        # Modo watch
npm run test:run    # Ejecución única
npm run test:coverage  # Coverage report
```

## Resultado Actual
```
Test Files  3 passed (3)
Tests       51 passed (51)
Duration    2.30s
```

## Habilidades Clave
- Vitest / Jest
- React Testing Library
- Mocking con `vi.fn()`
- Cobertura de código

## Archivos Creados
- `vitest.config.js`
- `src/__tests__/setup.js`
- `src/__tests__/ApartmentsFilter.test.jsx`
- `src/__tests__/apartmentsApiService.test.js`
- `src/__tests__/useApartments.test.jsx`

## Estado
✅ COMPLETADO

## Pendiente
- [ ] Tests para nuevos componentes de predicción (cuando se creen)
