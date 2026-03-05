import { ApartmentServiceContext } from "./apartmentServiceContext";
import ApartmentsAPIService from "../middleware/apartmentsApiService";


export const ApartmentServiceProvider = ({ children }) => {

    return (
        <ApartmentServiceContext.Provider value={ApartmentsAPIService}>
            {children}
        </ApartmentServiceContext.Provider>
    );
};

