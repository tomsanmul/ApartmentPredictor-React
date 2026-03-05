import { createContext } from "react";
import ApartmentsAPIService from "../middleware/apartmentsApiService.jsx";

export const ApartmentServiceContext = createContext(ApartmentsAPIService);
