import FrenchRevolutionTest from './class9/socialScience/FrenchRevolutionTest';

export const testComponentRegistry = {
    'class9/socialScience/FrenchRevolutionTest': FrenchRevolutionTest,
};

export const getTestComponent = (componentPath) =>
    testComponentRegistry[componentPath] || null;
