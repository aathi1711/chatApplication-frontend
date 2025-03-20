import { createContext, useState } from "react";

const UpdateTriggerContext = createContext();

export const UpdateTriggerProvider = ({ children }) => {
    const [updateTrigger, setUpdateTrigger] = useState(0);  // Number state for forcing updates

    return (
        <UpdateTriggerContext.Provider value={{ updateTrigger, setUpdateTrigger }}>
            {children}
        </UpdateTriggerContext.Provider>
    );
};
export default UpdateTriggerContext;
