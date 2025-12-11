const fs = require("fs");
const readline = require("readline-sync");

// ===============================
// Load CSV Dataset (ambil kolom pertama = nama buah)
// ===============================
function loadCSV(path) {
    const text = fs.readFileSync(path, "utf8");
    const rows = text.split("\n").map(n => n.trim()).filter(n => n !== "");

    rows.shift(); // hapus header

    return rows.map(row => row.split(";")[0].trim().toLowerCase());
}

// ===============================
// Sentinel Linear Search
// ===============================
function sentinelLinearSearch(data, target) {
    target = target.toLowerCase();
    let steps = 0;
    const start = performance.now();

    const n = data.length;
    const last = data[n - 1];

    data[n - 1] = target; // pasang sentinel

    let i = 0;
    while (data[i] !== target) {
        steps++;
        i++;
    }

    data[n - 1] = last; // return last element

    if (i < n - 1 || last === target) {
        return {
            found: true,
            index: i,
            steps,
            time: (performance.now() - start).toFixed(5)
        };
    }

    return {
        found: false,
        index: -1,
        steps,
        time: (performance.now() - start).toFixed(5)
    };
}

// ===============================
// Index Sequential Search
// ===============================
function indexSequentialSearch(data, target, blockSize = 10) {
    target = target.toLowerCase();
    let steps = 0;
    const start = performance.now();

    let indexTable = [];
    for (let i = 0; i < data.length; i += blockSize) {
        indexTable.push({ value: data[i], index: i });
    }

    let block = -1;
    for (let i = 0; i < indexTable.length; i++) {
        steps++;
        if (indexTable[i].value === target) {
            block = i;
            break;
        }
        if (indexTable[i].value > target) {
            block = i - 1;
            break;
        }
    }

    if (block < 0) {
        return {
            found: false,
            index: -1,
            steps,
            time: (performance.now() - start).toFixed(5)
        };
    }

    const startIndex = indexTable[block].index;
    const endIndex = Math.min(startIndex + blockSize, data.length);

    for (let i = startIndex; i < endIndex; i++) {
        steps++;
        if (data[i] === target) {
            return {
                found: true,
                index: i,
                steps,
                time: (performance.now() - start).toFixed(5)
            };
        }
    }

    return {
        found: false,
        index: -1,
        steps,
        time: (performance.now() - start).toFixed(5)
    };
}

// ===============================
// Program Utama
// ===============================

// Load dataset
const data = loadCSV("fruit_classification_dataset_fix.csv");
data.sort();

// ==== Input User ====
let input = readline.question("Masukkan daftar target pencarian (pisahkan dengan koma): ");
const targets = input.split(",").map(t => t.trim().toLowerCase());

console.log(`\nDataset loaded: ${data.length} data`);
console.log(`Target yang dicari: ${targets.join(", ")}\n`);

let resultTable = [];

for (let target of targets) {
    const sentinel = sentinelLinearSearch([...data], target);
    const iss = indexSequentialSearch(data, target);

    resultTable.push({
        Target: target,
        "Sentinel Found": sentinel.found,
        "Sentinel Index": sentinel.index,
        "Sentinel Steps": sentinel.steps,
        "Sentinel Time (ms)": sentinel.time,

        "ISS Found": iss.found,
        "ISS Index": iss.index,
        "ISS Steps": iss.steps,
        "ISS Time (ms)": iss.time
    });
}

console.table(resultTable);


