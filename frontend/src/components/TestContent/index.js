import FrenchRevolutionTest from './class9/socialScience/FrenchRevolutionTest1';

export const testComponentRegistry = {
    'class9/socialScience/FrenchRevolutionTest1': FrenchRevolutionTest,
};

export const getTestComponent = (componentPath) =>
    testComponentRegistry[componentPath] || null;
