// Internationalization (i18n) support
class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('wcag-app-language') || 'en';
        this.translations = {
            en: {
                // Header
                appTitle: "WCAG 2.2 Quick Check",
                appSubtitle: "Test your website's accessibility compliance with WCAG 2.2 Level A and AA criteria",
                
                // Question Phase
                applicableCriteria: "Applicable Criteria",
                questionSubtitle: "Answer questions to filter out non-applicable criteria",
                previous: "Previous",
                next: "Next",
                skipToTesting: "Skip to Testing",
                startTesting: "Start Testing",
                
                // Testing Phase
                testCriteria: "Test Criteria",
                testing: "Testing",
                criteria: "criteria",
                progress: "Progress",
                all: "All",
                pending: "Pending",
                pass: "Pass",
                fail: "Fail",
                na: "N/A",
                addNotes: "Add notes...",
                remove: "Remove",
                
                // Removed Criteria
                removedCriteria: "Removed Criteria",
                showRemovedCriteria: "Show Removed Criteria",
                hideRemovedCriteria: "Hide Removed Criteria",
                addBack: "Add Back",
                noRemovedCriteria: "No criteria have been removed.",
                
                // Actions
                saveResults: "Save Results",
                export: "Export",
                newTest: "New Test",
                
                // Save Dialog
                saveTestResults: "Save Test Results",
                enterTestName: "Enter test name...",
                save: "Save",
                cancel: "Cancel",
                
                // Saved Tests
                savedTests: "Saved Tests",
                noSavedTests: "No saved tests yet.",
                view: "View",
                delete: "Delete",
                
                // Skip Info
                skipInfo: "Questions were skipped. All criteria are being tested. You can remove non-applicable criteria below.",
                
                // Confirmations
                skipConfirm: "Skip remaining questions and test all criteria? You can still remove criteria later.",
                newTestConfirm: "Start a new test? Any unsaved changes will be lost.",
                deleteTestConfirm: "Are you sure you want to delete this test?",
                selectAnswer: "Please select an answer before continuing.",
                enterTestNameAlert: "Please enter a name for this test.",
                testSaved: "Test saved successfully!",
                
                // Export
                chooseExportFormat: "Choose export format:\n1. JSON\n2. CSV\n3. HTML Report\n\nEnter 1, 2, or 3:",
                invalidOption: "Invalid option",
                
                // Language
                language: "Language",
                english: "English",
                german: "Deutsch",
                
                // Saved test metadata
                passed: "passed",
                failed: "failed",
                
                // Screenshot functionality
                annotateScreenshot: "Annotate Screenshot",
                circleTool: "Circle tool",
                rectangleTool: "Rectangle tool",
                criticalIssues: "Critical issues",
                minorIssues: "Minor issues",
                notesHighlights: "Notes/highlights",
                clearAnnotations: "Clear all annotations",
                clickOrDrag: "Click or drag screenshot here",
                pasteHint: "Ctrl+V to paste",
                clickToEdit: "🔍 Click to edit",
                addMoreScreenshots: "Add more screenshots",
                confirmDeleteScreenshot: "Are you sure you want to delete this screenshot?"
            },
            de: {
                // Header
                appTitle: "WCAG 2.2 Schnellprüfung",
                appSubtitle: "Testen Sie die Barrierefreiheit Ihrer Website mit WCAG 2.2 Level A und AA Kriterien",
                
                // Question Phase
                applicableCriteria: "Anwendbare Kriterien",
                questionSubtitle: "Beantworten Sie Fragen, um nicht anwendbare Kriterien auszufiltern",
                previous: "Zurück",
                next: "Weiter",
                skipToTesting: "Direkt zum Test",
                startTesting: "Test starten",
                
                // Testing Phase
                testCriteria: "Kriterien testen",
                testing: "Teste",
                criteria: "Kriterien",
                progress: "Fortschritt",
                all: "Alle",
                pending: "Ausstehend",
                pass: "Bestanden",
                fail: "Fehlgeschlagen",
                na: "N/V",
                addNotes: "Notizen hinzufügen...",
                remove: "Entfernen",
                
                // Removed Criteria
                removedCriteria: "Entfernte Kriterien",
                showRemovedCriteria: "Entfernte Kriterien anzeigen",
                hideRemovedCriteria: "Entfernte Kriterien ausblenden",
                addBack: "Zurückholen",
                noRemovedCriteria: "Keine Kriterien wurden entfernt.",
                
                // Actions
                saveResults: "Ergebnisse speichern",
                export: "Exportieren",
                newTest: "Neuer Test",
                
                // Save Dialog
                saveTestResults: "Testergebnisse speichern",
                enterTestName: "Testname eingeben...",
                save: "Speichern",
                cancel: "Abbrechen",
                
                // Saved Tests
                savedTests: "Gespeicherte Tests",
                noSavedTests: "Noch keine gespeicherten Tests.",
                view: "Anzeigen",
                delete: "Löschen",
                
                // Skip Info
                skipInfo: "Fragen wurden übersprungen. Alle Kriterien werden getestet. Sie können nicht anwendbare Kriterien unten entfernen.",
                
                // Confirmations
                skipConfirm: "Verbleibende Fragen überspringen und alle Kriterien testen? Sie können später noch Kriterien entfernen.",
                newTestConfirm: "Neuen Test starten? Alle ungespeicherten Änderungen gehen verloren.",
                deleteTestConfirm: "Sind Sie sicher, dass Sie diesen Test löschen möchten?",
                selectAnswer: "Bitte wählen Sie eine Antwort aus, bevor Sie fortfahren.",
                enterTestNameAlert: "Bitte geben Sie einen Namen für diesen Test ein.",
                testSaved: "Test erfolgreich gespeichert!",
                
                // Export
                chooseExportFormat: "Exportformat wählen:\n1. JSON\n2. CSV\n3. HTML-Bericht\n\nGeben Sie 1, 2 oder 3 ein:",
                invalidOption: "Ungültige Option",
                
                // Language
                language: "Sprache",
                english: "English",
                german: "Deutsch",
                
                // Saved test metadata
                passed: "bestanden",
                failed: "fehlgeschlagen",
                
                // Screenshot functionality
                annotateScreenshot: "Screenshot kommentieren",
                circleTool: "Kreis-Werkzeug",
                rectangleTool: "Rechteck-Werkzeug",
                criticalIssues: "Kritische Probleme",
                minorIssues: "Kleinere Probleme",
                notesHighlights: "Notizen/Markierungen",
                clearAnnotations: "Alle Markierungen löschen",
                clickOrDrag: "Klicken oder Screenshot hier hinziehen",
                pasteHint: "Strg+V zum Einfügen",
                clickToEdit: "🔍 Klicken zum Bearbeiten",
                addMoreScreenshots: "Weitere Screenshots hinzufügen",
                confirmDeleteScreenshot: "Sind Sie sicher, dass Sie diesen Screenshot löschen möchten?"
            }
        };
    }

    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('wcag-app-language', lang);
        this.updateUI();
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    updateUI() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (element.placeholder !== undefined) {
                element.placeholder = this.t(key);
            } else {
                element.textContent = this.t(key);
            }
        });

        // Update specific elements that need special handling
        const title = document.querySelector('title');
        if (title) title.textContent = this.t('appTitle');

        // Update language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) languageSelect.value = this.currentLanguage;
    }
}

// Global i18n instance
const i18n = new I18n();