class StorageManager {
    constructor() {
        this.storageKey = 'wcagTestResults';
    }

    saveTest(testName, results) {
        const test = {
            id: Date.now().toString(),
            name: testName,
            date: new Date().toISOString(),
            results: results,
            totalCriteria: results.length,
            passed: results.filter(r => r.status === 'pass').length,
            failed: results.filter(r => r.status === 'fail').length,
            na: results.filter(r => r.status === 'na').length,
            pending: results.filter(r => r.status === 'pending').length
        };

        const savedTests = this.getAllTests();
        savedTests.unshift(test);
        localStorage.setItem(this.storageKey, JSON.stringify(savedTests));
        
        return test;
    }

    getAllTests() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    getTest(id) {
        const tests = this.getAllTests();
        return tests.find(test => test.id === id);
    }

    deleteTest(id) {
        const tests = this.getAllTests();
        const filtered = tests.filter(test => test.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    }

    exportTest(id, criteriaFilter = 'all') {
        const test = this.getTest(id);
        if (!test) return null;

        let filteredResults = test.results;
        if (criteriaFilter === 'failed') {
            filteredResults = test.results.filter(r => r.status === 'fail');
        }

        const exportData = {
            testName: test.name,
            testDate: test.date,
            filterApplied: criteriaFilter === 'failed' ? 'Failed criteria only' : 'All criteria',
            summary: {
                total: criteriaFilter === 'failed' ? filteredResults.length : test.totalCriteria,
                passed: criteriaFilter === 'failed' ? 0 : test.passed,
                failed: criteriaFilter === 'failed' ? filteredResults.length : test.failed,
                notApplicable: criteriaFilter === 'failed' ? 0 : test.na,
                pending: criteriaFilter === 'failed' ? 0 : test.pending,
                complianceRate: criteriaFilter === 'failed' ? '0%' : ((test.passed / (test.totalCriteria - test.na)) * 100).toFixed(1) + '%'
            },
            criteria: filteredResults.map(r => {
                const screenshots = r.screenshots || (r.screenshot ? [{image: r.screenshot}] : []);
                const title = typeof r.title === 'string' ? r.title : (r.title?.en || r.title || 'N/A');
                
                return {
                    id: r.id,
                    level: r.level,
                    title: title,
                    status: r.status,
                    notes: r.notes || '',
                    screenshots: screenshots.map(s => ({
                        image: s.image,
                        timestamp: s.timestamp || null,
                        annotations: s.annotations || []
                    }))
                };
            })
        };

        return exportData;
    }

    exportToJSON(id) {
        const data = this.exportTest(id);
        if (!data) return null;

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const filename = `wcag-test-${data.testName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
        
        return { url, filename };
    }

    exportToCSV(id) {
        const test = this.getTest(id);
        if (!test) return null;

        let csv = 'WCAG ID,Level,Title,Status,Notes,Screenshots\n';
        
        test.results.forEach(r => {
            const notes = (r.notes || '').replace(/"/g, '""');
            const screenshots = r.screenshots || (r.screenshot ? [{image: r.screenshot}] : []);
            const screenshotCount = screenshots.length > 0 ? `${screenshots.length} screenshot(s)` : 'No screenshots';
            const title = typeof r.title === 'string' ? r.title : (r.title?.en || r.title || 'N/A');
            
            csv += `"${r.id}","${r.level}","${title}","${r.status}","${notes}","${screenshotCount}"\n`;
        });

        const summary = `\n\nSummary\nTotal Criteria,${test.totalCriteria}\nPassed,${test.passed}\nFailed,${test.failed}\nNot Applicable,${test.na}\nPending,${test.pending}\n`;
        csv += summary;

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const filename = `wcag-test-${test.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
        
        return { url, filename };
    }

    exportToHTML(id, criteriaFilter = 'all') {
        const test = this.getTest(id);
        if (!test) return null;

        let filteredResults = test.results;
        if (criteriaFilter === 'failed') {
            filteredResults = test.results.filter(r => r.status === 'fail');
        }

        const complianceRate = ((test.passed / (test.totalCriteria - test.na)) * 100).toFixed(1);
        
        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WCAG Test Report - ${test.name}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 1200px; margin: 0 auto; padding: 20px; }
        h1, h2 { color: #1a73e8; }
        .summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-top: 15px; }
        .summary-item { text-align: center; }
        .summary-value { font-size: 2em; font-weight: bold; }
        .pass { color: #1e8e3e; }
        .fail { color: #d93025; }
        .na { color: #f9ab00; }
        .pending { color: #5f6368; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; font-weight: bold; }
        tr:hover { background-color: #f8f9fa; }
        .status { padding: 4px 12px; border-radius: 4px; font-weight: bold; display: inline-block; }
        .status-pass { background: #e6f4ea; color: #1e8e3e; }
        .status-fail { background: #fce8e6; color: #d93025; }
        .status-na { background: #fef7e0; color: #f9ab00; }
        .status-pending { background: #e8eaed; color: #5f6368; }
        .level-A { background: #e8f0fe; color: #1967d2; padding: 2px 8px; border-radius: 4px; }
        .level-AA { background: #fce8e6; color: #c5221f; padding: 2px 8px; border-radius: 4px; }
        .screenshot-gallery { display: flex; flex-wrap: wrap; gap: 10px; margin: 10px 0; }
        .screenshot-item { max-width: 300px; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; }
        .screenshot-item img { width: 100%; height: auto; display: block; }
        .screenshot-caption { padding: 5px 10px; background: #f8f9fa; font-size: 0.875rem; color: #5f6368; }
        @media print { body { padding: 0; } .screenshot-item { max-width: 200px; } }
    </style>
</head>
<body>
    <h1>WCAG 2.2 Accessibility Test Report</h1>
    <p><strong>Test Name:</strong> ${test.name}<br>
    <strong>Test Date:</strong> ${new Date(test.date).toLocaleString()}<br>
    <strong>Export Filter:</strong> ${criteriaFilter === 'failed' ? 'Failed criteria only' : 'All criteria'}</p>
    
    <div class="summary">
        <h2>Summary</h2>
        <div class="summary-grid">
            <div class="summary-item">
                <div class="summary-value">${criteriaFilter === 'failed' ? filteredResults.length : test.totalCriteria}</div>
                <div>Total Criteria</div>
            </div>
            <div class="summary-item">
                <div class="summary-value pass">${criteriaFilter === 'failed' ? 0 : test.passed}</div>
                <div>Passed</div>
            </div>
            <div class="summary-item">
                <div class="summary-value fail">${criteriaFilter === 'failed' ? filteredResults.length : test.failed}</div>
                <div>Failed</div>
            </div>
            <div class="summary-item">
                <div class="summary-value na">${criteriaFilter === 'failed' ? 0 : test.na}</div>
                <div>Not Applicable</div>
            </div>
            <div class="summary-item">
                <div class="summary-value pending">${criteriaFilter === 'failed' ? 0 : test.pending}</div>
                <div>Pending</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${criteriaFilter === 'failed' ? '0%' : complianceRate + '%'}</div>
                <div>Compliance Rate</div>
            </div>
        </div>
    </div>
    
    <h2>Detailed Results</h2>
    <table>
        <thead>
            <tr>
                <th>WCAG ID</th>
                <th>Level</th>
                <th>Title</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Screenshots</th>
            </tr>
        </thead>
        <tbody>`;

        filteredResults.forEach(r => {
            // Handle screenshots - support both old single screenshot and new multiple screenshots
            let screenshotsHtml = '';
            const screenshots = r.screenshots || (r.screenshot ? [{image: r.screenshot}] : []);
            
            if (screenshots.length > 0) {
                screenshotsHtml = '<div class="screenshot-gallery">';
                screenshots.forEach((screenshot, index) => {
                    screenshotsHtml += `
                        <div class="screenshot-item">
                            <img src="${screenshot.image}" alt="Screenshot ${index + 1} for ${r.id}" />
                            <div class="screenshot-caption">Screenshot ${index + 1}</div>
                        </div>`;
                });
                screenshotsHtml += '</div>';
            } else {
                screenshotsHtml = '-';
            }
            
            // Get localized title if available
            const title = typeof r.title === 'string' ? r.title : (r.title?.en || r.title || 'N/A');
            
            html += `
            <tr>
                <td>${r.id}</td>
                <td><span class="level-${r.level}">${r.level}</span></td>
                <td>${title}</td>
                <td><span class="status status-${r.status}">${r.status.toUpperCase()}</span></td>
                <td>${r.notes || '-'}</td>
                <td>${screenshotsHtml}</td>
            </tr>`;
        });

        html += `
        </tbody>
    </table>
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const suffix = criteriaFilter === 'failed' ? '-failed-only' : '';
        const filename = `wcag-test-${test.name.replace(/\s+/g, '-')}${suffix}-${new Date().toISOString().split('T')[0]}.html`;
        
        return { url, filename };
    }

    exportToPDF(id, criteriaFilter = 'all') {
        const test = this.getTest(id);
        if (!test) return null;

        let filteredResults = test.results;
        if (criteriaFilter === 'failed') {
            filteredResults = test.results.filter(r => r.status === 'fail');
        }

        try {
            if (typeof window.jspdf === 'undefined') {
                throw new Error('jsPDF library is not loaded. Please refresh the page and try again.');
            }
            
            const { jsPDF } = window.jspdf;
            if (!jsPDF) {
                throw new Error('jsPDF constructor is not available. Please refresh the page and try again.');
            }
            
            const doc = new jsPDF();
            
            // Title and metadata
            doc.setFontSize(20);
            doc.text('WCAG 2.2 Accessibility Test Report', 20, 25);
            
            doc.setFontSize(12);
            doc.text(`Test Name: ${test.name}`, 20, 40);
            doc.text(`Test Date: ${new Date(test.date).toLocaleDateString()}`, 20, 50);
            
            // Summary box
            doc.setDrawColor(26, 115, 232);
            doc.setFillColor(248, 249, 250);
            doc.rect(20, 60, 170, 50, 'FD');
            
            doc.setFontSize(14);
            doc.setTextColor(26, 115, 232);
            doc.text('Summary', 25, 75);
            
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            const complianceRate = ((test.passed / (test.totalCriteria - test.na)) * 100).toFixed(1);
            
            doc.text(`Total Criteria: ${test.totalCriteria}`, 25, 85);
            doc.text(`Passed: ${test.passed}`, 25, 92);
            doc.text(`Failed: ${test.failed}`, 25, 99);
            doc.text(`Not Applicable: ${test.na}`, 100, 85);
            doc.text(`Pending: ${test.pending}`, 100, 92);
            doc.text(`Compliance Rate: ${complianceRate}%`, 100, 99);
            
            // Results table
            let yPos = 130;
            doc.setFontSize(14);
            doc.setTextColor(26, 115, 232);
            doc.text('Detailed Results', 20, yPos);
            yPos += 15;
            
            // Table headers
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'bold');
            doc.text('WCAG ID', 20, yPos);
            doc.text('Level', 50, yPos);
            doc.text('Title', 70, yPos);
            doc.text('Status', 150, yPos);
            doc.text('Screenshots', 175, yPos);
            
            // Draw header line
            doc.setDrawColor(221, 221, 221);
            doc.line(20, yPos + 2, 190, yPos + 2);
            yPos += 10;
            
            doc.setFont(undefined, 'normal');
            
            // Results rows
            filteredResults.forEach(r => {
                const screenshots = r.screenshots || (r.screenshot ? [{image: r.screenshot}] : []);
                const hasScreenshots = screenshots.length > 0;
                const minSpaceNeeded = hasScreenshots ? 100 : 30;
                
                if (yPos + minSpaceNeeded > 270) {
                    doc.addPage();
                    yPos = 25;
                }
                
                const title = typeof r.title === 'string' ? r.title : (r.title?.en || r.title || 'N/A');
                
                // Criterion header with border
                doc.setDrawColor(200, 200, 200);
                doc.setFillColor(248, 249, 250);
                doc.rect(20, yPos - 5, 170, 15, 'FD');
                
                // Criterion info
                doc.setFontSize(10);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(`${r.id} (${r.level})`, 25, yPos + 5);
                
                // Status with color
                switch(r.status) {
                    case 'pass':
                        doc.setTextColor(30, 142, 62);
                        break;
                    case 'fail':
                        doc.setTextColor(217, 48, 37);
                        break;
                    case 'na':
                        doc.setTextColor(249, 171, 0);
                        break;
                    default:
                        doc.setTextColor(95, 99, 104);
                }
                doc.text(r.status.toUpperCase(), 160, yPos + 5);
                
                yPos += 15;
                
                // Title
                doc.setFontSize(9);
                doc.setTextColor(0, 0, 0);
                doc.setFont(undefined, 'normal');
                const titleLines = doc.splitTextToSize(title, 170);
                doc.text(titleLines, 25, yPos);
                yPos += titleLines.length * 5 + 5;
                
                // Notes if present
                if (r.notes && r.notes.trim()) {
                    doc.setFontSize(8);
                    doc.setTextColor(95, 99, 104);
                    doc.text('Notes:', 25, yPos);
                    yPos += 5;
                    const noteLines = doc.splitTextToSize(r.notes, 170);
                    doc.text(noteLines, 25, yPos);
                    yPos += noteLines.length * 4 + 8;
                }
                
                if (hasScreenshots) {
                    doc.setFontSize(9);
                    doc.setTextColor(0, 0, 0);
                    doc.setFont(undefined, 'bold');
                    doc.text(`Screenshots (${screenshots.length}):`, 25, yPos);
                    yPos += 10;
                    
                    screenshots.forEach((screenshot, index) => {
                        try {
                            const imgHeight = 90;
                            if (yPos + imgHeight > 260) {
                                doc.addPage();
                                yPos = 25;
                                                doc.setFontSize(8);
                                doc.setTextColor(95, 99, 104);
                                doc.text(`${r.id} - Screenshot ${index + 1} (continued)`, 25, yPos);
                                yPos += 10;
                            }
                            
                            if (screenshot.image && screenshot.image.startsWith('data:image/')) {
                                try {
                                    const imgWidth = 140;
                                    const actualImgHeight = 80;
                                    
                                    let imageFormat = 'JPEG';
                                    if (screenshot.image.includes('data:image/png')) {
                                        imageFormat = 'PNG';
                                    } else if (screenshot.image.includes('data:image/gif')) {
                                        imageFormat = 'GIF';
                                    } else if (screenshot.image.includes('data:image/webp')) {
                                        imageFormat = 'JPEG';
                                    }
                                    
                                    doc.addImage(screenshot.image, imageFormat, 25, yPos, imgWidth, actualImgHeight);
                                    
                                    doc.setFontSize(8);
                                    doc.setTextColor(95, 99, 104);
                                    doc.setFont(undefined, 'normal');
                                    doc.text(`Screenshot ${index + 1}`, 25, yPos + actualImgHeight + 5);
                                    
                                    if (screenshot.timestamp) {
                                        const date = new Date(screenshot.timestamp).toLocaleString();
                                        doc.text(`Captured: ${date}`, 25, yPos + actualImgHeight + 10);
                                        yPos += actualImgHeight + 15;
                                    } else {
                                        yPos += actualImgHeight + 10;
                                    }
                                    
                                } catch (imageError) {
                                    console.warn('Failed to embed screenshot, showing placeholder:', imageError);
                                    doc.setFontSize(8);
                                    doc.setTextColor(217, 48, 37);
                                    doc.text(`Screenshot ${index + 1}: Image embedding failed - see HTML export for full image`, 25, yPos);
                                    
                                    if (screenshot.timestamp) {
                                        const date = new Date(screenshot.timestamp).toLocaleString();
                                        doc.text(`Captured: ${date}`, 25, yPos + 5);
                                        yPos += 15;
                                    } else {
                                        yPos += 10;
                                    }
                                }
                            } else {
                                doc.setFontSize(8);
                                doc.setTextColor(95, 99, 104);
                                doc.setFont(undefined, 'normal');
                                doc.text(`Screenshot ${index + 1}: No image data available`, 25, yPos);
                                yPos += 10;
                            }
                            
                        } catch (generalError) {
                            console.error('Error processing screenshot for PDF:', generalError);
                            // Fallback: just show error message
                            doc.setFontSize(8);
                            doc.setTextColor(217, 48, 37);
                            doc.text(`Screenshot ${index + 1}: Processing error`, 25, yPos);
                            yPos += 10;
                        }
                    });
                }
                
                yPos += 15; // Space between criteria
            });
            
            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(128, 128, 128);
                doc.text(`Generated by WCAG Quick Check App - Page ${i} of ${pageCount}`, 20, 285);
                doc.text(new Date().toLocaleString(), 150, 285);
            }
            
            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const filename = `wcag-test-${test.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
            
            return { url, filename };
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            
            let errorMessage = 'Error generating PDF: ';
            if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += 'Unknown error occurred. Please try again or use another export format.';
            }
            
            if (error.message && error.message.includes('jsPDF')) {
                errorMessage += '\n\nTry refreshing the page to reload the PDF library.';
            } else if (error.message && error.message.includes('addImage')) {
                errorMessage += '\n\nThe error may be related to screenshot processing. Try exporting without screenshots or use HTML format.';
            }
            
            alert(errorMessage);
            return null;
        }
    }
}