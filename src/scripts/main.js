const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const downloadButton = document.getElementById('downloadButton');
const beautifyButton = document.getElementById('beautifyButton');
const jsonInput = document.getElementById('jsonInput');
const beautifiedOutput = document.getElementById('beautifiedOutput');
let jsonData = null;

function parseCSV(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};
        headers.forEach((header, i) => {
            obj[header.trim()] = values[i] ? values[i].trim() : '';
        });
        return obj;
    });
}

uploadButton.addEventListener('click', () => {
    const files = fileInput.files;
    if (files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }

    const file = files[0];
    const ext = file.name.split('.').pop().toLowerCase();

    const reader = new FileReader();

    reader.onload = (event) => {
        try {
            let result;
            if (ext === 'json') {
                result = JSON.parse(event.target.result);
            } else if (ext === 'csv' || ext === 'txt') {
                result = parseCSV(event.target.result);
            } else if (ext === 'xlsx' || ext === 'xls') {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                result = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            } else {
                alert('Unsupported file type.');
                return;
            }
            jsonData = result;
            alert('File uploaded and converted to JSON successfully.');
            downloadButton.style.display = 'block';
        } catch (error) {
            alert('Error parsing file: ' + error.message);
        }
    };

    if (ext === 'xlsx' || ext === 'xls') {
        reader.readAsArrayBuffer(file);
    } else {
        reader.readAsText(file);
    }
});

downloadButton.addEventListener('click', () => {
    if (!jsonData) {
        alert('No JSON data available to download.');
        return;
    }

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

beautifyButton.addEventListener('click', () => {
    let input = jsonInput.value.trim();
    let output = '';
    let color = "#2a5298";
    try {
        const parsed = JSON.parse(input);
        output = JSON.stringify(parsed, null, 2);
    } catch (e) {
        try {
            if (input.startsWith('[') && input.endsWith(']')) {
                const parsedArr = JSON.parse(input);
                output = JSON.stringify(parsedArr, null, 2);
            } else {
                output = JSON.stringify({ value: input }, null, 2);
            }
        } catch {
            output = JSON.stringify({ value: input }, null, 2);
        }
        color = "#e67e22";
    }
    beautifiedOutput.textContent = output;
    beautifiedOutput.style.color = color;
});

// Dummy functions for API actions
function createAccount(data) {
    return 'Create Account Success';
}

function opportunity(data) {
    return 'Opportunity Success';
}

function quote(data) {
    // Get selected quote options
    const selected = Array.from(document.querySelectorAll('.quote-option:checked')).map(cb => cb.value);
    return `Quote Success. Selected: ${selected.length ? selected.join(', ') : 'None'}`;
}

function groupNumberGeneration(data) {
    return 'Group Number Generation Success';
}

// Handle Send Data for each API row
document.querySelectorAll('.send-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = btn.getAttribute('data-action');
        let response = '';
        let dataToSend = jsonData || {};
        switch(action) {
            case 'createAccount':
                response = createAccount(dataToSend);
                break;
            case 'opportunity':
                response = opportunity(dataToSend);
                break;
            case 'quote':
                response = quote(dataToSend);
                break;
            case 'groupNumber':
                response = groupNumberGeneration(dataToSend);
                break;
            default:
                response = 'Unknown action';
        }
        document.getElementById('response-' + action).textContent = response;
    });
});
