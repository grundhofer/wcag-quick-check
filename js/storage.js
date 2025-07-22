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

    exportTest(id) {
        const test = this.getTest(id);
        if (!test) return null;

        const exportData = {
            testName: test.name,
            testDate: test.date,
            summary: {
                total: test.totalCriteria,
                passed: test.passed,
                failed: test.failed,
                notApplicable: test.na,
                pending: test.pending,
                complianceRate: ((test.passed / (test.totalCriteria - test.na)) * 100).toFixed(1) + '%'
            },
            criteria: test.results.map(r => {
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

    exportToHTML(id) {
        const test = this.getTest(id);
        if (!test) return null;

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
    <strong>Test Date:</strong> ${new Date(test.date).toLocaleString()}</p>
    
    <div class="summary">
        <h2>Summary</h2>
        <div class="summary-grid">
            <div class="summary-item">
                <div class="summary-value">${test.totalCriteria}</div>
                <div>Total Criteria</div>
            </div>
            <div class="summary-item">
                <div class="summary-value pass">${test.passed}</div>
                <div>Passed</div>
            </div>
            <div class="summary-item">
                <div class="summary-value fail">${test.failed}</div>
                <div>Failed</div>
            </div>
            <div class="summary-item">
                <div class="summary-value na">${test.na}</div>
                <div>Not Applicable</div>
            </div>
            <div class="summary-item">
                <div class="summary-value pending">${test.pending}</div>
                <div>Pending</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${complianceRate}%</div>
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

        test.results.forEach(r => {
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
        const filename = `wcag-test-${test.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.html`;
        
        return { url, filename };
    }
}