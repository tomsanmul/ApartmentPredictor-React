// src/apartment/ApartmentList.jsx
import { useApartments } from "../data/useApartments";
import ApartmentListView from "../view/ApartmentListView";


const ApartmentList = () => {
  const { apartments, isLoading, isAxiosError, deleteApartment } = useApartments();

  return (
    <ApartmentListView
      apartments={apartments}
      isLoading={isLoading}
      isAxiosError={isAxiosError}
      onDelete={deleteApartment}
    />
  );
};

export default ApartmentList;
