import { useApartments } from "../hooks/apartmentServiceHook";
import ApartmentListView from "../view/ApartmentListView";

const ApartmentList = () => {

  const {
    apartments,
    loading,
    error,
    createApartment,
    updateApartment,
    deleteApartment
  } = useApartments();

  return (
    <ApartmentListView
      apartments={apartments}
      isLoading={loading}
      isAxiosError={error}
      onCreate={createApartment}
      onDelete={deleteApartment}
      onUpdate={updateApartment}
    />
  );

};

export default ApartmentList;