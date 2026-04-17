import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'

vi.mock('axios')

describe('ApartmentsAPIService', () => {
  let ApartmentsAPIService

  beforeEach(async () => {
    vi.clearAllMocks()
    const module = await import('../middleware/apartmentsApiService')
    ApartmentsAPIService = module.default
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('getAll', () => {
    it('debe hacer GET a /getAll', async () => {
      const mockData = [{ id: 1, price: 100000 }]
      axios.get.mockResolvedValueOnce({ data: mockData })

      const result = await ApartmentsAPIService.getAll()

      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/v1/apartment/getAll')
      expect(result).toEqual(mockData)
    })

    it('debe manejar errores en getAll', async () => {
      axios.get.mockRejectedValueOnce(new Error('Network Error'))
      await expect(ApartmentsAPIService.getAll()).rejects.toThrow('Network Error')
    })
  })

  describe('page', () => {
    it('debe hacer GET con numero de pagina', async () => {
      const mockData = { content: [], totalPages: 5, number: 0 }
      axios.get.mockResolvedValueOnce({ data: mockData })

      await ApartmentsAPIService.page(0)

      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8080/api/v1/apartment/page',
        { params: { pageNo: 0 } }
      )
    })
  })

  describe('createApartment', () => {
    it('debe hacer POST a /create', async () => {
      const apartment = { price: 150000, area: 600 }
      const created = { id: 10, ...apartment }
      axios.post.mockResolvedValueOnce({ data: created })

      const result = await ApartmentsAPIService.createApartment(apartment)

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/v1/apartment/create',
        apartment
      )
      expect(result).toEqual(created)
    })
  })

  describe('updateApartment', () => {
    it('debe hacer POST a /update', async () => {
      const apartment = { id: 5, price: 180000 }
      axios.post.mockResolvedValueOnce({ data: apartment })

      await ApartmentsAPIService.updateApartment(apartment)

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/v1/apartment/update',
        apartment
      )
    })
  })

  describe('deleteApartment', () => {
    it('debe hacer DELETE con id', async () => {
      axios.delete.mockResolvedValueOnce({ data: { success: true } })

      await ApartmentsAPIService.deleteApartment(5)

      expect(axios.delete).toHaveBeenCalledWith(
        'http://localhost:8080/api/v1/apartment/deleteById',
        { params: { id: 5 } }
      )
    })
  })

  describe('filterApartments', () => {
    it('debe hacer GET con filtros', async () => {
      const filters = { minPrice: 100000 }
      const mockData = [{ id: 1 }]
      axios.get.mockResolvedValueOnce({ data: mockData })

      await ApartmentsAPIService.filterApartments(filters)

      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8080/api/v1/apartment/filter',
        { params: filters }
      )
    })
  })
})