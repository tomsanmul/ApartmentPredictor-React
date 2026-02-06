// src/apartment/ApartmentList.jsx
import { useApartments } from "../data/useApartments";
import ApartmentListView from "../view/ApartmentListView";


const ApartmentList = () => {
  const { apartments, isLoading, isAxiosError, createApartment, updateApartment, deleteApartment } = useApartments();

  return (
    <ApartmentListView
      apartments={apartments}
      isLoading={isLoading}
      isAxiosError={isAxiosError}
      onCreate={createApartment}
      onDelete={deleteApartment}
      onUpdate={updateApartment}
    />
  );
};

export default ApartmentList;
