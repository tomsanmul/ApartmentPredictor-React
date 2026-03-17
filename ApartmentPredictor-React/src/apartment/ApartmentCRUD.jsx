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
    fetchPageApartments(1); // carga la página inicial
  }, [fetchPageApartments]);

  return (
    <ApartmentListView
      apartments={apartments}
      loading={loading}
      onCreate={createApartment}
      onDelete={deleteApartment}
      onUpdate={updateApartment}
      onPageChange={fetchPageApartments}   // 👈 importante
    />
  );

};

export default ApartmentList;