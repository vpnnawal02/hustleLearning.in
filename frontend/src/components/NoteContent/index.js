// Import the component
import FrenchRevolution from './class9/socialScience/FrenchRevolution';

// Register it
export const noteComponentRegistry = {
    'class9/socialScience/FrenchRevolution': FrenchRevolution,
};

// Export getter
export const getNoteComponent = (componentPath) => {
    return noteComponentRegistry[componentPath] || null;
};
