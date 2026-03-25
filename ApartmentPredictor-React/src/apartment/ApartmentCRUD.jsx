import { useEffect } from "react";
import { useApartments } from "../hooks/apartmentServiceHook";
import ApartmentListContainer from "./ApartmentListContainer";

const ApartmentList = () => {

  const {
    apartments,
    loading,
    fetchPageApartments,
    filterApartments,
    createApartment,
    updateApartment,
    deleteApartment
  } = useApartments();

  useEffect(() => {
    fetchPageApartments(0); // carga la página inicial de la paginación la 1ª vez (QUE ES LA 0, no la 1!)
  }, [fetchPageApartments]);

  return (
    <ApartmentListContainer
      apartments={apartments}
      loading={loading}
      onPageChange={fetchPageApartments}
      onFilter={filterApartments} 
      onCreate={createApartment}
      onUpdate={updateApartment}
      onDelete={deleteApartment}
    />
  );

};

export default ApartmentList;