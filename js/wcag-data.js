// Generate understanding URL for WCAG criteria
const generateUnderstandingUrl = (id, title) => {
    const baseUrl = "https://www.w3.org/WAI/WCAG22/Understanding/";
    
    // URL mappings for WCAG 2.2 criteria based on official understanding documents
    const urlMappings = {
        "1.1.1": "non-text-content.html",
        "1.2.1": "audio-only-and-video-only-prerecorded.html",
        "1.2.2": "captions-prerecorded.html",
        "1.2.3": "audio-description-or-media-alternative-prerecorded.html",
        "1.2.4": "captions-live.html",
        "1.2.5": "audio-description-prerecorded.html",
        "1.3.1": "info-and-relationships.html",
        "1.3.2": "meaningful-sequence.html",
        "1.3.3": "sensory-characteristics.html",
        "1.3.4": "orientation.html",
        "1.3.5": "identify-input-purpose.html",
        "1.4.1": "use-of-color.html",
        "1.4.2": "audio-control.html",
        "1.4.3": "contrast-minimum.html",
        "1.4.4": "resize-text.html",
        "1.4.5": "images-of-text.html",
        "1.4.10": "reflow.html",
        "1.4.11": "non-text-contrast.html",
        "1.4.12": "text-spacing.html",
        "1.4.13": "content-on-hover-or-focus.html",
        "2.1.1": "keyboard.html",
        "2.1.2": "no-keyboard-trap.html",
        "2.1.4": "character-key-shortcuts.html",
        "2.2.1": "timing-adjustable.html",
        "2.2.2": "pause-stop-hide.html",
        "2.3.1": "three-flashes-or-below-threshold.html",
        "2.4.1": "bypass-blocks.html",
        "2.4.2": "page-titled.html",
        "2.4.3": "focus-order.html",
        "2.4.4": "link-purpose-in-context.html",
        "2.4.5": "multiple-ways.html",
        "2.4.6": "headings-and-labels.html",
        "2.4.7": "focus-visible.html",
        "2.4.11": "focus-not-obscured-minimum.html",
        "2.5.1": "pointer-gestures.html",
        "2.5.2": "pointer-cancellation.html",
        "2.5.3": "label-in-name.html",
        "2.5.4": "motion-actuation.html",
        "2.5.7": "dragging-movements.html",
        "2.5.8": "target-size-minimum.html",
        "3.1.1": "language-of-page.html",
        "3.1.2": "language-of-parts.html",
        "3.2.1": "on-focus.html",
        "3.2.2": "on-input.html",
        "3.2.3": "consistent-navigation.html",
        "3.2.4": "consistent-identification.html",
        "3.2.6": "consistent-help.html",
        "3.3.1": "error-identification.html",
        "3.3.2": "labels-or-instructions.html",
        "3.3.3": "error-suggestion.html",
        "3.3.4": "error-prevention-legal-financial-data.html",
        "3.3.7": "redundant-entry.html",
        "3.3.8": "accessible-authentication-minimum.html",
        "4.1.2": "name-role-value.html",
        "4.1.3": "status-messages.html"
    };
    
    return baseUrl + (urlMappings[id] || "");
};

const wcagCriteria = [
    // 1.1 Text Alternatives
    {
        id: "1.1.1",
        level: "A",
        title: {
            en: "Non-text Content",
            de: "Nicht-textuelle Inhalte"
        },
        description: {
            en: "All non-text content has a text alternative that serves the equivalent purpose. Check that decorative images have empty alt text (alt=''), informative images have descriptive alt text, complex images have detailed descriptions, and functional images describe the action/destination.",
            de: "Alle nicht-textuellen Inhalte haben eine Textalternative, die dem gleichen Zweck dient. Prüfen Sie, dass dekorative Bilder leeren Alt-Text haben (alt=''), informative Bilder beschreibenden Alt-Text haben, komplexe Bilder detaillierte Beschreibungen haben und funktionale Bilder die Aktion/das Ziel beschreiben."
        },
        categories: ["images", "multimedia"],
        tags: ["images", "icons", "charts", "audio", "video"],
        understandingUrl: generateUnderstandingUrl("1.1.1", "Non-text Content")
    },
    
    // 1.2 Time-based Media
    {
        id: "1.2.1",
        level: "A",
        title: {
            en: "Audio-only and Video-only (Prerecorded)",
            de: "Nur-Audio und Nur-Video (aufgezeichnet)"
        },
        description: {
            en: "Provide alternatives for prerecorded audio-only and video-only content. For audio-only: provide transcript. For video-only: provide audio description or text description of visual content.",
            de: "Alternativen für aufgezeichnete Nur-Audio- und Nur-Video-Inhalte bereitstellen. Für Nur-Audio: Transkript bereitstellen. Für Nur-Video: Audiobeschreibung oder Textbeschreibung des visuellen Inhalts bereitstellen."
        },
        categories: ["multimedia"],
        tags: ["audio", "video", "prerecorded"],
        understandingUrl: generateUnderstandingUrl("1.2.1", "Audio-only and Video-only (Prerecorded)")
    },
    {
        id: "1.2.2",
        level: "A",
        title: {
            en: "Captions (Prerecorded)",
            de: "Untertitel (aufgezeichnet)"
        },
        description: {
            en: "Captions are provided for all prerecorded audio content in synchronized media",
            de: "Untertitel werden für alle aufgezeichneten Audioinhalte in synchronisierten Medien bereitgestellt"
        },
        categories: ["multimedia"],
        tags: ["video", "captions", "prerecorded"],
        understandingUrl: generateUnderstandingUrl("1.2.2", "Captions (Prerecorded)")
    },
    {
        id: "1.2.3",
        level: "A",
        title: {
            en: "Audio Description or Media Alternative (Prerecorded)",
            de: "Audiobeschreibung oder Medienalternative (aufgezeichnet)"
        },
        description: {
            en: "Alternative for time-based media or audio description is provided for prerecorded video. Check that videos with visual information have either audio description track OR full transcript that includes description of visual elements, actions, and scene changes.",
            de: "Alternative für zeitbasierte Medien oder Audiobeschreibung wird für aufgezeichnete Videos bereitgestellt. Prüfen Sie, dass Videos mit visuellen Informationen entweder eine Audiobeschreibungsspur ODER ein vollständiges Transkript haben, das die Beschreibung visueller Elemente, Aktionen und Szenenwechsel enthält."
        },
        categories: ["multimedia"],
        tags: ["video", "audio-description", "prerecorded"],
        understandingUrl: generateUnderstandingUrl("1.2.3", "Audio Description or Media Alternative (Prerecorded)")
    },
    {
        id: "1.2.4",
        level: "AA",
        title: {
            en: "Captions (Live)",
            de: "Untertitel (live)"
        },
        description: {
            en: "Captions are provided for all live audio content",
            de: "Untertitel werden für alle Live-Audioinhalte bereitgestellt"
        },
        categories: ["multimedia"],
        tags: ["video", "captions", "live"],
        understandingUrl: generateUnderstandingUrl("1.2.4", "Captions (Live)")
    },
    {
        id: "1.2.5",
        level: "AA",
        title: {
            en: "Audio Description (Prerecorded)",
            de: "Audiobeschreibung (aufgezeichnet)"
        },
        description: {
            en: "Audio description is provided for all prerecorded video content",
            de: "Audiobeschreibung wird für alle aufgezeichneten Videoinhalte bereitgestellt"
        },
        categories: ["multimedia"],
        tags: ["video", "audio-description", "prerecorded"],
        understandingUrl: generateUnderstandingUrl("1.2.5", "Audio Description (Prerecorded)")
    },
    
    // 1.3 Adaptable
    {
        id: "1.3.1",
        level: "A",
        title: {
            en: "Info and Relationships",
            de: "Informationen und Beziehungen"
        },
        description: {
            en: "Information, structure, and relationships can be programmatically determined. Check that headings use proper heading tags (h1-h6), lists use list markup, tables have headers, form fields have labels, and visual relationships are coded with proper HTML structure.",
            de: "Informationen, Struktur und Beziehungen können programmatisch ermittelt werden. Prüfen Sie, dass Überschriften die richtigen Überschrift-Tags (h1-h6) verwenden, Listen das Listen-Markup verwenden, Tabellen Kopfzeilen haben, Formularfelder Labels haben und visuelle Beziehungen mit der richtigen HTML-Struktur codiert sind."
        },
        categories: ["structure"],
        tags: ["headings", "lists", "tables", "forms", "semantic"],
        understandingUrl: generateUnderstandingUrl("1.3.1", "Info and Relationships")
    },
    {
        id: "1.3.2",
        level: "A",
        title: {
            en: "Meaningful Sequence",
            de: "Bedeutungsvolle Reihenfolge"
        },
        description: {
            en: "Correct reading sequence can be programmatically determined. Test with Tab key and screen reader to ensure content is read in logical order, especially for multi-column layouts, positioned elements, and CSS-styled content.",
            de: "Die korrekte Lesereihenfolge kann programmatisch ermittelt werden. Testen Sie mit der Tab-Taste und dem Screenreader, um sicherzustellen, dass Inhalte in logischer Reihenfolge gelesen werden, besonders bei mehrspaltigen Layouts, positionierten Elementen und CSS-gestylten Inhalten."
        },
        categories: ["structure"],
        tags: ["reading-order", "layout"],
        understandingUrl: generateUnderstandingUrl("1.3.2", "Meaningful Sequence")
    },
    {
        id: "1.3.3",
        level: "A",
        title: {
            en: "Sensory Characteristics",
            de: "Sinnesbezogene Eigenschaften"
        },
        description: {
            en: "Instructions don't rely solely on sensory characteristics. Check that instructions don't rely only on shape ('click the round button'), size ('the large icon'), position ('button on the right'), color ('red link'), or sound ('after the beep'). Include text labels or other identifying information.",
            de: "Anweisungen beruhen nicht ausschließlich auf sensorischen Eigenschaften. Prüfen Sie, dass Anweisungen nicht nur auf Form ('Klicken Sie die runde Schaltfläche'), Größe ('das große Symbol'), Position ('Schaltfläche rechts'), Farbe ('roter Link') oder Ton ('nach dem Piepton') beruhen. Textlabels oder andere identifizierende Informationen hinzufügen."
        },
        categories: ["content"],
        tags: ["instructions", "shape", "size", "location", "sound"],
        understandingUrl: generateUnderstandingUrl("1.3.3", "Sensory Characteristics")
    },
    {
        id: "1.3.4",
        level: "AA",
        title: {
            en: "Orientation",
            de: "Bildschirmausrichtung"
        },
        description: {
            en: "Content does not restrict its view to a single display orientation. Test by rotating device/browser - content should work in both portrait and landscape unless orientation is essential to functionality (like piano apps or bank check deposits).",
            de: "Inhalte beschränken ihre Anzeige nicht auf eine einzige Bildschirmausrichtung. Testen Sie durch Drehen des Geräts/Browsers - Inhalte sollten sowohl im Hoch- als auch im Querformat funktionieren, es sei denn, die Ausrichtung ist für die Funktionalität wesentlich (wie bei Klavier-Apps oder Scheckeinzahlungen)."
        },
        categories: ["responsive"],
        tags: ["mobile", "orientation", "portrait", "landscape"],
        understandingUrl: generateUnderstandingUrl("1.3.4", "Orientation")
    },
    {
        id: "1.3.5",
        level: "AA",
        title: {
            en: "Identify Input Purpose",
            de: "Eingabezweck identifizieren"
        },
        description: {
            en: "Purpose of form inputs can be programmatically determined. Check that common form fields have appropriate autocomplete attributes (name, email, phone, address fields) so browsers/assistive tech can auto-fill correctly.",
            de: "Der Zweck von Formulareingaben kann programmatisch ermittelt werden. Prüfen Sie, dass häufige Formularfelder entsprechende Autocomplete-Attribute haben (Name, E-Mail, Telefon, Adressfelder), damit Browser/Hilfstechnologien korrekt automatisch ausfüllen können."
        },
        categories: ["forms"],
        tags: ["forms", "autocomplete", "input-purpose"],
        understandingUrl: generateUnderstandingUrl("1.3.5", "Identify Input Purpose")
    },
    
    // 1.4 Distinguishable
    {
        id: "1.4.1",
        level: "A",
        title: {
            en: "Use of Color",
            de: "Verwendung von Farbe"
        },
        description: {
            en: "Color is not used as the only visual means of conveying information. Check that required form fields, error states, links in text, and other important information use more than just color - add text, icons, underlines, or patterns.",
            de: "Farbe wird nicht als einziges visuelles Mittel zur Informationsübermittlung verwendet. Prüfen Sie, dass Pflichtformularfelder, Fehlerzustände, Links im Text und andere wichtige Informationen mehr als nur Farbe verwenden - Text, Symbole, Unterstriche oder Muster hinzufügen."
        },
        categories: ["color"],
        tags: ["color", "contrast", "links", "errors"],
        understandingUrl: generateUnderstandingUrl("1.4.1", "Use of Color")
    },
    {
        id: "1.4.2",
        level: "A",
        title: {
            en: "Audio Control",
            de: "Audiokontrolle"
        },
        description: {
            en: "Audio that plays automatically can be paused or stopped. Check that auto-playing audio longer than 3 seconds has visible pause/stop controls, or auto-stops within 3 seconds.",
            de: "Audio, das automatisch abgespielt wird, kann pausiert oder gestoppt werden. Prüfen Sie, dass automatisch abspielendes Audio länger als 3 Sekunden sichtbare Pause-/Stopp-Bedienelemente hat oder sich innerhalb von 3 Sekunden automatisch stoppt."
        },
        categories: ["multimedia", "autoplay"],
        tags: ["audio", "autoplay", "background-music"],
        understandingUrl: generateUnderstandingUrl("1.4.2", "Audio Control")
    },
    {
        id: "1.4.3",
        level: "AA",
        title: {
            en: "Contrast (Minimum)",
            de: "Kontrast (Minimum)"
        },
        description: {
            en: "Text has a contrast ratio of at least 4.5:1. Check with contrast checker tool - regular text needs 4.5:1 ratio, large text (18pt+ or 14pt+ bold) needs 3:1 ratio against background.",
            de: "Text hat ein Kontrastverhältnis von mindestens 4.5:1. Prüfen Sie mit einem Kontrastprüf-Tool - normaler Text benötigt ein 4.5:1-Verhältnis, großer Text (18pt+ oder 14pt+ fett) benötigt ein 3:1-Verhältnis gegenüber dem Hintergrund."
        },
        categories: ["color"],
        tags: ["contrast", "text", "readability"],
        understandingUrl: generateUnderstandingUrl("1.4.3", "Contrast (Minimum)")
    },
    {
        id: "1.4.4",
        level: "AA",
        title: {
            en: "Resize Text",
            de: "Text vergrößern"
        },
        description: {
            en: "Text can be resized up to 200% without loss of functionality. Test by zooming browser to 200% - check that all text is readable, no content is cut off, all functions still work, and horizontal scrolling isn't required.",
            de: "Text kann bis zu 200% vergrößert werden ohne Verlust der Funktionalität. Testen Sie durch Zoomen des Browsers auf 200% - prüfen Sie, dass aller Text lesbar ist, kein Inhalt abgeschnitten wird, alle Funktionen noch funktionieren und horizontales Scrollen nicht erforderlich ist."
        },
        categories: ["responsive"],
        tags: ["zoom", "text-size", "responsive"],
        understandingUrl: generateUnderstandingUrl("1.4.4", "Resize Text")
    },
    {
        id: "1.4.5",
        level: "AA",
        title: {
            en: "Images of Text",
            de: "Textbilder"
        },
        description: {
            en: "Text is used instead of images of text",
            de: "Text wird anstelle von Textbildern verwendet"
        },
        categories: ["images"],
        tags: ["text-images", "real-text"],
        understandingUrl: generateUnderstandingUrl("1.4.5", "Images of Text")
    },
    {
        id: "1.4.10",
        level: "AA",
        title: {
            en: "Reflow",
            de: "Umfluss"
        },
        description: {
            en: "Content can be presented without horizontal scrolling. At 320px wide viewport and 400% zoom, content should reflow without horizontal scrolling (except for data tables, images, videos, games, or presentations where 2D layout is essential).",
            de: "Inhalte können ohne horizontales Scrollen dargestellt werden. Bei 320px breitem Viewport und 400% Zoom sollten Inhalte ohne horizontales Scrollen umfließen (außer bei Datentabellen, Bildern, Videos, Spielen oder Präsentationen, wo ein 2D-Layout wesentlich ist)."
        },
        categories: ["responsive"],
        tags: ["responsive", "reflow", "mobile", "zoom"],
        understandingUrl: generateUnderstandingUrl("1.4.10", "Reflow")
    },
    {
        id: "1.4.11",
        level: "AA",
        title: {
            en: "Non-text Contrast",
            de: "Kontrast für Nicht-Text-Elemente"
        },
        description: {
            en: "UI components and graphics have sufficient contrast. Check that interactive elements (buttons, form borders, focus indicators) and meaningful graphics have 3:1 contrast ratio against adjacent colors.",
            de: "UI-Komponenten und Grafiken haben ausreichend Kontrast. Prüfen Sie, dass interaktive Elemente (Schaltflächen, Formularränder, Fokusindikatoren) und bedeutungsvolle Grafiken ein 3:1-Kontrastverhältnis gegen angrenzende Farben haben."
        },
        categories: ["color"],
        tags: ["contrast", "buttons", "icons", "graphics"],
        understandingUrl: generateUnderstandingUrl("1.4.11", "Non-text Contrast")
    },
    {
        id: "1.4.12",
        level: "AA",
        title: {
            en: "Text Spacing",
            de: "Textabstand"
        },
        description: {
            en: "No loss of content when text spacing is adjusted. Test by setting CSS: line-height: 1.5em, paragraph spacing: 2em, letter spacing: 0.12em, word spacing: 0.16em - ensure no content is cut off or overlaps.",
            de: "Kein Inhaltsverlust bei Anpassung der Textabstände. Testen Sie durch Setzen von CSS: line-height: 1.5em, paragraph spacing: 2em, letter spacing: 0.12em, word spacing: 0.16em - stellen Sie sicher, dass kein Inhalt abgeschnitten wird oder sich überlappt."
        },
        categories: ["responsive"],
        tags: ["text-spacing", "line-height", "readability"],
        understandingUrl: generateUnderstandingUrl("1.4.12", "Text Spacing")
    },
    {
        id: "1.4.13",
        level: "AA",
        title: {
            en: "Content on Hover or Focus",
            de: "Inhalte bei Hover oder Fokus"
        },
        description: {
            en: "Additional content on hover/focus is dismissible, hoverable, and persistent",
            de: "Zusätzliche Inhalte bei Hover/Fokus sind ausblendbar, überfahrbar und dauerhaft"
        },
        categories: ["interactive"],
        tags: ["tooltips", "hover", "focus", "popups"],
        understandingUrl: generateUnderstandingUrl("1.4.13", "Content on Hover or Focus")
    },
    
    // 2.1 Keyboard Accessible
    {
        id: "2.1.1",
        level: "A",
        title: {
            en: "Keyboard",
            de: "Tastatur"
        },
        description: {
            en: "All functionality is available from a keyboard. Test using only Tab, Shift+Tab, Enter, Space, and arrow keys - ensure all interactive elements can be reached and activated without a mouse.",
            de: "Alle Funktionalitäten sind über die Tastatur verfügbar. Testen Sie nur mit Tab, Shift+Tab, Enter, Leertaste und Pfeiltasten - stellen Sie sicher, dass alle interaktiven Elemente ohne Maus erreicht und aktiviert werden können."
        },
        categories: ["keyboard"],
        tags: ["keyboard", "navigation", "interactive"],
        understandingUrl: generateUnderstandingUrl("2.1.1", "Keyboard")
    },
    {
        id: "2.1.2",
        level: "A",
        title: {
            en: "No Keyboard Trap",
            de: "Keine Tastaturfalle"
        },
        description: {
            en: "Keyboard focus can be moved away from any component. Test that focus doesn't get stuck in any component. Modal dialogs should trap focus within the modal but provide a way to close/escape.",
            de: "Der Tastaturfokus kann von jeder Komponente wegbewegt werden. Testen Sie, dass der Fokus in keiner Komponente hängen bleibt. Modale Dialoge sollten den Fokus innerhalb des Modals gefangen halten, aber einen Weg zum Schließen/Entkommen bieten."
        },
        categories: ["keyboard"],
        tags: ["keyboard", "focus-trap", "modal"],
        understandingUrl: generateUnderstandingUrl("2.1.2", "No Keyboard Trap")
    },
    {
        id: "2.1.4",
        level: "A",
        title: {
            en: "Character Key Shortcuts",
            de: "Zeichentasten-Kurzbefehle"
        },
        description: {
            en: "Single character key shortcuts can be turned off or remapped",
            de: "Einzelzeichen-Tastenkombinationen können ausgeschaltet oder neu zugeordnet werden"
        },
        categories: ["keyboard"],
        tags: ["keyboard", "shortcuts", "single-key"],
        understandingUrl: generateUnderstandingUrl("2.1.4", "Character Key Shortcuts")
    },
    
    // 2.2 Enough Time
    {
        id: "2.2.1",
        level: "A",
        title: {
            en: "Timing Adjustable",
            de: "Einstellbare Zeitlimits"
        },
        description: {
            en: "Time limits can be turned off, adjusted, or extended",
            de: "Zeitlimits können ausgeschaltet, angepasst oder verlängert werden"
        },
        categories: ["time-limits"],
        tags: ["session-timeout", "time-limits", "forms"],
        understandingUrl: generateUnderstandingUrl("2.2.1", "Timing Adjustable")
    },
    {
        id: "2.2.2",
        level: "A",
        title: {
            en: "Pause, Stop, Hide",
            de: "Pausieren, Stoppen, Ausblenden"
        },
        description: {
            en: "Moving or auto-updating content can be paused, stopped, or hidden",
            de: "Sich bewegende oder automatisch aktualisierende Inhalte können pausiert, gestoppt oder ausgeblendet werden"
        },
        categories: ["animation", "autoplay"],
        tags: ["carousel", "animation", "auto-update", "scrolling"],
        understandingUrl: generateUnderstandingUrl("2.2.2", "Pause, Stop, Hide")
    },
    
    // 2.3 Seizures
    {
        id: "2.3.1",
        level: "A",
        title: {
            en: "Three Flashes or Below Threshold",
            de: "Drei Blitze oder unter dem Schwellenwert"
        },
        description: {
            en: "Nothing flashes more than three times per second",
            de: "Nichts blitzt mehr als dreimal pro Sekunde"
        },
        categories: ["animation"],
        tags: ["flashing", "seizures", "animation"],
        understandingUrl: generateUnderstandingUrl("2.3.1", "Three Flashes or Below Threshold")
    },
    
    // 2.4 Navigable
    {
        id: "2.4.1",
        level: "A",
        title: {
            en: "Bypass Blocks",
            de: "Blöcke umgehen"
        },
        description: {
            en: "A mechanism to bypass blocks of repeated content. Check for skip links (usually 'Skip to main content') that let keyboard users jump past navigation menus and repeated content blocks.",
            de: "Ein Mechanismus zum Umgehen von Blöcken wiederholter Inhalte. Prüfen Sie auf Skip-Links (normalerweise 'Zum Hauptinhalt springen'), die es Tastaturnutzern ermöglichen, über Navigationsmenüs und wiederholte Inhaltsblöcke hinwegzuspringen."
        },
        categories: ["navigation", "multi-page"],
        tags: ["skip-links", "navigation", "repeated-content"],
        understandingUrl: generateUnderstandingUrl("2.4.1", "Bypass Blocks")
    },
    {
        id: "2.4.2",
        level: "A",
        title: {
            en: "Page Titled",
            de: "Seitentitel"
        },
        description: {
            en: "Pages have descriptive and unique titles",
            de: "Seiten haben beschreibende und eindeutige Titel"
        },
        categories: ["navigation", "multi-page"],
        tags: ["page-title", "document-title"],
        understandingUrl: generateUnderstandingUrl("2.4.2", "Page Titled")
    },
    {
        id: "2.4.3",
        level: "A",
        title: {
            en: "Focus Order",
            de: "Fokusreihenfolge"
        },
        description: {
            en: "Components receive focus in a meaningful order. Test tab order follows logical reading sequence - top to bottom, left to right, and matches visual layout. Focus should move through related content together.",
            de: "Komponenten erhalten den Fokus in einer bedeutungsvollen Reihenfolge. Testen Sie, dass die Tab-Reihenfolge der logischen Leserichtung folgt - von oben nach unten, von links nach rechts, und dem visuellen Layout entspricht. Der Fokus sollte sich zusammenhängend durch verwandte Inhalte bewegen."
        },
        categories: ["keyboard", "navigation"],
        tags: ["tab-order", "focus", "navigation"],
        understandingUrl: generateUnderstandingUrl("2.4.3", "Focus Order")
    },
    {
        id: "2.4.4",
        level: "A",
        title: {
            en: "Link Purpose (In Context)",
            de: "Linkzweck (im Kontext)"
        },
        description: {
            en: "Purpose of each link can be determined from link text or context. Avoid generic link text like 'click here', 'read more', 'learn more'. Links should make sense when read out of context or provide sufficient surrounding context.",
            de: "Der Zweck jedes Links kann aus dem Linktext oder Kontext ermittelt werden. Vermeiden Sie generische Linktexte wie 'hier klicken', 'mehr lesen', 'mehr erfahren'. Links sollten Sinn ergeben, wenn sie außerhalb des Kontexts gelesen werden, oder ausreichend umgebenden Kontext bieten."
        },
        categories: ["navigation"],
        tags: ["links", "link-text", "context"],
        understandingUrl: generateUnderstandingUrl("2.4.4", "Link Purpose (In Context)")
    },
    {
        id: "2.4.5",
        level: "AA",
        title: {
            en: "Multiple Ways",
            de: "Mehrere Wege"
        },
        description: {
            en: "Multiple ways to locate a page within a site",
            de: "Mehrere Wege, um eine Seite innerhalb einer Website zu finden"
        },
        categories: ["navigation", "multi-page"],
        tags: ["sitemap", "search", "navigation", "menu"],
        understandingUrl: generateUnderstandingUrl("2.4.5", "Multiple Ways")
    },
    {
        id: "2.4.6",
        level: "AA",
        title: {
            en: "Headings and Labels",
            de: "Überschriften und Labels"
        },
        description: {
            en: "Headings and labels describe topic or purpose",
            de: "Überschriften und Labels beschreiben Thema oder Zweck"
        },
        categories: ["structure"],
        tags: ["headings", "labels", "forms"],
        understandingUrl: generateUnderstandingUrl("2.4.6", "Headings and Labels")
    },
    {
        id: "2.4.7",
        level: "AA",
        title: {
            en: "Focus Visible",
            de: "Sichtbarer Fokus"
        },
        description: {
            en: "Keyboard focus indicator is visible",
            de: "Der Tastaturfokus-Indikator ist sichtbar"
        },
        categories: ["keyboard"],
        tags: ["focus", "focus-indicator", "keyboard"],
        understandingUrl: generateUnderstandingUrl("2.4.7", "Focus Visible")
    },
    {
        id: "2.4.11",
        level: "AA",
        title: {
            en: "Focus Not Obscured (Minimum)",
            de: "Fokus nicht verdeckt (Minimum)"
        },
        description: {
            en: "Focused item is not entirely hidden by other content. Check that focused elements aren't completely hidden by sticky headers, cookie banners, or other overlays. Some partial obscuring is acceptable.",
            de: "Fokussierte Elemente sind nicht vollständig von anderen Inhalten verdeckt. Prüfen Sie, dass fokussierte Elemente nicht vollständig von klebrigen Kopfzeilen, Cookie-Bannern oder anderen Überlagerungen verborgen sind. Teilweise Verdeckung ist akzeptabel."
        },
        categories: ["keyboard"],
        tags: ["focus", "overlays", "sticky-header"],
        understandingUrl: generateUnderstandingUrl("2.4.11", "Focus Not Obscured (Minimum)")
    },
    
    // 2.5 Input Modalities
    {
        id: "2.5.1",
        level: "A",
        title: {
            en: "Pointer Gestures",
            de: "Zeigergesten"
        },
        description: {
            en: "Functionality using multipoint or path-based gestures has alternatives. Check that pinch-to-zoom, two-finger scrolling, complex swipes, and drawing gestures have single-tap alternatives like zoom buttons or simplified gestures.",
            de: "Funktionalitäten mit Mehrpunkt- oder pfadbasierten Gesten haben Alternativen. Prüfen Sie, dass Kneifen zum Zoomen, Zwei-Finger-Scrollen, komplexe Wischgesten und Zeichengesten Einzel-Tap-Alternativen wie Zoom-Schaltflächen oder vereinfachte Gesten haben."
        },
        categories: ["interactive"],
        tags: ["gestures", "touch", "mobile"],
        understandingUrl: generateUnderstandingUrl("2.5.1", "Pointer Gestures")
    },
    {
        id: "2.5.2",
        level: "A",
        title: {
            en: "Pointer Cancellation",
            de: "Zeiger-Abbruch"
        },
        description: {
            en: "Functionality using a single pointer can be cancelled. Check that actions don't trigger on down-event (touch/mousedown). Allow users to cancel by moving pointer away before releasing, or provide undo functionality.",
            de: "Funktionalitäten mit einem einzigen Zeiger können abgebrochen werden. Prüfen Sie, dass Aktionen nicht bei Down-Events (Touch/Mousedown) ausgelöst werden. Ermöglichen Sie Benutzern, durch Wegbewegen des Zeigers vor dem Loslassen abzubrechen oder bieten Sie Rückgängig-Funktionalität."
        },
        categories: ["interactive"],
        tags: ["click", "touch", "mouse"],
        understandingUrl: generateUnderstandingUrl("2.5.2", "Pointer Cancellation")
    },
    {
        id: "2.5.3",
        level: "A",
        title: {
            en: "Label in Name",
            de: "Label im Namen"
        },
        description: {
            en: "Visible labels match accessible names",
            de: "Sichtbare Labels entsprechen den barrierefreien Namen"
        },
        categories: ["forms", "interactive"],
        tags: ["labels", "buttons", "accessible-name"],
        understandingUrl: generateUnderstandingUrl("2.5.3", "Label in Name")
    },
    {
        id: "2.5.4",
        level: "A",
        title: {
            en: "Motion Actuation",
            de: "Bewegungsauslösung"
        },
        description: {
            en: "Functionality triggered by motion has UI alternatives",
            de: "Durch Bewegung ausgelöste Funktionalitäten haben UI-Alternativen"
        },
        categories: ["interactive"],
        tags: ["motion", "shake", "tilt"],
        understandingUrl: generateUnderstandingUrl("2.5.4", "Motion Actuation")
    },
    {
        id: "2.5.7",
        level: "AA",
        title: {
            en: "Dragging Movements",
            de: "Ziehbewegungen"
        },
        description: {
            en: "Dragging functionality has single pointer alternatives",
            de: "Ziehfunktionalität hat Einzelzeiger-Alternativen"
        },
        categories: ["interactive"],
        tags: ["drag-drop", "touch", "mouse"],
        understandingUrl: generateUnderstandingUrl("2.5.7", "Dragging Movements")
    },
    {
        id: "2.5.8",
        level: "AA",
        title: {
            en: "Target Size (Minimum)",
            de: "Zielgröße (Minimum)"
        },
        description: {
            en: "Interactive targets are at least 24x24 CSS pixels",
            de: "Interaktive Ziele sind mindestens 24x24 CSS-Pixel groß"
        },
        categories: ["interactive"],
        tags: ["buttons", "links", "touch-targets", "mobile"],
        understandingUrl: generateUnderstandingUrl("2.5.8", "Target Size (Minimum)")
    },
    
    // 3.1 Readable
    {
        id: "3.1.1",
        level: "A",
        title: {
            en: "Language of Page",
            de: "Sprache der Seite"
        },
        description: {
            en: "Default language of the page can be programmatically determined. Check that html element has lang attribute (e.g., <html lang='en'>) matching the page's primary language.",
            de: "Die Standardsprache der Seite kann programmatisch ermittelt werden. Prüfen Sie, dass das HTML-Element ein lang-Attribut hat (z.B. <html lang='de'>), das der Hauptsprache der Seite entspricht."
        },
        categories: ["content"],
        tags: ["language", "lang-attribute"],
        understandingUrl: generateUnderstandingUrl("3.1.1", "Language of Page")
    },
    {
        id: "3.1.2",
        level: "AA",
        title: {
            en: "Language of Parts",
            de: "Sprache von Teilen"
        },
        description: {
            en: "Language of parts can be programmatically determined. Check that content in different languages has lang attribute on containing element (e.g., <span lang='fr'>bonjour</span>). Required when language differs from page default.",
            de: "Die Sprache von Teilen kann programmatisch ermittelt werden. Prüfen Sie, dass Inhalte in verschiedenen Sprachen ein lang-Attribut am umschließenden Element haben (z.B. <span lang='fr'>bonjour</span>). Erforderlich, wenn sich die Sprache vom Seitenstandard unterscheidet."
        },
        categories: ["content"],
        tags: ["language", "multilingual"],
        understandingUrl: generateUnderstandingUrl("3.1.2", "Language of Parts")
    },
    
    // 3.2 Predictable
    {
        id: "3.2.1",
        level: "A",
        title: {
            en: "On Focus",
            de: "Bei Fokus"
        },
        description: {
            en: "Focus does not initiate a change of context. Check that tabbing to elements doesn't automatically open new windows, submit forms, move focus elsewhere, or significantly change page content.",
            de: "Fokus löst keine Kontextveränderung aus. Prüfen Sie, dass das Tabben zu Elementen nicht automatisch neue Fenster öffnet, Formulare abschickt, den Fokus woanders hinbewegt oder den Seiteninhalt erheblich verändert."
        },
        categories: ["interactive"],
        tags: ["focus", "predictable", "context-change"],
        understandingUrl: generateUnderstandingUrl("3.2.1", "On Focus")
    },
    {
        id: "3.2.2",
        level: "A",
        title: {
            en: "On Input",
            de: "Bei Eingabe"
        },
        description: {
            en: "Changing a setting does not automatically change context. Check that selecting dropdowns, radio buttons, or checkboxes doesn't automatically submit forms or redirect pages unless user is warned beforehand.",
            de: "Das Ändern einer Einstellung verändert nicht automatisch den Kontext. Prüfen Sie, dass die Auswahl von Dropdowns, Optionsfeldern oder Checkboxen nicht automatisch Formulare abschickt oder Seiten weiterleitet, es sei denn, der Benutzer wird vorher gewarnt."
        },
        categories: ["forms", "interactive"],
        tags: ["forms", "predictable", "context-change"],
        understandingUrl: generateUnderstandingUrl("3.2.2", "On Input")
    },
    {
        id: "3.2.3",
        level: "AA",
        title: {
            en: "Consistent Navigation",
            de: "Konsistente Navigation"
        },
        description: {
            en: "Navigation is consistent across pages",
            de: "Die Navigation ist seitenübergreifend konsistent"
        },
        categories: ["navigation", "multi-page"],
        tags: ["navigation", "consistency", "menu"],
        understandingUrl: generateUnderstandingUrl("3.2.3", "Consistent Navigation")
    },
    {
        id: "3.2.4",
        level: "AA",
        title: {
            en: "Consistent Identification",
            de: "Konsistente Identifikation"
        },
        description: {
            en: "Components with same functionality are identified consistently",
            de: "Komponenten mit derselben Funktionalität werden konsistent identifiziert"
        },
        categories: ["interactive"],
        tags: ["consistency", "buttons", "icons"],
        understandingUrl: generateUnderstandingUrl("3.2.4", "Consistent Identification")
    },
    {
        id: "3.2.6",
        level: "AA",
        title: {
            en: "Consistent Help",
            de: "Konsistente Hilfe"
        },
        description: {
            en: "Help mechanisms appear in the same order across pages",
            de: "Hilfsmechanismen erscheinen in derselben Reihenfolge auf allen Seiten"
        },
        categories: ["navigation", "multi-page"],
        tags: ["help", "support", "consistency"],
        understandingUrl: generateUnderstandingUrl("3.2.6", "Consistent Help")
    },
    
    // 3.3 Input Assistance
    {
        id: "3.3.1",
        level: "A",
        title: {
            en: "Error Identification",
            de: "Fehleridentifikation"
        },
        description: {
            en: "Input errors are identified and described in text. Check that form validation errors are clearly identified in text (not just color/icons), located near the problematic field, and specifically describe what's wrong.",
            de: "Eingabefehler werden identifiziert und in Text beschrieben. Prüfen Sie, dass Formularvalidierungsfehler deutlich in Text identifiziert werden (nicht nur Farbe/Icons), in der Nähe des problematischen Felds platziert sind und spezifisch beschreiben, was falsch ist."
        },
        categories: ["forms"],
        tags: ["errors", "validation", "forms"],
        understandingUrl: generateUnderstandingUrl("3.3.1", "Error Identification")
    },
    {
        id: "3.3.2",
        level: "A",
        title: {
            en: "Labels or Instructions",
            de: "Labels oder Anweisungen"
        },
        description: {
            en: "Input fields have labels or instructions. Check that all form inputs have associated label elements, or clear instructions when labels aren't sufficient. Placeholder text alone is not adequate.",
            de: "Eingabefelder haben Labels oder Anweisungen. Prüfen Sie, dass alle Formulareingaben verbundene Label-Elemente haben oder klare Anweisungen, wenn Labels nicht ausreichen. Platzhaltertext allein ist nicht ausreichend."
        },
        categories: ["forms"],
        tags: ["labels", "instructions", "forms"],
        understandingUrl: generateUnderstandingUrl("3.3.2", "Labels or Instructions")
    },
    {
        id: "3.3.3",
        level: "AA",
        title: {
            en: "Error Suggestion",
            de: "Fehlervorschläge"
        },
        description: {
            en: "Error messages include suggestions for correction",
            de: "Fehlermeldungen enthalten Vorschläge zur Korrektur"
        },
        categories: ["forms"],
        tags: ["errors", "suggestions", "forms"],
        understandingUrl: generateUnderstandingUrl("3.3.3", "Error Suggestion")
    },
    {
        id: "3.3.4",
        level: "AA",
        title: {
            en: "Error Prevention (Legal, Financial, Data)",
            de: "Fehlervermeidung (Rechtlich, Finanziell, Daten)"
        },
        description: {
            en: "Submissions can be reversed, checked, or confirmed",
            de: "Eingaben können rückgängig gemacht, überprüft oder bestätigt werden"
        },
        categories: ["forms"],
        tags: ["forms", "confirmation", "data-loss"],
        understandingUrl: generateUnderstandingUrl("3.3.4", "Error Prevention (Legal, Financial, Data)")
    },
    {
        id: "3.3.7",
        level: "A",
        title: {
            en: "Redundant Entry",
            de: "Redundante Eingabe"
        },
        description: {
            en: "Previously entered information is auto-populated or available to select. In multi-step processes, check that previously entered information (name, email, address) is either pre-filled or selectable from a list to avoid re-entry.",
            de: "Bereits eingegebene Informationen werden automatisch ausgefüllt oder sind auswählbar. In mehrstufigen Prozessen prüfen Sie, dass bereits eingegebene Informationen (Name, E-Mail, Adresse) entweder vorab ausgefüllt oder aus einer Liste auswählbar sind, um Wiederholungseingaben zu vermeiden."
        },
        categories: ["forms"],
        tags: ["forms", "auto-fill", "redundant-data"],
        understandingUrl: generateUnderstandingUrl("3.3.7", "Redundant Entry")
    },
    {
        id: "3.3.8",
        level: "AA",
        title: {
            en: "Accessible Authentication (Minimum)",
            de: "Barrierefreie Authentifizierung (Minimum)"
        },
        description: {
            en: "Authentication does not require cognitive function tests. Check that login doesn't require memorizing information, solving puzzles, or identifying objects. Allow password managers, copy-paste, and alternative authentication methods.",
            de: "Authentifizierung erfordert keine kognitiven Funktionstests. Prüfen Sie, dass die Anmeldung nicht das Merken von Informationen, das Lösen von Rätseln oder das Identifizieren von Objekten erfordert. Erlauben Sie Passwort-Manager, Kopieren-Einfügen und alternative Authentifizierungsmethoden."
        },
        categories: ["forms"],
        tags: ["authentication", "login", "cognitive"],
        understandingUrl: generateUnderstandingUrl("3.3.8", "Accessible Authentication (Minimum)")
    },
    
    // 4.1 Compatible
    {
        id: "4.1.2",
        level: "A",
        title: {
            en: "Name, Role, Value",
            de: "Name, Rolle, Wert"
        },
        description: {
            en: "UI components have names and roles that can be programmatically determined. Test with screen reader - ensure all interactive elements are announced with clear names and purposes. Custom components should use ARIA labels and roles appropriately.",
            de: "UI-Komponenten haben Namen und Rollen, die programmatisch ermittelt werden können. Testen Sie mit Screenreader - stellen Sie sicher, dass alle interaktiven Elemente mit klaren Namen und Zwecken angekündigt werden. Benutzerdefinierte Komponenten sollten ARIA-Labels und -Rollen angemessen verwenden."
        },
        categories: ["interactive"],
        tags: ["aria", "accessibility-api", "screen-readers"],
        understandingUrl: generateUnderstandingUrl("4.1.2", "Name, Role, Value")
    },
    {
        id: "4.1.3",
        level: "AA",
        title: {
            en: "Status Messages",
            de: "Statusmeldungen"
        },
        description: {
            en: "Status messages can be programmatically determined. Check that success/error messages, progress indicators, and dynamic content updates are announced by screen readers using ARIA live regions or focus management.",
            de: "Statusmeldungen können programmatisch ermittelt werden. Prüfen Sie, dass Erfolgs-/Fehlermeldungen, Fortschrittsindikatoren und dynamische Inhaltsaktualisierungen von Screenreadern mittels ARIA Live-Regionen oder Fokusmanagement angekündigt werden."
        },
        categories: ["interactive"],
        tags: ["status", "notifications", "aria-live"],
        understandingUrl: generateUnderstandingUrl("4.1.3", "Status Messages")
    }
];