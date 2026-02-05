// src/apartment/ApartmentList.jsx
import { useApartments } from "../data/useApartments";
import ApartmentListView from "../view/ApartmentListView";

const ApartmentList = () => {
  const { apartments, isLoading, isAxiosError } = useApartments();

  // Función para borrar apartment
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this apartment?"
    );
    if (!confirmed) return;

    // Como `useApartments` probablemente devuelve solo lectura,
    // aquí asumimos que tienes un setter o un método para actualizar la lista.
    // Si no, puedes usar un estado local temporal:
    // const [localApartments, setLocalApartments] = useState(apartments);
    // setLocalApartments(prev => prev.filter(a => a.id !== id));

    // Ejemplo genérico usando estado local:
    // Si `useApartments` tiene método update, aquí iría.
    console.warn("Aquí debes implementar la eliminación en tu origen de datos.");
  };

  return (
    <ApartmentListView
      apartments={apartments}
      isLoading={isLoading}
      isAxiosError={isAxiosError}
      onDelete={handleDelete} // pasamos el callback al hijo
    />
  );
};

export default ApartmentList;
