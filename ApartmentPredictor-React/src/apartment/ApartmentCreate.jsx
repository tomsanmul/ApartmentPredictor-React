// src/apartment/ApartmentList.jsx
import { useApartments } from "../data/useApartments";
import ApartmentListView from "../view/ApartmentListView";

const ApartmentList = () => {
  const { apartments, isLoading, isAxiosError } = useApartments();

  return (
    <ApartmentListView
      apartments={apartments}
      isLoading={isLoading}
      isAxiosError={isAxiosError}
    />
  );
};

export default ApartmentList;
