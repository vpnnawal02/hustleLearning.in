// Import the component
import FrenchRevolution from './class9/socialScience/FrenchRevolution';
import RussianRevolution from './class9/socialScience/RussianRevolution';

// Register it
export const noteComponentRegistry = {
    'class9/socialScience/FrenchRevolution': FrenchRevolution,
    'class9/socialScience/RussianRevolution': RussianRevolution,
};

// Export getter
export const getNoteComponent = (componentPath) => {
    return noteComponentRegistry[componentPath] || null;
};
