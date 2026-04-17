import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ApartmentsFilter from '../apartment/ApartmentsFilter'

// Mock de la hoja de estilos
vi.mock('../index.css', () => ({}))

describe('ApartmentsFilter Component', () => {
  const mockOnFilter = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ============================================
  // TEST 1: Renderizado basico del componente
  // ============================================
  describe('Renderizado basico', () => {
    it('debe renderizar el titulo del filtro', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      expect(screen.getByText('Filter Apartments')).toBeInTheDocument()
    })

    it('debe renderizar todos los campos de entrada numericos', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      // Usar getByRole para inputs numericos
      const inputs = screen.getAllByRole('spinbutton')
      expect(inputs.length).toBe(8) // 8 campos numericos
    })

    it('debe renderizar los botones FILTER y RESET', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      expect(screen.getByRole('button', { name: 'FILTER' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'RESET' })).toBeInTheDocument()
    })
  })

  // ============================================
  // TEST 2: Valores iniciales
  // ============================================
  describe('Valores iniciales', () => {
    it('debe tener valores iniciales vacios para campos numericos', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      inputs.forEach(input => {
        expect(input).toHaveValue(null)
      })
    })

    it('debe tener checkboxes desmarcados por defecto', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const checkboxes = screen.getAllByRole('checkbox')
      checkboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked()
      })
    })

    it('debe tener furnishing status en none por defecto', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const select = screen.getByRole('combobox')
      expect(select).toHaveValue('none')
    })
  })

  // ============================================
  // TEST 3: Manejo de cambios en inputs
  // ============================================
  describe('Manejo de cambios en inputs', () => {
    it('debe actualizar el valor del primer input numerico', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      fireEvent.change(inputs[0], { target: { value: '100000' } })
      
      expect(inputs[0]).toHaveValue(100000)
    })

    it('debe permitir valores decimales', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      fireEvent.change(inputs[0], { target: { value: '123.45' } })
      
      expect(inputs[0]).toHaveValue(123.45)
    })
  })

  // ============================================
  // TEST 4: CASOS BORDE - Valores invalidos
  // ============================================
  describe('Casos borde - Valores invalidos', () => {
    
    it('debe permitir area = 0', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      fireEvent.change(inputs[2], { target: { value: '0' } }) // Min Area es el 3er input
      
      expect(inputs[2]).toHaveValue(0)
    })

    it('debe manejar area negativo', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      fireEvent.change(inputs[2], { target: { value: '-50' } })
      
      expect(inputs[2]).toHaveValue(-50)
    })

    it('debe manejar precio negativo', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      fireEvent.change(inputs[0], { target: { value: '-10000' } })
      
      expect(inputs[0]).toHaveValue(-10000)
    })

    it('debe manejar valores muy grandes', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      fireEvent.change(inputs[0], { target: { value: '999999999' } })
      
      expect(inputs[0]).toHaveValue(999999999)
    })

    it('debe manejar campos vacios', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      fireEvent.change(inputs[4], { target: { value: '' } })
      
      expect(inputs[4]).toHaveValue(null)
    })
  })

  // ============================================
  // TEST 5: Manejo de checkboxes
  // ============================================
  describe('Manejo de checkboxes', () => {
    it('debe marcar el primer checkbox', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[0])
      
      expect(checkboxes[0]).toBeChecked()
    })

    it('debe desmarcar checkbox al hacer clic de nuevo', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[0])
      expect(checkboxes[0]).toBeChecked()
      
      fireEvent.click(checkboxes[0])
      expect(checkboxes[0]).not.toBeChecked()
    })

    it('debe marcar multiples checkboxes', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.click(checkboxes[0])
      fireEvent.click(checkboxes[1])
      
      expect(checkboxes[0]).toBeChecked()
      expect(checkboxes[1]).toBeChecked()
    })
  })

  // ============================================
  // TEST 6: Submit del formulario
  // ============================================
  describe('Submit del formulario', () => {
    it('debe llamar a onFilter al hacer clic en FILTER', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'FILTER' }))
      
      expect(mockOnFilter).toHaveBeenCalledTimes(1)
      expect(mockOnFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          minPrice: null,
          maxPrice: null,
        })
      )
    })

    it('debe llamar a onFilter con null al hacer clic en RESET', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      fireEvent.click(screen.getByRole('button', { name: 'RESET' }))
      
      expect(mockOnFilter).toHaveBeenCalledWith(null)
    })

    it('debe enviar valores numericos correctos al filtrar', () => {
      render(<ApartmentsFilter onFilter={mockOnFilter} />)
      
      const inputs = screen.getAllByRole('spinbutton')
      
      // minPrice
      fireEvent.change(inputs[0], { target: { value: '50000' } })
      // maxPrice
      fireEvent.change(inputs[1], { target: { value: '200000' } })
      
      fireEvent.click(screen.getByRole('button', { name: 'FILTER' }))
      
      expect(mockOnFilter).toHaveBeenCalledWith(
        expect.objectContaining({
          minPrice: 50000,
          maxPrice: 200000,
        })
      )
    })
  })
})
