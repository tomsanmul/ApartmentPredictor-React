import { ReviewServiceContext } from "./reviewServiceContext";
import ReviewsAPIService from "../middleware/reviewsApiService";

export const ReviewServiceProvider = ({ children }) => {
    return (
        <ReviewServiceContext.Provider value={ReviewsAPIService}>
            {children}
        </ReviewServiceContext.Provider>
    );
};