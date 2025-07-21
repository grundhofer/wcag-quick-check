// Calculate impact of each question category
const calculateQuestionImpact = () => {
    const impacts = {};
    
    // Count how many criteria each tag/category affects
    wcagCriteria.forEach(criterion => {
        criterion.tags.forEach(tag => {
            impacts[tag] = (impacts[tag] || 0) + 1;
        });
        criterion.categories.forEach(cat => {
            impacts[cat] = (impacts[cat] || 0) + 1;
        });
    });
    
    return impacts;
};

const questions = [
    {
        id: "q1",
        text: {
            en: "Does the page contain form inputs (text fields, checkboxes, dropdowns, etc.)?",
            de: "Enthält die Seite Formulareingaben (Textfelder, Checkboxen, Dropdowns, etc.)?"
        },
        options: [
            { value: "yes", label: { en: "Yes", de: "Ja" } },
            { value: "no", label: { en: "No", de: "Nein" } }
        ],
        filter: (answer, criteria) => {
            if (answer === "no") {
                return criteria.filter(c => !c.categories.includes("forms"));
            }
            return criteria;
        },
        impact: 9 // Affects 1.3.5, 3.2.2, 3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.7, 3.3.8, 2.5.3
    },
    {
        id: "q2",
        text: {
            en: "Does the page contain multimedia content (video, audio, interactive media)?",
            de: "Enthält die Seite Multimedia-Inhalte (Video, Audio, interaktive Medien)?"
        },
        options: [
            { value: "yes", label: { en: "Yes", de: "Ja" } },
            { value: "no", label: { en: "No", de: "Nein" } }
        ],
        filter: (answer, criteria) => {
            if (answer === "no") {
                return criteria.filter(c => 
                    // Filter out specific multimedia criteria
                    c.id !== "1.2.1" && // Audio-only and Video-only
                    c.id !== "1.2.2" && // Captions (Prerecorded)
                    c.id !== "1.2.3" && // Audio Description or Media Alternative
                    c.id !== "1.2.4" && // Captions (Live)
                    c.id !== "1.2.5" && // Audio Description (Prerecorded)
                    c.id !== "1.4.2" && // Audio Control
                    c.id !== "2.3.1"    // Three Flashes or Below Threshold
                    // Note: 1.1.1 (Non-text Content) kept as it applies to images too
                );
            }
            return criteria;
        },
        impact: 7 // Affects 1.2.1, 1.2.2, 1.2.3, 1.2.4, 1.2.5, 1.4.2, 2.3.1
    },
    {
        id: "q3",
        text: {
            en: "Does the page use advanced input methods (keyboard shortcuts, touch gestures, drag/drop, motion controls)?",
            de: "Verwendet die Seite erweiterte Eingabemethoden (Tastaturkürzel, Touch-Gesten, Drag & Drop, Bewegungssteuerung)?"
        },
        options: [
            { value: "yes", label: { en: "Yes", de: "Ja" } },
            { value: "no", label: { en: "No", de: "Nein" } }
        ],
        filter: (answer, criteria) => {
            if (answer === "no") {
                return criteria.filter(c => 
                    !c.tags.includes("shortcuts") &&
                    !c.tags.includes("single-key") &&
                    !c.tags.includes("gestures") &&
                    !c.tags.includes("touch") &&
                    !c.tags.includes("drag-drop") &&
                    !c.tags.includes("motion") &&
                    !c.tags.includes("shake") &&
                    !c.tags.includes("tilt") &&
                    !c.tags.includes("click") &&
                    !c.tags.includes("mouse") &&
                    !c.tags.includes("touch-targets") &&
                    !c.tags.includes("mobile")
                );
            }
            return criteria;
        },
        impact: 6 // Affects 2.1.4, 2.5.1, 2.5.2, 2.5.4, 2.5.7, 2.5.8
    },
    {
        id: "q4",
        text: {
            en: "Does the page have navigation that repeats across multiple pages/views?",
            de: "Hat die Seite Navigation, die sich über mehrere Seiten/Ansichten wiederholt?"
        },
        options: [
            { value: "yes", label: { en: "Yes", de: "Ja" } },
            { value: "no", label: { en: "No", de: "Nein" } }
        ],
        filter: (answer, criteria) => {
            if (answer === "no") {
                return criteria.filter(c => 
                    c.id !== "2.4.2" && // Page Titled
                    c.id !== "2.4.5" && // Multiple Ways
                    c.id !== "3.2.3" && // Consistent Navigation
                    c.id !== "3.2.6"    // Consistent Help
                );
            }
            return criteria;
        },
        impact: 4 // Affects 2.4.2, 2.4.5, 3.2.3, 3.2.6
    },
    {
        id: "q5",
        text: {
            en: "Does the page contain images, icons, or graphics?",
            de: "Enthält die Seite Bilder, Icons oder Grafiken?"
        },
        options: [
            { value: "yes", label: { en: "Yes", de: "Ja" } },
            { value: "no", label: { en: "No", de: "Nein" } }
        ],
        filter: (answer, criteria) => {
            if (answer === "no") {
                return criteria.filter(c => 
                    !c.tags.includes("images") && 
                    !c.tags.includes("icons") && 
                    !c.tags.includes("charts") && 
                    !c.tags.includes("graphics") && 
                    !c.tags.includes("text-images") &&
                    c.id !== "1.4.5" && // Images of Text
                    c.id !== "1.4.11"   // Non-text Contrast
                );
            }
            return criteria;
        },
        impact: 3 // Affects 1.1.1 (partially), 1.4.5, 1.4.11
    },
    {
        id: "q6",
        text: {
            en: "Does the page have authentication/login functionality?",
            de: "Hat die Seite Authentifizierungs-/Login-Funktionalität?"
        },
        options: [
            { value: "yes", label: { en: "Yes", de: "Ja" } },
            { value: "no", label: { en: "No", de: "Nein" } }
        ],
        filter: (answer, criteria) => {
            if (answer === "no") {
                return criteria.filter(c => 
                    !c.tags.includes("authentication") && 
                    !c.tags.includes("login") &&
                    !c.tags.includes("cognitive")
                );
            }
            return criteria;
        },
        impact: 1 // Affects 3.3.8
    },
    {
        id: "q7",
        text: {
            en: "Does the page have animations, carousels, or auto-updating content?",
            de: "Hat die Seite Animationen, Karussells oder sich automatisch aktualisierende Inhalte?"
        },
        options: [
            { value: "yes", label: { en: "Yes", de: "Ja" } },
            { value: "no", label: { en: "No", de: "Nein" } }
        ],
        filter: (answer, criteria) => {
            if (answer === "no") {
                return criteria.filter(c => 
                    !c.tags.includes("carousel") &&
                    !c.tags.includes("animation") &&
                    !c.tags.includes("auto-update") &&
                    !c.tags.includes("scrolling") &&
                    c.id !== "2.2.2" // Pause, Stop, Hide
                );
            }
            return criteria;
        },
        impact: 1 // Affects 2.2.2
    },
    {
        id: "q8",
        text: {
            en: "Does the page have repeated content blocks (headers, navigation bars, sidebars)?",
            de: "Hat die Seite wiederkehrende Inhaltsblöcke (Header, Navigationsleisten, Seitenleisten)?"
        },
        options: [
            { value: "yes", label: { en: "Yes", de: "Ja" } },
            { value: "no", label: { en: "No", de: "Nein" } }
        ],
        filter: (answer, criteria) => {
            if (answer === "no") {
                return criteria.filter(c => 
                    c.id !== "2.4.1" // Bypass Blocks
                );
            }
            return criteria;
        },
        impact: 1 // Affects 2.4.1
    }
];

class QuestionManager {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.filteredCriteria = [...wcagCriteria];
        this.removedCriteria = [];
        this.skippedQuestions = false;
    }

    getCurrentQuestion() {
        return questions[this.currentQuestionIndex];
    }

    answerQuestion(answer) {
        const question = this.getCurrentQuestion();
        this.answers[question.id] = answer;
        
        // Always recalculate from scratch to handle answer changes properly
        this.recalculateFilters();
    }

    applyFilter(question, answer) {
        const beforeCount = this.filteredCriteria.length;
        const newFiltered = question.filter(answer, this.filteredCriteria);
        
        // Track removed criteria
        if (answer === "no") {
            const removedIds = this.filteredCriteria
                .filter(c => !newFiltered.find(nc => nc.id === c.id))
                .map(c => c.id);
            
            removedIds.forEach(id => {
                const criterion = wcagCriteria.find(c => c.id === id);
                if (criterion && !this.removedCriteria.find(rc => rc.id === id)) {
                    this.removedCriteria.push({
                        ...criterion,
                        removedByQuestion: question.id
                    });
                }
            });
        }
        
        this.filteredCriteria = newFiltered;
    }

    nextQuestion() {
        if (this.currentQuestionIndex < questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            // Recalculate filtered criteria from the beginning
            this.recalculateFilters();
            return true;
        }
        return false;
    }

    recalculateFilters() {
        // Complete reset - start fresh
        this.filteredCriteria = [...wcagCriteria];
        this.removedCriteria = [];
        
        // Reapply all answers from beginning to current question
        for (let i = 0; i <= this.currentQuestionIndex; i++) {
            const question = questions[i];
            const answer = this.answers[question.id];
            if (answer) {
                // Apply the filter directly without using applyFilter to avoid double-tracking
                const newFiltered = question.filter(answer, this.filteredCriteria);
                
                // Track newly removed criteria
                if (answer === "no") {
                    const removedIds = this.filteredCriteria
                        .filter(c => !newFiltered.find(nc => nc.id === c.id))
                        .map(c => c.id);
                    
                    removedIds.forEach(id => {
                        const criterion = wcagCriteria.find(c => c.id === id);
                        if (criterion && !this.removedCriteria.find(rc => rc.id === id)) {
                            this.removedCriteria.push({
                                ...criterion,
                                removedByQuestion: question.id
                            });
                        }
                    });
                }
                
                this.filteredCriteria = newFiltered;
            }
        }
    }

    getFilteredCriteria() {
        return this.filteredCriteria;
    }

    getRemovedCriteria() {
        return this.removedCriteria;
    }

    addBackCriterion(criterionId) {
        const removedIndex = this.removedCriteria.findIndex(c => c.id === criterionId);
        if (removedIndex !== -1) {
            const criterion = this.removedCriteria[removedIndex];
            this.removedCriteria.splice(removedIndex, 1);
            
            // Add back to filtered criteria in the correct position
            const originalIndex = wcagCriteria.findIndex(c => c.id === criterionId);
            let insertIndex = 0;
            
            for (let i = 0; i < this.filteredCriteria.length; i++) {
                const currentIndex = wcagCriteria.findIndex(c => c.id === this.filteredCriteria[i].id);
                if (currentIndex > originalIndex) {
                    insertIndex = i;
                    break;
                }
                insertIndex = i + 1;
            }
            
            this.filteredCriteria.splice(insertIndex, 0, wcagCriteria.find(c => c.id === criterionId));
        }
    }

    skipRemainingQuestions() {
        this.skippedQuestions = true;
        // Apply all remaining "yes" answers to keep all criteria
        for (let i = this.currentQuestionIndex; i < questions.length; i++) {
            const question = questions[i];
            if (!this.answers[question.id]) {
                this.answers[question.id] = "yes";
            }
        }
    }

    getProgress() {
        return ((this.currentQuestionIndex + 1) / questions.length) * 100;
    }

    isLastQuestion() {
        return this.currentQuestionIndex === questions.length - 1;
    }

    reset() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.filteredCriteria = [...wcagCriteria];
        this.removedCriteria = [];
        this.skippedQuestions = false;
    }
}