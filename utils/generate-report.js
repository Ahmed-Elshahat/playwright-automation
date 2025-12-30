const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const archiveDir = path.join(__dirname, '..', 'reports-archive');
const reportDir = path.join(__dirname, '..', 'allure-report-single');
const reportFile = path.join(reportDir, 'index.html');

// Create archive directory if not exists
if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
}

console.log('Generating Single File Allure Report...');

try {
    // Generate the report (clean old one first)
    execSync('npx allure-commandline generate allure-results --clean --single-file -o allure-report-single', { stdio: 'inherit' });

    // Generate Timestamp: YYYY-MM-DD_HH-mm-ss
    const now = new Date();
    const timestamp = now.toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/:/g, '-');
    const archiveFilename = `report_${timestamp}.html`;
    const destPath = path.join(archiveDir, archiveFilename);

    // Copy to archive
    fs.copyFileSync(reportFile, destPath);
    console.log(`\n✅ Report archived successfully: ${destPath}`);

    // Open the fresh report
    execSync(`open "${reportFile}"`);

} catch (error) {
    console.error('Failed to generate or archive report:', error);
    process.exit(1);
}
