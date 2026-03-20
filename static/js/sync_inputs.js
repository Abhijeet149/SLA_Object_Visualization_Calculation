
// document.getElementById("syncAllBtn")?.addEventListener("click", () => {

//     const first = document.querySelector("input");

//     if (!first) return;

//     const values = {
//         silicon: first.value
//     };

//     document.querySelectorAll("input").forEach(input => {
//         input.value = first.value;
//     });

// });

document.getElementById("syncAllBtn")?.addEventListener("click", () => {

    const files = window.uploadedFiles || [];

    if (files.length === 0) return;

    // 👉 Take values from FIRST card
    const firstId = files[0].file_id;

    const silicon = document.getElementById(`silicon-${firstId}`).value;
    const part = document.getElementById(`part-${firstId}`).value;
    const master = document.getElementById(`master-${firstId}`).value;
    const boundary = document.getElementById(`boundary-${firstId}`).value;
    const waste = document.getElementById(`waste-${firstId}`).value;

    // 👉 Apply to ALL cards
    files.forEach(file => {

        document.getElementById(`silicon-${file.file_id}`).value = silicon;
        document.getElementById(`part-${file.file_id}`).value = part;
        document.getElementById(`master-${file.file_id}`).value = master;
        document.getElementById(`boundary-${file.file_id}`).value = boundary;
        document.getElementById(`waste-${file.file_id}`).value = waste;

    });

});