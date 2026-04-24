import { SchoolServiceContext } from "./schoolServiceContext";
import SchoolsAPIService from "../middleware/schoolsApiService";

export const SchoolServiceProvider = ({ children }) => {
    return (
        <SchoolServiceContext.Provider value={SchoolsAPIService}>
            {children}
        </SchoolServiceContext.Provider>
    );
};