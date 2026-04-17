import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useApartments } from '../hooks/apartmentServiceHook'
import { ApartmentServiceContext } from '../services/apartmentServiceContext'

// Mock de axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn()
  }
}))

// Factory para crear el wrapper con el contexto
const createWrapper = (mockService) => {
  return ({ children }) => (
    <ApartmentServiceContext.Provider value={mockService}>
      {children}
    </ApartmentServiceContext.Provider>
  )
}

describe('useApartments Hook', () => {
  let mockService
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()

    // Crear mock del servicio
    mockService = {
      page: vi.fn(),
      getAll: vi.fn(),
      filterApartments: vi.fn(),
      createApartment: vi.fn(),
      updateApartment: vi.fn(),
      deleteApartment: vi.fn()
    }

    wrapper = createWrapper(mockService)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  // ============================================
  // TEST 1: Estado inicial del hook
  // ============================================
  describe('Estado inicial', () => {
    it('debe tener apartments vacío al inicio', () => {
      const { result } = renderHook(() => useApartments(), { wrapper })

      expect(result.current.apartments).toEqual([])
    })

    it('debe tener loading en false al inicio', () => {
      const { result } = renderHook(() => useApartments(), { wrapper })

      expect(result.current.loading).toBe(false)
    })

    it('debe tener error en null al inicio', () => {
      const { result } = renderHook(() => useApartments(), { wrapper })

      expect(result.current.error).toBe(null)
    })

    it('debe tener totalPages en 0 al inicio', () => {
      const { result } = renderHook(() => useApartments(), { wrapper })

      expect(result.current.totalPages).toBe(0)
    })

    it('debe tener currentPage en 0 al inicio', () => {
      const { result } = renderHook(() => useApartments(), { wrapper })

      expect(result.current.currentPage).toBe(0)
    })
  })

  // ============================================
  // TEST 2: fetchPageApartments
  // ============================================
  describe('fetchPageApartments', () => {
    it('debe llamar al servicio page con el número de página', async () => {
      const mockData = {
        content: [{ id: 1, price: 100000 }],
        totalPages: 5,
        totalElements: 50,
        number: 0,
        size: 10
      }
      mockService.page.mockResolvedValueOnce(mockData)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.fetchPageApartments(0)
      })

      expect(mockService.page).toHaveBeenCalledWith(0)
    })

    it('debe actualizar apartments con los datos de la página', async () => {
      const mockData = {
        content: [{ id: 1, price: 100000 }, { id: 2, price: 200000 }],
        totalPages: 3,
        totalElements: 30,
        number: 1,
        size: 10
      }
      mockService.page.mockResolvedValueOnce(mockData)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.fetchPageApartments(1)
      })

      expect(result.current.apartments).toEqual(mockData.content)
    })

    it('debe actualizar el estado de loading durante la petición', async () => {
      mockService.page.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ content: [], totalPages: 0 }), 100))
      )

      const { result } = renderHook(() => useApartments(), { wrapper })

      act(() => {
        result.current.fetchPageApartments(0)
      })

      // Loading debería ser true inmediatamente después de llamar
      expect(result.current.loading).toBe(true)
    })

    it('debe manejar errores y establecer el estado de error', async () => {
      const error = new Error('Network Error')
      mockService.page.mockRejectedValueOnce(error)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.fetchPageApartments(0)
      })

      expect(result.current.error).toEqual(error)
      expect(result.current.loading).toBe(false)
    })
  })

  // ============================================
  // TEST 3: filterApartments
  // ============================================
  describe('filterApartments', () => {
    it('debe llamar al servicio filterApartments con los filtros', async () => {
      const filters = { minPrice: 100000, maxPrice: 500000 }
      const mockFilteredData = [{ id: 1, price: 200000 }]
      mockService.filterApartments.mockResolvedValueOnce(mockFilteredData)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.filterApartments(filters)
      })

      expect(mockService.filterApartments).toHaveBeenCalledWith(filters)
    })

    it('debe actualizar apartments con los datos filtrados', async () => {
      const mockFilteredData = [{ id: 1, price: 200000 }, { id: 2, price: 300000 }]
      mockService.filterApartments.mockResolvedValueOnce(mockFilteredData)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.filterApartments({ minPrice: 100000 })
      })

      expect(result.current.apartments).toEqual(mockFilteredData)
    })

    it('debe pasar filtros nulos', async () => {
      mockService.filterApartments.mockResolvedValueOnce([])

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.filterApartments(null)
      })

      expect(mockService.filterApartments).toHaveBeenCalledWith(null)
    })

    it('debe manejar errores en el filtrado', async () => {
      const error = new Error('Filter Error')
      mockService.filterApartments.mockRejectedValueOnce(error)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.filterApartments({})
      })

      expect(result.current.error).toEqual(error)
    })
  })

  // ============================================
  // TEST 4: createApartment
  // ============================================
  describe('createApartment', () => {
    it('debe llamar al servicio createApartment', async () => {
      const newApartment = { price: 150000, area: 600 }
      const createdApartment = { id: 10, ...newApartment }
      mockService.createApartment.mockResolvedValueOnce(createdApartment)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.createApartment(newApartment)
      })

      expect(mockService.createApartment).toHaveBeenCalledWith(newApartment)
    })

    it('debe añadir el apartment creado a la lista', async () => {
      const newApartment = { price: 150000, area: 600 }
      const createdApartment = { id: 10, ...newApartment }
      mockService.createApartment.mockResolvedValueOnce(createdApartment)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.createApartment(newApartment)
      })

      expect(result.current.apartments).toContainEqual(createdApartment)
    })

    it('debe devolver el apartment creado', async () => {
      const newApartment = { price: 150000, area: 600 }
      const createdApartment = { id: 10, ...newApartment }
      mockService.createApartment.mockResolvedValueOnce(createdApartment)

      const { result } = renderHook(() => useApartments(), { wrapper })

      let created
      await act(async () => {
        created = await result.current.createApartment(newApartment)
      })

      expect(created).toEqual(createdApartment)
    })

    it('debe manejar errores al crear', async () => {
      const error = new Error('Create Error')
      mockService.createApartment.mockRejectedValueOnce(error)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await expect(
        result.current.createApartment({})
      ).rejects.toThrow('Create Error')
    })
  })

  // ============================================
  // TEST 5: updateApartment
  // ============================================
  describe('updateApartment', () => {
    it('debe llamar al servicio updateApartment', async () => {
      const updatedApartment = { id: 5, price: 180000 }
      mockService.updateApartment.mockResolvedValueOnce(updatedApartment)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.updateApartment(updatedApartment)
      })

      expect(mockService.updateApartment).toHaveBeenCalledWith(updatedApartment)
    })

    it('debe actualizar el apartment en la lista', async () => {
      const initialData = {
        content: [{ id: 5, price: 150000 }, { id: 6, price: 200000 }],
        totalPages: 1,
        totalElements: 2,
        number: 0,
        size: 10
      }
      mockService.page.mockResolvedValueOnce(initialData)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.fetchPageApartments(0)
      })

      const updatedApartment = { id: 5, price: 180000 }
      mockService.updateApartment.mockResolvedValueOnce(updatedApartment)

      await act(async () => {
        await result.current.updateApartment(updatedApartment)
      })

      expect(result.current.apartments.find(a => a.id === 5)).toEqual(updatedApartment)
      expect(result.current.apartments.find(a => a.id === 6).price).toBe(200000)
    })
  })

  // ============================================
  // TEST 6: deleteApartment
  // ============================================
  describe('deleteApartment', () => {
    it('debe llamar al servicio deleteApartment con el id', async () => {
      mockService.deleteApartment.mockResolvedValueOnce({ success: true })

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.deleteApartment(5)
      })

      expect(mockService.deleteApartment).toHaveBeenCalledWith(5)
    })

    it('debe eliminar el apartment de la lista', async () => {
      const initialData = {
        content: [{ id: 5, price: 150000 }, { id: 6, price: 200000 }],
        totalPages: 1,
        totalElements: 2,
        number: 0,
        size: 10
      }
      mockService.page.mockResolvedValueOnce(initialData)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.fetchPageApartments(0)
      })

      mockService.deleteApartment.mockResolvedValueOnce({ success: true })

      await act(async () => {
        await result.current.deleteApartment(5)
      })

      expect(result.current.apartments.find(a => a.id === 5)).toBeUndefined()
      expect(result.current.apartments).toHaveLength(1)
    })

    it('debe manejar errores al eliminar', async () => {
      const error = new Error('Delete Error')
      mockService.deleteApartment.mockRejectedValueOnce(error)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await expect(
        result.current.deleteApartment(999)
      ).rejects.toThrow('Delete Error')
    })
  })

  // ============================================
  // TEST 7: Casos borde
  // ============================================
  describe('Casos borde', () => {
    it('debe lanzar error si se usa fuera del provider', () => {
      const errorWrapper = ({ children }) => (
        <ApartmentServiceContext.Provider value={null}>
          {children}
        </ApartmentServiceContext.Provider>
      )

      expect(() => {
        renderHook(() => useApartments(), { wrapper: errorWrapper })
      }).toThrow('useApartments must be used inside ApartmentServiceProvider')
    })

    it('debe manejar páginas con contenido vacío', async () => {
      const mockData = {
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0,
        size: 10
      }
      mockService.page.mockResolvedValueOnce(mockData)

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.fetchPageApartments(0)
      })

      expect(result.current.apartments).toEqual([])
      expect(result.current.totalElements).toBe(0)
    })

    it('debe manejar filtros con valores undefined', async () => {
      mockService.filterApartments.mockResolvedValueOnce([])

      const { result } = renderHook(() => useApartments(), { wrapper })

      await act(async () => {
        await result.current.filterApartments({
          minPrice: undefined,
          maxArea: null
        })
      })

      expect(mockService.filterApartments).toHaveBeenCalled()
    })
  })
})
