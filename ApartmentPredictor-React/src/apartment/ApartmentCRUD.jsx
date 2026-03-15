import { useApartments } from "../hooks/apartmentServiceHook";
import ApartmentListView from "../apartment/ApartmentListView";

const ApartmentList = () => {

  const {
    apartments,
    loading,
    createApartment,
    updateApartment,
    deleteApartment
  } = useApartments();

  return (
    <ApartmentListView
      apartments={apartments}
      loading={loading}
      onCreate={createApartment}
      onDelete={deleteApartment}
      onUpdate={updateApartment}
    />
  );

};

export default ApartmentList;