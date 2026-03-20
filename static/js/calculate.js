// window.calculate = async function (fileId) {

//     try {
//         const silicon = document.getElementById(`silicon-${fileId}`).value;
//         const part = document.getElementById(`part-${fileId}`).value;
//         const master = document.getElementById(`master-${fileId}`).value;
//         const boundary = document.getElementById(`boundary-${fileId}`).value;
//         const waste = document.getElementById(`waste-${fileId}`).value;

//         const resultDiv = document.getElementById(`result-${fileId}`);

//         const response = await fetch("/calculate", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 file_id: fileId,
//                 silicon_rate: parseFloat(silicon) || 0,
//                 part_rate: parseFloat(part) || 0,
//                 master_part: parseFloat(master) || 0,
//                 boundary_spacing: parseFloat(boundary) || 0,
//                 part_waste_gate: parseFloat(waste) || 0
//             })
//         });

//         const result = await response.json();

//         if (result.error) {
//             resultDiv.innerHTML = `<span style="color:red">${result.error}</span>`;
//             return;
//         }

//         resultDiv.innerHTML = `
//         <h4>Dimensions</h4>
//         X: ${result.x_dimension.toFixed(2)} mm<br>
//         Y: ${result.y_dimension.toFixed(2)} mm<br>
//         Z: ${result.z_dimension.toFixed(2)} mm<br><br>

//         <h4>Dimensions with Boundary Spacing</h4>
//         X: ${result.new_x.toFixed(2)} mm<br>
//         Y: ${result.new_y.toFixed(2)} mm<br>
//         Z: ${result.new_z.toFixed(2)} mm<br><br>

//         <h4>Volume & Weight</h4>
//         Volume (mm³): ${result.volume.toFixed(2)}<br>
//         Volume (cc): ${result.volume_in_cc.toFixed(2)}<br>
//         Weight (g): ${result.weight.toFixed(2)}<br><br>

//         <h4>Cost Breakdown</h4>
//         Master Pattern Cost: ₹ ${result.master_pattern_cost.toFixed(2)}<br>
//         Silicon Mold Cost: ₹ ${result.mold_cost.toFixed(2)}<br>
//         Development Cost: ₹ ${result.development_cost.toFixed(2)}<br>
//         Part Cost: ₹ ${result.part_cost.toFixed(2)}
//     `;

//     } catch (error) {
//         console.error("Error:", error);
//         alert("Something went wrong");
//     }
// };

window.calculate = async function (fileId) {

    try {
        const silicon = document.getElementById(`silicon-${fileId}`).value;
        const part = document.getElementById(`part-${fileId}`).value;
        const master = document.getElementById(`master-${fileId}`).value;
        const boundary = document.getElementById(`boundary-${fileId}`).value;
        const waste = document.getElementById(`waste-${fileId}`).value;

        const resultDiv = document.getElementById(`result-${fileId}`);

        const response = await fetch("/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                file_id: fileId,
                silicon_rate: parseFloat(silicon) || 0,
                part_rate: parseFloat(part) || 0,
                master_part: parseFloat(master) || 0,
                boundary_spacing: parseFloat(boundary) || 0,
                part_waste_gate: parseFloat(waste) || 0
            })
        });

        const result = await response.json();

        if (result.error) {
            resultDiv.innerHTML = `<span style="color:red">${result.error}</span>`;
            return;
        }

        resultDiv.innerHTML = `
        <h4>Dimensions</h4>
        X: ${result.x_dimension.toFixed(2)} mm<br>
        Y: ${result.y_dimension.toFixed(2)} mm<br>
        Z: ${result.z_dimension.toFixed(2)} mm<br><br>

        <h4>Dimensions with Boundary Spacing</h4>
        X: ${result.new_x.toFixed(2)} mm<br>
        Y: ${result.new_y.toFixed(2)} mm<br>
        Z: ${result.new_z.toFixed(2)} mm<br><br>

        <h4>Volume & Weight</h4>
        Volume (mm³): ${result.volume.toFixed(2)}<br>
        Volume (cc): ${result.volume_in_cc.toFixed(2)}<br>
        Weight (g): ${result.weight.toFixed(2)}<br><br>

        <h4>Cost Breakdown</h4>
        Master Pattern Cost: ₹ ${result.master_pattern_cost.toFixed(2)}<br>
        Silicon Mold Cost: ₹ ${result.mold_cost.toFixed(2)}<br>
        Development Cost: ₹ ${result.development_cost.toFixed(2)}<br>
        Part Cost: ₹ ${result.part_cost.toFixed(2)}
    `;

    } catch (err) {
        console.error(err);
        alert("Error occurred");
    }
};