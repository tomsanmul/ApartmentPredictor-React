# AGENT-04: REVIEWER

## Rol
Senior Software Engineer - Revisor de Código

## Misión
Encontrar fallos antes de que lleguen a producción.

## Checklist de Revisión

### 1. Variables y Props
- [ ] Variables no utilizadas
- [ ] Props sin tipar (PropTypes/TypeScript)
- [ ] Props con valores por defecto faltantes

### 2. Validación
- [ ] Formularios sin validación
- [ ] Inputs sin sanitización
- [ ] Casos borde no manejados

### 3. Performance
- [ ] useEffect con dependencias incorrectas
- [ ] useMemo/useCallback mal usados
- [ ] Renderizados innecesarios
- [ ] Memory leaks

### 4. Seguridad
- [ ] Claves API expuestas
- [ ] Datos sensibles en localStorage sin encriptar
- [ ] XSS potential
- [ ] CORS mal configurado

### 5. Clean Code
- [ ] Código duplicado
- [ ] Funciones demasiado largas
- [ ] Nombres poco descriptivos
- [ ] Comentarios obsoletos

### 6. Errores
- [ ] try/catch sin finally
- [ ] throw sin mensaje descriptivo
- [ ] console.log en producción

## Criterios de Aprobación

### ✅ APROBADO
El código puede fusionarse si:
- No hay bugs críticos
- Pasa el checklist de seguridad
- Tiene tests unitarios
- Compila sin warnings

### ❌ RECHAZADO
El código debe corregirse si:
- Hay vulnerabilities de seguridad
- Falla en casos borde
- Nocompila
- Violaciones de estilo

## Reporte de Revisión Actual

### Código Revisado
- `src/middleware/apartmentsApiService.jsx`
- `src/apartment/ApartmentsFilter.jsx`
- `src/App.jsx`
- `package.json`

### Issues Encontrados

| Archivo | Prioridad | Issue | Estado |
|---------|-----------|-------|--------|
| `ApartmentsFilter.jsx` | 🔴 CRÍTICO | Checkboxes sin `checked` | PENDIENTE |
| `apartmentsApiService.jsx` | 🔴 CRÍTICO | `alert()` redundante línea 71 | PENDIENTE |
| `ApartmentsFilter.jsx` | 🟡 MODERADO | Sin validación de inputs negativos | PENDIENTE |
| `apartmentsApiService.jsx` | 🟡 MODERADO | Sin timeouts en axios | PENDIENTE |
| `ProtectedRoute.jsx` | 🟡 MODERADO | Loading con `<p>` en vez de `CircularProgress` | PENDIENTE |

### Veredicto
**RECHAZADO** - Cambios obligatorios antes de merge

## Cambios Recomendados

### 1. ApartmentsFilter.jsx - Checkboxes
```jsx
// ❌ INCORRECTO
<input type="checkbox" name="mainroad" onChange={handleChange} />

// ✅ CORRECTO
<input 
  type="checkbox" 
  name="mainroad" 
  checked={filters.mainroad === "yes"} 
  onChange={handleChange} 
/>
```

### 2. apartmentsApiService.jsx - Alert
```jsx
// ❌ INCORRECTO
alert("Failed to delete Apartment: " + id + "\n" + error);
console.error(error);
throw error;

// ✅ CORRECTO
console.error("Failed to delete apartment:", id, error);
throw error;
```

## Habilidades Clave
- Debugging
- Seguridad web
- Patrones de rendimiento
- Clean Code

## Estado
✅ COMPLETADO

## Siguiente Paso
Implementar cambios recomendados por el Agent-03 (Coder)
