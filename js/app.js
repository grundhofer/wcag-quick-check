class WCAGTestApp {
    constructor() {
        this.questionManager = new QuestionManager();
        this.storageManager = new StorageManager();
        this.testResults = [];
        this.currentFilter = 'all';
        
        this.initializeElements();
        this.attachEventListeners();
        this.initialize();
    }

    initializeElements() {
        // Question phase elements
        this.questionPhase = document.getElementById('questionPhase');
        this.questionContainer = document.getElementById('questionContainer');
        this.questionProgress = document.getElementById('questionProgress');
        this.criteriaCount = document.getElementById('criteriaCount');
        this.prevButton = document.getElementById('prevQuestion');
        this.nextButton = document.getElementById('nextQuestion');
        this.startTestingButton = document.getElementById('startTesting');
        this.skipButton = document.getElementById('skipQuestions');
        
        // Testing phase elements
        this.testingPhase = document.getElementById('testingPhase');
        this.criteriaList = document.getElementById('criteriaList');
        this.testCount = document.getElementById('testCount');
        this.testProgress = document.getElementById('testProgress');
        
        // Removed criteria elements
        this.removedCriteriaList = document.getElementById('removedCriteriaList');
        this.removedCount = document.getElementById('removedCount');
        this.toggleRemovedButton = document.getElementById('toggleRemoved');
        
        // Save dialog elements
        this.saveDialog = document.getElementById('saveDialog');
        this.testNameInput = document.getElementById('testName');
        
        // Saved results
        this.savedTestsList = document.getElementById('savedTestsList');
        
        // Screenshot elements
        this.screenshotLightbox = document.getElementById('screenshotLightbox');
        this.annotationCanvas = document.getElementById('annotationCanvas');
        this.canvasContext = this.annotationCanvas.getContext('2d');
        
        // Screenshot annotation state
        this.currentTool = 'circle';
        this.currentColor = '#d93025';
        this.isDrawing = false;
        this.currentCriterionId = null;
        this.originalImage = null;
        this.annotations = [];
    }

    attachEventListeners() {
        // Navigation buttons
        this.prevButton.addEventListener('click', () => this.previousQuestion());
        this.nextButton.addEventListener('click', () => this.nextQuestion());
        this.startTestingButton.addEventListener('click', () => this.startTesting());
        this.skipButton.addEventListener('click', () => this.skipQuestions());
        
        // Testing phase buttons
        document.getElementById('saveResults').addEventListener('click', () => this.showSaveDialog());
        document.getElementById('exportResults').addEventListener('click', () => this.showExportOptions());
        document.getElementById('newTest').addEventListener('click', () => this.startNewTest());
        
        // Removed criteria button
        this.toggleRemovedButton.addEventListener('click', () => this.toggleRemovedCriteria());
        
        // Save dialog buttons
        document.getElementById('confirmSave').addEventListener('click', () => this.saveTest());
        document.getElementById('cancelSave').addEventListener('click', () => this.hideSaveDialog());
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterCriteria(e.target.dataset.filter));
        });
        
        // Screenshot functionality
        document.addEventListener('paste', (e) => this.handlePaste(e));
        
        // Annotation tools
        document.querySelectorAll('.annotation-tool').forEach(tool => {
            tool.addEventListener('click', (e) => this.selectAnnotationTool(e.target));
        });
        
        document.querySelectorAll('.color-option').forEach(color => {
            color.addEventListener('click', (e) => this.selectColor(e.target));
        });
        
        // Canvas drawing events
        this.annotationCanvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.annotationCanvas.addEventListener('mousemove', (e) => this.draw(e));
        this.annotationCanvas.addEventListener('mouseup', (e) => this.stopDrawing(e));
        
        // Lightbox background click to close
        this.screenshotLightbox.addEventListener('click', (e) => {
            if (e.target === this.screenshotLightbox) {
                this.closeScreenshotLightbox();
            }
        });
    }

    initialize() {
        this.setupLanguage();
        this.displayQuestion();
        this.updateCriteriaCount();
        this.loadSavedTests();
    }

    setupLanguage() {
        // Set up language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = i18n.getCurrentLanguage();
            languageSelect.addEventListener('change', (e) => {
                i18n.setLanguage(e.target.value);
                // Update dynamic content
                this.displayQuestion();
                if (this.testingPhase.style.display !== 'none') {
                    this.displayCriteria();
                    this.displayRemovedCriteria();
                }
            });
        }
        
        // Initialize UI translations
        i18n.updateUI();
    }

    displayQuestion() {
        const question = this.questionManager.getCurrentQuestion();
        const previousAnswer = this.questionManager.answers[question.id];
        const currentLang = i18n.getCurrentLanguage();
        
        // Add impact info
        const criteriaText = currentLang === 'de' ? 'Kriterien' : 'criteria';
        const affectsText = currentLang === 'de' ? 'Betrifft' : 'This affects';
        const impactInfo = question.impact ? `<p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">${affectsText} ${question.impact} ${criteriaText}</p>` : '';
        
        // Get localized text
        const questionText = typeof question.text === 'string' ? question.text : question.text[currentLang] || question.text.en;
        
        this.questionContainer.innerHTML = `
            <h3>${questionText}</h3>
            ${impactInfo}
            <div class="question-options">
                ${question.options.map(option => {
                    const optionLabel = typeof option.label === 'string' ? option.label : option.label[currentLang] || option.label.en;
                    return `
                        <button class="option-btn ${previousAnswer === option.value ? 'selected' : ''}" 
                                data-value="${option.value}">
                            ${optionLabel}
                        </button>
                    `;
                }).join('')}
            </div>
        `;
        
        // Attach click handlers to options
        this.questionContainer.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectOption(e.target));
        });
        
        // Update progress
        this.questionProgress.style.width = `${this.questionManager.getProgress()}%`;
        
        // Update navigation buttons
        this.prevButton.disabled = this.questionManager.currentQuestionIndex === 0;
        
        if (this.questionManager.isLastQuestion()) {
            this.nextButton.style.display = 'none';
            this.startTestingButton.style.display = 'inline-block';
        } else {
            this.nextButton.style.display = 'inline-block';
            this.startTestingButton.style.display = 'none';
        }
    }

    selectOption(button) {
        // Remove selected class from all buttons
        button.parentElement.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Add selected class to clicked button
        button.classList.add('selected');
        
        // Answer the question
        this.questionManager.answerQuestion(button.dataset.value);
        this.updateCriteriaCount();
    }

    updateCriteriaCount() {
        const count = this.questionManager.getFilteredCriteria().length;
        if (this.criteriaCount) {
            this.criteriaCount.textContent = count;
        }
    }

    previousQuestion() {
        if (this.questionManager.previousQuestion()) {
            this.displayQuestion();
            this.updateCriteriaCount();
        }
    }

    nextQuestion() {
        const question = this.questionManager.getCurrentQuestion();
        if (!this.questionManager.answers[question.id]) {
            alert(i18n.t('selectAnswer'));
            return;
        }
        
        if (this.questionManager.nextQuestion()) {
            this.displayQuestion();
        }
    }

    skipQuestions() {
        if (confirm(i18n.t('skipConfirm'))) {
            this.questionManager.skipRemainingQuestions();
            this.startTesting();
        }
    }

    startTesting() {
        const question = this.questionManager.getCurrentQuestion();
        if (!this.questionManager.skippedQuestions && !this.questionManager.answers[question.id]) {
            alert('Please select an answer before continuing.');
            return;
        }
        
        // Initialize test results
        this.testResults = this.questionManager.getFilteredCriteria().map(criterion => ({
            ...criterion,
            status: 'pending',
            notes: '',
            screenshots: [] // Initialize as array for multiple screenshots
        }));
        
        // Add skip info if questions were skipped
        if (this.questionManager.skippedQuestions) {
            const skipInfo = document.createElement('div');
            skipInfo.className = 'skip-info';
            skipInfo.textContent = i18n.t('skipInfo');
            this.testingPhase.insertBefore(skipInfo, this.testingPhase.firstChild);
        }
        
        // Switch to testing phase
        this.questionPhase.style.display = 'none';
        this.testingPhase.style.display = 'block';
        
        // Display criteria and removed criteria
        this.displayCriteria();
        this.displayRemovedCriteria();
        this.updateTestProgress();
    }

    displayCriteria() {
        const filteredResults = this.filterResults(this.testResults);
        
        this.criteriaList.innerHTML = filteredResults.map(criterion => `
            <div class="criterion-item ${criterion.status}" data-id="${criterion.id}">
                <div class="criterion-header">
                    <div>
                        <span class="criterion-id">${criterion.id}</span>
                        <span class="criterion-level level-${criterion.level}">Level ${criterion.level}</span>
                    </div>
                    <button class="btn btn-secondary" onclick="app.removeCriterion('${criterion.id}')" style="font-size: 0.875rem; padding: 0.25rem 0.75rem;">${i18n.t('remove')}</button>
                </div>
                <h4>${typeof criterion.title === 'string' ? criterion.title : criterion.title[i18n.getCurrentLanguage()] || criterion.title.en}</h4>
                <p class="criterion-description">${typeof criterion.description === 'string' ? criterion.description : criterion.description[i18n.getCurrentLanguage()] || criterion.description.en}</p>
                ${criterion.understandingUrl ? `<p><a href="${criterion.understandingUrl}" target="_blank" rel="noopener" style="font-size: 0.875rem; color: #1a73e8;">📖 Understanding ${criterion.id}</a></p>` : ''}
                <div class="screenshot-section">
                    ${this.renderScreenshotGallery(criterion)}
                </div>
                <div class="criterion-controls">
                    <button class="status-btn ${criterion.status === 'pass' ? 'active' : ''} pass" 
                            data-id="${criterion.id}" data-status="pass">${i18n.t('pass')}</button>
                    <button class="status-btn ${criterion.status === 'fail' ? 'active' : ''} fail" 
                            data-id="${criterion.id}" data-status="fail">${i18n.t('fail')}</button>
                    <button class="status-btn ${criterion.status === 'na' ? 'active' : ''} na" 
                            data-id="${criterion.id}" data-status="na">${i18n.t('na')}</button>
                    <input type="text" placeholder="${i18n.t('addNotes')}" class="notes-input" 
                           data-id="${criterion.id}" value="${criterion.notes || ''}">
                </div>
            </div>
        `).join('');
        
        // Attach event listeners
        this.criteriaList.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.updateStatus(e.target));
        });
        
        this.criteriaList.querySelectorAll('.notes-input').forEach(input => {
            input.addEventListener('blur', (e) => this.updateNotes(e.target));
        });
        
        // Initialize screenshot drop areas
        this.initializeScreenshotDropAreas();
        
        this.testCount.textContent = this.testResults.length;
    }

    filterResults(results) {
        if (this.currentFilter === 'all') return results;
        return results.filter(r => r.status === this.currentFilter);
    }

    filterCriteria(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.displayCriteria();
    }

    updateStatus(button) {
        const id = button.dataset.id;
        const status = button.dataset.status;
        
        // Update test results
        const criterion = this.testResults.find(r => r.id === id);
        if (criterion) {
            criterion.status = status;
        }
        
        // Update UI
        const item = button.closest('.criterion-item');
        item.classList.remove('pass', 'fail', 'na');
        item.classList.add(status);
        
        // Update button states
        button.parentElement.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        this.updateTestProgress();
    }

    updateNotes(input) {
        const id = input.dataset.id;
        const criterion = this.testResults.find(r => r.id === id);
        if (criterion) {
            criterion.notes = input.value;
        }
    }

    updateTestProgress() {
        const total = this.testResults.length;
        const completed = this.testResults.filter(r => r.status !== 'pending').length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        this.testProgress.textContent = `${percentage}%`;
    }

    showSaveDialog() {
        this.saveDialog.style.display = 'flex';
        this.testNameInput.value = '';
        this.testNameInput.focus();
    }

    hideSaveDialog() {
        this.saveDialog.style.display = 'none';
    }

    saveTest() {
        const testName = this.testNameInput.value.trim();
        if (!testName) {
            alert(i18n.t('enterTestNameAlert'));
            return;
        }
        
        this.storageManager.saveTest(testName, this.testResults);
        this.hideSaveDialog();
        this.loadSavedTests();
        alert(i18n.t('testSaved'));
    }

    showExportOptions() {
        const testName = prompt('Enter a name for this test:');
        if (!testName) return;
        
        // Save test temporarily
        const test = this.storageManager.saveTest(testName, this.testResults);
        
        // Create export options
        const format = prompt(i18n.t('chooseExportFormat'));
        
        let exportData;
        switch(format) {
            case '1':
                exportData = this.storageManager.exportToJSON(test.id);
                break;
            case '2':
                exportData = this.storageManager.exportToCSV(test.id);
                break;
            case '3':
                exportData = this.storageManager.exportToHTML(test.id);
                break;
            default:
                alert(i18n.t('invalidOption'));
                return;
        }
        
        if (exportData) {
            const a = document.createElement('a');
            a.href = exportData.url;
            a.download = exportData.filename;
            a.click();
            URL.revokeObjectURL(exportData.url);
        }
    }

    loadSavedTests() {
        const tests = this.storageManager.getAllTests();
        
        if (tests.length === 0) {
            this.savedTestsList.innerHTML = `<p style="text-align: center; color: #666;">${i18n.t('noSavedTests')}</p>`;
            return;
        }
        
        this.savedTestsList.innerHTML = tests.map(test => `
            <div class="saved-test-item">
                <div class="saved-test-info">
                    <div class="saved-test-name">${test.name}</div>
                    <div class="saved-test-meta">
                        ${new Date(test.date).toLocaleDateString()} - 
                        ${test.totalCriteria} ${i18n.t('criteria')} - 
                        ${test.passed} ${i18n.t('passed')}, ${test.failed} ${i18n.t('failed')}
                    </div>
                </div>
                <div class="saved-test-actions">
                    <button class="btn btn-secondary" onclick="app.viewTest('${test.id}')">${i18n.t('view')}</button>
                    <button class="btn btn-secondary" onclick="app.exportSavedTest('${test.id}')">${i18n.t('export')}</button>
                    <button class="btn btn-secondary" onclick="app.deleteTest('${test.id}')">${i18n.t('delete')}</button>
                </div>
            </div>
        `).join('');
    }

    viewTest(id) {
        const test = this.storageManager.getTest(id);
        if (!test) return;
        
        // Load test results
        this.testResults = test.results;
        
        // Switch to testing phase
        this.questionPhase.style.display = 'none';
        this.testingPhase.style.display = 'block';
        
        // Display criteria
        this.displayCriteria();
        this.updateTestProgress();
    }

    exportSavedTest(id) {
        const format = prompt(i18n.t('chooseExportFormat'));
        
        let exportData;
        switch(format) {
            case '1':
                exportData = this.storageManager.exportToJSON(id);
                break;
            case '2':
                exportData = this.storageManager.exportToCSV(id);
                break;
            case '3':
                exportData = this.storageManager.exportToHTML(id);
                break;
            default:
                alert(i18n.t('invalidOption'));
                return;
        }
        
        if (exportData) {
            const a = document.createElement('a');
            a.href = exportData.url;
            a.download = exportData.filename;
            a.click();
            URL.revokeObjectURL(exportData.url);
        }
    }

    deleteTest(id) {
        if (confirm(i18n.t('deleteTestConfirm'))) {
            this.storageManager.deleteTest(id);
            this.loadSavedTests();
        }
    }

    startNewTest() {
        if (confirm(i18n.t('newTestConfirm'))) {
            // Remove skip info if present
            const skipInfo = this.testingPhase.querySelector('.skip-info');
            if (skipInfo) {
                skipInfo.remove();
            }
            
            this.questionManager.reset();
            this.testResults = [];
            this.currentFilter = 'all';
            
            this.questionPhase.style.display = 'block';
            this.testingPhase.style.display = 'none';
            
            this.initialize();
        }
    }

    displayRemovedCriteria() {
        const removedCriteria = this.questionManager.getRemovedCriteria();
        this.removedCount.textContent = `(${removedCriteria.length})`;
        
        if (removedCriteria.length === 0) {
            this.removedCriteriaList.innerHTML = `<p style="text-align: center; color: #666;">${i18n.t('noRemovedCriteria')}</p>`;
            return;
        }
        
        this.removedCriteriaList.innerHTML = removedCriteria.map(criterion => `
            <div class="criterion-item removed" data-id="${criterion.id}">
                <div class="criterion-header">
                    <div>
                        <span class="criterion-id">${criterion.id}</span>
                        <span class="criterion-level level-${criterion.level}">Level ${criterion.level}</span>
                    </div>
                    <button class="add-back-btn" data-id="${criterion.id}">${i18n.t('addBack')}</button>
                </div>
                <h4>${typeof criterion.title === 'string' ? criterion.title : criterion.title[i18n.getCurrentLanguage()] || criterion.title.en}</h4>
                <p class="criterion-description">${typeof criterion.description === 'string' ? criterion.description : criterion.description[i18n.getCurrentLanguage()] || criterion.description.en}</p>
                ${criterion.understandingUrl ? `<p><a href="${criterion.understandingUrl}" target="_blank" rel="noopener" style="font-size: 0.875rem; color: #1a73e8;">📖 Understanding ${criterion.id}</a></p>` : ''}
                ${this.renderRemovedScreenshots(criterion)}
            </div>
        `).join('');
        
        // Attach event listeners
        this.removedCriteriaList.querySelectorAll('.add-back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.addBackCriterion(e.target.dataset.id));
        });
    }

    toggleRemovedCriteria() {
        const isVisible = this.removedCriteriaList.style.display !== 'none';
        this.removedCriteriaList.style.display = isVisible ? 'none' : 'block';
        this.toggleRemovedButton.textContent = isVisible ? i18n.t('showRemovedCriteria') : i18n.t('hideRemovedCriteria');
    }

    addBackCriterion(criterionId) {
        this.questionManager.addBackCriterion(criterionId);
        
        // Add criterion to test results
        const criterion = wcagCriteria.find(c => c.id === criterionId);
        if (criterion) {
            this.testResults.push({
                ...criterion,
                status: 'pending',
                notes: ''
            });
            
            // Re-sort test results to maintain order
            this.testResults.sort((a, b) => {
                const aIndex = wcagCriteria.findIndex(c => c.id === a.id);
                const bIndex = wcagCriteria.findIndex(c => c.id === b.id);
                return aIndex - bIndex;
            });
        }
        
        // Update displays
        this.displayCriteria();
        this.displayRemovedCriteria();
        this.updateCriteriaCount();
        this.updateTestProgress();
    }

    renderScreenshotGallery(criterion) {
        const screenshots = criterion.screenshots || [];
        
        console.log(`Rendering gallery for ${criterion.id}: ${screenshots.length} screenshots`); // Debug log
        
        let galleryHtml = '';
        
        // Render existing screenshots
        if (screenshots.length > 0) {
            galleryHtml += `<div class="screenshot-gallery">`;
            screenshots.forEach((screenshot, index) => {
                galleryHtml += `
                    <div class="screenshot-preview" onclick="app.openScreenshotLightbox('${criterion.id}', ${index})">
                        <img src="${screenshot.image}" alt="Screenshot ${index + 1} for ${criterion.id}" />
                        <div class="screenshot-overlay">${i18n.t('clickToEdit')}</div>
                        <button class="screenshot-delete" onclick="event.stopPropagation(); app.deleteScreenshot('${criterion.id}', ${index})" title="Delete screenshot">×</button>
                    </div>`;
            });
            galleryHtml += `</div>`;
        }
        
        // Always show drop area for adding new screenshots
        galleryHtml += `
            <div class="screenshot-drop-area" data-criterion-id="${criterion.id}">
                <div class="drop-content">
                    <span class="drop-icon">📷</span>
                    <span class="drop-text">${screenshots.length > 0 ? i18n.t('addMoreScreenshots') : i18n.t('clickOrDrag')}</span>
                    <span class="drop-hint">${i18n.t('pasteHint')}</span>
                </div>
            </div>`;
        
        return galleryHtml;
    }
    
    renderRemovedScreenshots(criterion) {
        const screenshots = criterion.screenshots || [];
        
        if (screenshots.length === 0) return '';
        
        let galleryHtml = `<div class="screenshot-gallery removed">`;
        screenshots.forEach((screenshot, index) => {
            galleryHtml += `
                <div class="screenshot-preview removed">
                    <img src="${screenshot.image}" alt="Screenshot ${index + 1} for ${criterion.id}" />
                </div>`;
        });
        galleryHtml += `</div>`;
        
        return galleryHtml;
    }
    
    removeCriterion(criterionId) {
        // Remove from test results
        const index = this.testResults.findIndex(r => r.id === criterionId);
        if (index !== -1) {
            const removed = this.testResults.splice(index, 1)[0];
            
            // Add to removed criteria
            this.questionManager.removedCriteria.push({
                ...removed,
                removedByQuestion: 'manual'
            });
            
            // Update filtered criteria
            this.questionManager.filteredCriteria = this.questionManager.filteredCriteria.filter(c => c.id !== criterionId);
        }
        
        // Update displays
        this.displayCriteria();
        this.displayRemovedCriteria();
        this.updateCriteriaCount();
        this.updateTestProgress();
    }
    
    // Screenshot functionality
    initializeScreenshotDropAreas() {
        document.querySelectorAll('.screenshot-drop-area').forEach(dropArea => {
            const criterionId = dropArea.dataset.criterionId;
            
            // Click to trigger file input
            dropArea.addEventListener('click', () => this.triggerFileInput(criterionId));
            
            // Drag and drop events
            dropArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropArea.classList.add('dragover');
            });
            
            dropArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropArea.classList.remove('dragover');
            });
            
            dropArea.addEventListener('drop', (e) => {
                e.preventDefault();
                dropArea.classList.remove('dragover');
                
                const files = Array.from(e.dataTransfer.files);
                const imageFile = files.find(file => file.type.startsWith('image/'));
                
                if (imageFile) {
                    this.processImageFile(imageFile, criterionId);
                }
            });
        });
    }
    
    triggerFileInput(criterionId) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.processImageFile(file, criterionId);
            }
        };
        input.click();
    }
    
    handlePaste(e) {
        const items = Array.from(e.clipboardData.items);
        const imageItem = items.find(item => item.type.startsWith('image/'));
        
        if (imageItem) {
            e.preventDefault();
            
            // Find any screenshot drop area - take the first one if none is focused
            const activeDropArea = document.querySelector('.screenshot-drop-area');
            
            if (activeDropArea) {
                const criterionId = activeDropArea.dataset.criterionId;
                const file = imageItem.getAsFile();
                console.log('Pasting image for criterion:', criterionId); // Debug log
                this.processImageFile(file, criterionId);
            } else {
                console.log('No drop area found for paste'); // Debug log
            }
        }
    }
    
    async processImageFile(file, criterionId) {
        try {
            console.log('Processing image file for criterion:', criterionId); // Debug log
            const compressedDataUrl = await this.compressImage(file);
            console.log('Image compressed, opening lightbox'); // Debug log
            this.openScreenshotLightbox(criterionId, compressedDataUrl);
        } catch (error) {
            console.error('Error processing image:', error);
            alert('Error processing image. Please try again.');
        }
    }
    
    compressImage(file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Calculate new dimensions
                let { width, height } = img;
                
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }
                
                // Set canvas dimensions and draw image
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to data URL with compression
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
            
            img.src = URL.createObjectURL(file);
        });
    }
    
    openScreenshotLightbox(criterionId, screenshotIndexOrImageData = null) {
        console.log('Opening screenshot lightbox for:', criterionId, typeof screenshotIndexOrImageData); // Debug log
        
        this.currentCriterionId = criterionId;
        
        // Find the criterion
        const criterion = this.testResults.find(c => c.id === criterionId);
        const screenshots = criterion?.screenshots || [];
        
        if (typeof screenshotIndexOrImageData === 'string') {
            // New image being added (imageDataUrl passed as string)
            console.log('Adding new image'); // Debug log
            this.currentScreenshotIndex = null;
            this.originalImage = screenshotIndexOrImageData;
            this.annotations = [];
        } else if (typeof screenshotIndexOrImageData === 'number') {
            // Editing existing screenshot (index passed)
            console.log('Editing existing screenshot at index:', screenshotIndexOrImageData); // Debug log
            this.currentScreenshotIndex = screenshotIndexOrImageData;
            const existingScreenshot = screenshots[screenshotIndexOrImageData];
            if (existingScreenshot) {
                this.originalImage = existingScreenshot.image;
                this.annotations = existingScreenshot.annotations || [];
            } else {
                console.error('Screenshot not found at index:', screenshotIndexOrImageData);
                return; // Screenshot doesn't exist
            }
        } else {
            console.error('No valid screenshot data provided');
            return; // No valid data provided
        }
        
        this.loadImageToCanvas(this.originalImage);
        this.screenshotLightbox.style.display = 'flex';
        
        // Initialize tool selection
        document.querySelectorAll('.annotation-tool').forEach(t => t.classList.remove('active'));
        document.querySelector('[data-tool="circle"]').classList.add('active');
        this.currentTool = 'circle';
        
        // Initialize color selection
        document.querySelectorAll('.color-option').forEach(c => c.classList.remove('active'));
        document.querySelector('.color-red').classList.add('active');
        this.currentColor = '#d93025';
        
        // Update lightbox title
        document.querySelector('.lightbox-title').textContent = `${i18n.t('annotateScreenshot')} - ${criterionId}`;
    }
    
    closeScreenshotLightbox() {
        this.screenshotLightbox.style.display = 'none';
        this.currentCriterionId = null;
        this.originalImage = null;
        this.annotations = [];
        this.isDrawing = false;
    }
    
    loadImageToCanvas(imageDataUrl) {
        const img = new Image();
        img.onload = () => {
            // Calculate optimal canvas size that uses most of the container
            const container = this.annotationCanvas.parentElement;
            const maxWidth = container.clientWidth - 64; // account for padding
            const maxHeight = container.clientHeight - 64;
            
            let { width, height } = img;
            
            // Scale to use more of the available space while maintaining aspect ratio
            // Allow up to 2x scaling for small images, or scale down large images
            const scaleToFit = Math.min(maxWidth / width, maxHeight / height);
            const scale = Math.min(scaleToFit, 2.0); // Allow up to 2x scaling for readability
            
            const displayWidth = width * scale;
            const displayHeight = height * scale;
            
            // Set canvas actual size to high resolution for quality
            this.annotationCanvas.width = img.width;
            this.annotationCanvas.height = img.height;
            
            // Set canvas display size (larger for better readability)
            this.annotationCanvas.style.width = displayWidth + 'px';
            this.annotationCanvas.style.height = displayHeight + 'px';
            
            // Clear canvas and draw image at full resolution
            this.canvasContext.clearRect(0, 0, img.width, img.height);
            this.canvasContext.drawImage(img, 0, 0);
            
            console.log(`Canvas: ${img.width}x${img.height} -> Display: ${displayWidth}x${displayHeight} (scale: ${scale.toFixed(2)})`);
            
            // Redraw existing annotations
            this.redrawAnnotations();
        };
        img.src = imageDataUrl;
    }
    
    selectAnnotationTool(toolElement) {
        const tool = toolElement.dataset.tool;
        
        if (tool === 'clear') {
            this.clearAnnotations();
            return;
        }
        
        // Update tool selection
        document.querySelectorAll('.annotation-tool').forEach(t => t.classList.remove('active'));
        toolElement.classList.add('active');
        this.currentTool = tool;
    }
    
    selectColor(colorElement) {
        document.querySelectorAll('.color-option').forEach(c => c.classList.remove('active'));
        colorElement.classList.add('active');
        this.currentColor = colorElement.dataset.color;
    }
    
    clearAnnotations() {
        this.annotations = [];
        this.loadImageToCanvas(this.originalImage); // Redraw without annotations
    }
    
    getCanvasCoordinates(e) {
        const rect = this.annotationCanvas.getBoundingClientRect();
        const scaleX = this.annotationCanvas.width / rect.width;
        const scaleY = this.annotationCanvas.height / rect.height;
        
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }
    
    startDrawing(e) {
        this.isDrawing = true;
        const coords = this.getCanvasCoordinates(e);
        
        this.startX = coords.x;
        this.startY = coords.y;
    }
    
    draw(e) {
        if (!this.isDrawing) return;
        
        // Clear and redraw everything
        this.loadImageToCanvas(this.originalImage);
        
        const coords = this.getCanvasCoordinates(e);
        const currentX = coords.x;
        const currentY = coords.y;
        
        // Draw current shape being created
        this.canvasContext.strokeStyle = this.currentColor;
        this.canvasContext.lineWidth = 4;
        this.canvasContext.lineCap = 'round';
        this.canvasContext.lineJoin = 'round';
        
        if (this.currentTool === 'circle') {
            const radius = Math.sqrt(Math.pow(currentX - this.startX, 2) + Math.pow(currentY - this.startY, 2));
            this.canvasContext.beginPath();
            this.canvasContext.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
            this.canvasContext.stroke();
        } else if (this.currentTool === 'rectangle') {
            const width = currentX - this.startX;
            const height = currentY - this.startY;
            this.canvasContext.beginPath();
            this.canvasContext.rect(this.startX, this.startY, width, height);
            this.canvasContext.stroke();
        }
    }
    
    stopDrawing(e) {
        if (!this.isDrawing) return;
        this.isDrawing = false;
        
        const coords = this.getCanvasCoordinates(e);
        const endX = coords.x;
        const endY = coords.y;
        
        // Save the annotation
        if (this.currentTool === 'circle') {
            const radius = Math.sqrt(Math.pow(endX - this.startX, 2) + Math.pow(endY - this.startY, 2));
            if (radius > 5) { // Minimum size threshold
                this.annotations.push({
                    type: 'circle',
                    x: this.startX,
                    y: this.startY,
                    radius: radius,
                    color: this.currentColor
                });
            }
        } else if (this.currentTool === 'rectangle') {
            const width = endX - this.startX;
            const height = endY - this.startY;
            if (Math.abs(width) > 5 && Math.abs(height) > 5) { // Minimum size threshold
                this.annotations.push({
                    type: 'rectangle',
                    x: this.startX,
                    y: this.startY,
                    width: width,
                    height: height,
                    color: this.currentColor
                });
            }
        }
        
        this.redrawAnnotations();
    }
    
    redrawAnnotations() {
        this.annotations.forEach(annotation => {
            this.canvasContext.strokeStyle = annotation.color;
            this.canvasContext.lineWidth = 4;
            this.canvasContext.lineCap = 'round';
            this.canvasContext.lineJoin = 'round';
            
            if (annotation.type === 'circle') {
                this.canvasContext.beginPath();
                this.canvasContext.arc(annotation.x, annotation.y, annotation.radius, 0, 2 * Math.PI);
                this.canvasContext.stroke();
            } else if (annotation.type === 'rectangle') {
                this.canvasContext.beginPath();
                this.canvasContext.rect(annotation.x, annotation.y, annotation.width, annotation.height);
                this.canvasContext.stroke();
            }
        });
    }
    
    saveAnnotatedScreenshot() {
        const annotatedImageDataUrl = this.annotationCanvas.toDataURL('image/jpeg', 0.8);
        
        console.log('Saving screenshot for criterion:', this.currentCriterionId); // Debug log
        
        // Find and update the criterion
        const criterion = this.testResults.find(c => c.id === this.currentCriterionId);
        if (criterion) {
            if (!criterion.screenshots) {
                criterion.screenshots = [];
            }
            
            const screenshotData = {
                image: annotatedImageDataUrl,
                annotations: [...this.annotations],
                timestamp: new Date().toISOString()
            };
            
            if (this.currentScreenshotIndex !== null) {
                // Update existing screenshot
                criterion.screenshots[this.currentScreenshotIndex] = screenshotData;
                console.log('Updated existing screenshot at index:', this.currentScreenshotIndex);
            } else {
                // Add new screenshot
                criterion.screenshots.push(screenshotData);
                console.log('Added new screenshot. Total screenshots:', criterion.screenshots.length);
            }
        } else {
            console.error('Criterion not found:', this.currentCriterionId);
        }
        
        // Update the display
        this.displayCriteria();
        this.closeScreenshotLightbox();
    }
    
    deleteScreenshot(criterionId, screenshotIndex) {
        if (confirm(i18n.t('confirmDeleteScreenshot'))) {
            const criterion = this.testResults.find(c => c.id === criterionId);
            if (criterion && criterion.screenshots) {
                criterion.screenshots.splice(screenshotIndex, 1);
                this.displayCriteria();
            }
        }
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new WCAGTestApp();
});