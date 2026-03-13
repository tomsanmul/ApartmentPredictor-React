import { useApartments } from "../hooks/apartmentServiceHook";
import ApartmentListView from "../apartment/ApartmentListView";

const ApartmentList = () => {

  const {
    apartments,
    createApartment,
    updateApartment,
    deleteApartment
  } = useApartments();

  return (
    <ApartmentListView
      apartments={apartments}
      onCreate={createApartment}
      onDelete={deleteApartment}
      onUpdate={updateApartment}
    />
  );

};

export default ApartmentList;