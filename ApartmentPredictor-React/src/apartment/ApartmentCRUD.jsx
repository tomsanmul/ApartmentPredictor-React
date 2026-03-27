import { useEffect, useState } from "react";
import { useApartments } from "../hooks/apartmentServiceHook";
import ApartmentListContainer from "./ApartmentListContainer";

const ApartmentList = () => {

  const [isFiltering, setIsFiltering] = useState(false);

  const {
    apartments,
    totalPages,
    currentPage,
    loading,
    fetchPageApartments,
    filterApartments,
    createApartment,
    updateApartment,
    deleteApartment
  } = useApartments();

  useEffect(() => {
    fetchPageApartments(0);
  }, []);

  // ESTOS 2 HANDLERS (handleFilter y handlePageChange), y además del HOOK "isFiltering" -> ME SIRVEN PARA CONTROLAR SI ESTOY FILTRANO O NO.
  // EL MOTIVO ES PORQUE SI ESTOY FILTRANDO, VOY A OCULTAR LA BARRA DE NAVEGACIÓN PARA NO ROMPER LA PAGINACIÓN.

  const handleFilter = (filters) => {
    if (!filters) {
      setIsFiltering(false);
      fetchPageApartments(0);
      return;
    }
    setIsFiltering(true);
    filterApartments(filters);
  };

  const handlePageChange = (page) => {
    setIsFiltering(false);
    fetchPageApartments(page);
  };

  return (
    <ApartmentListContainer
      apartments={apartments}
      totalPages={totalPages}
      currentPage={currentPage}
      isFiltering={isFiltering}
      loading={loading}
      onPageChange={handlePageChange}
      onFilter={handleFilter}
      onCreate={createApartment}
      onUpdate={updateApartment}
      onDelete={deleteApartment}
    />
  );

};

export default ApartmentList;