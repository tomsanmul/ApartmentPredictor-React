# AGENT-06: DOCUMENTATION

## Rol
Technical Writer - Documentador Técnico

## Misión
Mantener la documentación del proyecto actualizada y accesible.

## Checklist de Documentación

### 1. README.md
- [ ] Versión actualizada
- [ ] Nuevas features documentadas
- [ ] Instrucciones de instalación
- [ ] Endpoints documentados

### 2. JSDoc en Código
- [ ] Funciones exportadas documentadas
- [ ] Props de componentes
- [ ] Tipos y typedefs
- [ ] Ejemplos de uso

### 3. Guías
- [ ] Guía de nuevas funcionalidades
- [ ] Tutoriales de uso
- [ ] FAQs si es necesario

### 4. Changelog
- [ ] Registro de cambios por versión
- [ ] Breaking changes documentados

## Archivos Documentados

### README.md
**Ubicación:** `/README.md`

**Contenido:**
- Versión actual: V. 7.0
- Sistema de 6 agentes de IA
- Funcionalidades de predicción
- Instrucciones de uso
- Lista de endpoints

### ApartmentsFilter.jsx
**Ubicación:** `/src/apartment/ApartmentsFilter.jsx`

**JSDoc añadido:**
- `@fileoverview` - Descripción del módulo
- `@typedef {FilterState}` - Tipo de estado
- `@typedef {ParsedFilters}` - Tipo de filtros parseados
- `@typedef {ApartmentsFilterProps}` - Props del componente
- JSDoc del componente con ejemplos

### apartmentsApiService.jsx
**Ubicación:** `/src/middleware/apartmentsApiService.jsx`

**JSDoc añadido:**
- `@fileoverview` - Descripción del servicio
- `@constant API_BASE_URL`
- `@typedef {Apartment}` - Tipo de apartamento
- `@typedef {PageResponse}` - Respuesta paginada
- JSDoc de cada método con ejemplos

### Guía de Predicción
**Ubicación:** `/docs/GUIAPrediccion.md`

**Contenido:**
- Descripción del sistema
- Arquitectura Frontend + Backend
- Tabla de factores
- Documentación del endpoint `/predict`
- Ejemplos de implementación
- Consideraciones importantes

## Formato JSDoc

### Función Exportada
```javascript
/**
 * Descripción breve de la función.
 * @param {string} param1 - Descripción del parámetro.
 * @param {number} [param2=0] - Descripción del parámetro opcional.
 * @returns {Promise<Object>} Promesa que resuelve con el resultado.
 * @throws {Error} Error cuando ocurre un problema.
 * 
 * @example
 * const result = await myFunction('test', 42);
 * console.log(result);
 */
export async function myFunction(param1, param2 = 0) {
  // ...
}
```

### Componente React
```jsx
/**
 * Componente de ejemplo.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.title - Título a mostrar.
 * @param {Function} props.onClick - Callback al hacer click.
 * @param {'primary'|'secondary'} [props.variant='primary'] - Variante visual.
 * @returns {JSX.Element} El componente renderizado.
 * 
 * @example
 * <ExampleComponent 
 *   title="Mi Título" 
 *   onClick={() => console.log('click')} 
 * />
 */
export default function ExampleComponent({ title, onClick, variant = 'primary' }) {
  return <button onClick={onClick}>{title}</button>;
}
```

## Template para Nuevas Features

```markdown
# [Nombre de Feature]

## Descripción
Breve descripción de qué hace.

## Uso
Instrucciones de uso.

## Props/Parámetros
| Nombre | Tipo | Requerido | Descripción |
|--------|------|-----------|-------------|
| ... | ... | ... | ... |

## Ejemplos
```jsx
// Ejemplo de código
```

## Notas
Limitaciones o consideraciones importantes.
```

## Habilidades Clave
- Markdown
- JSDoc
- Documentación técnica
- Clarity en explicaciones

## Estado
✅ COMPLETADO

## Siguiente Paso
Cuando se creen nuevos componentes de predicción, añadir JSDoc según este template.
