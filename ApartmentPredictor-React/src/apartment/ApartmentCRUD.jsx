import { useEffect } from "react";
import { useApartments } from "../hooks/apartmentServiceHook";
import ApartmentListView from "../apartment/ApartmentListView";

const ApartmentList = () => {

  const {
    apartments,
    loading,
    fetchPageApartments,
    createApartment,
    updateApartment,
    deleteApartment
  } = useApartments();

  useEffect(() => {
    fetchPageApartments(0); // carga la página inicial de la paginación la 1ª vez (QUE ES LA 0, no la 1!)
  }, [fetchPageApartments]);

  return (
    <ApartmentListView
      apartments={apartments}
      loading={loading}
      onCreate={createApartment}
      onDelete={deleteApartment}
      onUpdate={updateApartment}
      onPageChange={fetchPageApartments}
    />
  );

};

export default ApartmentList;