// document.addEventListener("DOMContentLoaded", function () {

//     const container = document.getElementById("partsContainer");
//     const files = window.uploadedFiles || [];

//     if (!container || files.length === 0) return;

//     files.forEach(file => {

//         const card = document.createElement("div");
//         card.className = "part-card";

//         card.innerHTML = `
//             <h3>${file.file_name}</h3>

//             <div class="card-body">
//                 <div class="viewer-section">
//                     <div class="viewer" id="viewer-${file.file_id}"></div>
//                 </div>

//                 <div class="form-section">
//                     <div class="form-group">
//                         <label>Silicon Rate</label>
//                         <input type="number" id="silicon-${file.file_id}">
//                     </div>

//                     <div class="form-group">
//                         <label>Part Rate</label>
//                         <input type="number" id="part-${file.file_id}">
//                     </div>

//                     <div class="form-group">
//                         <label>Master Part</label>
//                         <input type="number" id="master-${file.file_id}">
//                     </div>

//                     <div class="form-group">
//                         <label>Boundary Spacing</label>
//                         <input type="number" id="boundary-${file.file_id}">
//                     </div>

//                     <div class="form-group">
//                         <label>Waste Gate</label>
//                         <input type="number" id="waste-${file.file_id}">
//                     </div>

//                     <button onclick="calculate('${file.file_id}')">
//                         Calculate
//                     </button>

//                     <div id="result-${file.file_id}" class="result-box"></div>
//                 </div>
//             </div>
//         `;

//         container.appendChild(card);

//         createViewer(`viewer-${file.file_id}`, file.file_url);

//         enableEnterNavigation(card);
//     });

// });

// function enableEnterNavigation(card) {

//     const inputs = card.querySelectorAll("input");

//     inputs.forEach((input, index) => {
//         input.addEventListener("keydown", function (e) {

//             if (e.key === "Enter") {
//                 e.preventDefault();

//                 const nextInput = inputs[index + 1];

//                 if (nextInput) {
//                     nextInput.focus();
//                 } else {
//                     const btn = card.querySelector("button");
//                     if (btn) btn.click();
//                 }
//             }
//         });
//     });
// }

document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("partsContainer");
    const files = window.uploadedFiles || [];

    if (!container || files.length === 0) return;

    files.forEach(file => {

        const card = document.createElement("div");
        card.className = "main-card";

        card.innerHTML = `
            <h2 class="file-title">${file.file_name}</h2>

            <div class="main-grid">

                <!-- VIEWER -->
                <div class="panel">
                    <h3>3D Viewer</h3>
                    <div id="viewer-${file.file_id}" class="viewer-box"></div>
                </div>

                <!-- INPUT -->
                <div class="panel input-panel">
                    <h3>Input Panel</h3>

                    <label>Silicon Rate</label>
                    <input type="number" id="silicon-${file.file_id}">

                    <label>Part Rate</label>
                    <input type="number" id="part-${file.file_id}">

                    <label>Master Part</label>
                    <input type="number" id="master-${file.file_id}">

                    <label>Boundary Spacing</label>
                    <input type="number" id="boundary-${file.file_id}">

                    <label>Waste Gate</label>
                    <input type="number" id="waste-${file.file_id}">

                    <button onclick="calculate('${file.file_id}')">
                        Calculate
                    </button>
                </div>

                <!-- REPORT -->
                <div class="panel report-panel">
                    <h3>Report</h3>
                    <div id="result-${file.file_id}"></div>
                </div>

            </div>
        `;

        container.appendChild(card);

        createViewer(`viewer-${file.file_id}`, file.file_url);

        enableEnterNavigation(card);
    });

});

function enableEnterNavigation(card) {

    const inputs = card.querySelectorAll("input");

    inputs.forEach((input, index) => {
        input.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {
                e.preventDefault();

                const nextInput = inputs[index + 1];

                if (nextInput) {
                    nextInput.focus();
                } else {
                    const btn = card.querySelector("button");
                    if (btn) btn.click();
                }
            }
        });
    });
}