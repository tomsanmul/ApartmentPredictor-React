# 🚀 SISTEMA DE 6 AGENTES - ApartmentPredictor-React

Sistema de desarrollo basado en agentes de IA para gestionar el ciclo de vida del proyecto.

## Arquitectura de Agentes

```
                    ┌─────────────────┐
                    │   USER INPUT    │
                    └────────┬────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────┐
│                    ORCHESTRATOR                        │
│              (Agent-00: Gestión de flujo)             │
└─────────────────────────┬────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌───────────┐  ┌───────────┐  ┌───────────┐
    │ ANALYZER  │  │   PLAN   │  │   CODER   │
    │  Agent-01 │  │  Agent-02 │  │  Agent-03 │
    └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                  ┌───────────┐
                  │ REVIEWER  │
                  │  Agent-04 │
                  └─────┬─────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
    ┌───────────┐  ┌───────────┐  ┌───────────┐
    │  TESTING  │  │   DOCS    │  │  BACK    │
    │  Agent-05 │  │  Agent-06 │  │  TO USER │
    └───────────┘  └───────────┘  └───────────┘
```

## Lista de Agentes

| # | Agente | Archivo | Descripción |
|---|--------|---------|-------------|
| 00 | **Orchestrator** | [ORCHESTRATOR.md](./00-ORCHESTRATOR.md) | Gestor del flujo |
| 01 | **Analyzer** | [ANALYZER.md](./01-ANALYZER.md) | Analiza código y detecta gaps |
| 02 | **Plan** | [PLAN.md](./02-PLAN.md) | Desglosa tareas en pasos |
| 03 | **Coder** | [CODER.md](./03-CODER.md) | Implementa código |
| 04 | **Reviewer** | [REVIEWER.md](./04-REVIEWER.md) | Revisa y valida código |
| 05 | **Testing** | [TESTING.md](./05-TESTING.md) | Crea tests unitarios |
| 06 | **Documentation** | [DOCUMENTATION.md](./06-DOCUMENTATION.md) | Documenta el proyecto |

## Flujo de Trabajo Estándar

```
1. USER → Solicita tarea
2. ORCHESTRATOR → Recibe y evalúa
3. ANALYZER → Analiza impacto
4. PLAN → Crea plan de ejecución
5. CODER → Implementa código
6. REVIEWER → Revisa código
7. TESTING → Crea/ejecuta tests
8. DOCUMENTATION → Actualiza docs
9. ORCHESTRATOR → Visto bueno final
10. USER → Recibe resultado
```

## Estado Actual

| Agente | Estado | Notes |
|--------|--------|-------|
| 00 - Orchestrator | ✅ Activo | Coordina flujo |
| 01 - Analyzer | ✅ Completado | Gap de predicción identificado |
| 02 - Plan | ✅ Completado | 4 fases planificadas |
| 03 - Coder | ⚠️ Pendiente | Falta implementar predictor |
| 04 - Reviewer | ✅ Completado | 4 issues encontrados |
| 05 - Testing | ✅ Completado | 51 tests creados |
| 06 - Documentation | ✅ Completado | README + JSDoc actualizados |

## Próximos Pasos

1. **Coder (Agent-03)** debe implementar:
   - `src/services/predictService.jsx`
   - `src/apartment/PredictorForm.jsx`
   - `src/apartment/PredictionResult.jsx`
   - Integración en página

2. **Reviewer (Agent-04)** debe verificar cambios en:
   - `ApartmentsFilter.jsx` - Fix checkboxes
   - `apartmentsApiService.jsx` - Remove alert()

## Comandos Útiles

```bash
# Ejecutar tests
npm run test:run

# Levantar frontend
npm run dev

# Levantar backend (Spring Boot)
# Ver README principal
```

## Estructura del Proyecto

```
ApartmentPredictor-React/
├── agents/              # Documentación de agentes
│   ├── README.md        # Este archivo
│   ├── 00-ORCHESTRATOR.md
│   ├── 01-ANALYZER.md
│   ├── 02-PLAN.md
│   ├── 03-CODER.md
│   ├── 04-REVIEWER.md
│   ├── 05-TESTING.md
│   └── 06-DOCUMENTATION.md
├── src/
│   ├── apartment/       # Componentes de apartamentos
│   ├── middleware/      # Servicios API
│   ├── services/        # Context y providers
│   ├── pages/           # Páginas
│   └── __tests__/      # Tests unitarios
├── docs/                # Documentación adicional
└── README.md           # README principal
```

---

**Versión:** V. 7.0
**Última actualización:** 17/04/2026
