// Import all note content files
import { frenchRevolutionNotes } from './class9/socialScience/frenchRevolution';
// Add more imports as you create more content files

// Content registry - maps contentPath to actual content
export const notesContentRegistry = {
    'class9/socialScience/frenchRevolution': frenchRevolutionNotes,
    // Add more mappings here as you create content
};

// Helper function to get content
export const getNotesContent = (contentPath) => {
    return notesContentRegistry[contentPath] || null;
};
