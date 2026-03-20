from fastapi import FastAPI, Request, UploadFile, File
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from typing import List
from pydantic import BaseModel
import os
import uuid

from app.geometry.analyzer import analyze_file_from_bytes

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

latest_geometries = {}


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "files": []}
    )


@app.post("/upload", response_class=HTMLResponse)
async def upload(request: Request, files: List[UploadFile] = File(...)):

    global latest_geometries
    latest_geometries = {}

    os.makedirs("static/uploads", exist_ok=True)

    file_data = []

    for file in files:
        contents = await file.read()
        file_id = str(uuid.uuid4())

        geometry = analyze_file_from_bytes(contents)

        latest_geometries[file_id] = geometry

        file_path = f"static/uploads/{file_id}_{file.filename}"

        with open(file_path, "wb") as f:
            f.write(contents)

        file_data.append({
            "file_id": file_id,
            "file_name": file.filename,
            "file_url": f"/{file_path}"
        })

    return templates.TemplateResponse(
        "index.html",
        {"request": request, "files": file_data}
    )


class CalculationInput(BaseModel):
    file_id: str
    silicon_rate: float
    part_rate: float
    master_part: float
    boundary_spacing: float
    part_waste_gate: float


@app.post("/calculate")
async def calculate(data: CalculationInput):

    geometry = latest_geometries.get(data.file_id)

    if not geometry:
        return {"error": "Invalid file"}

    x = geometry["bounding_box"]["x_length"]
    y = geometry["bounding_box"]["y_width"]
    z = geometry["bounding_box"]["z_height"]

    volume = geometry["volume"]

    volume_cc = volume * 0.001
    weight = volume_cc * 1.1

    master_cost = volume_cc * data.master_part

    new_x = x + data.boundary_spacing
    new_y = y + data.boundary_spacing
    new_z = z + data.boundary_spacing

    volume_in_cc = volume * 0.001
    weight = volume_in_cc * 1.1

    master_pattern_cost = volume_in_cc * data.master_part

    mold_block_volume_mm3 = new_x * new_y * new_z
    mold_block_volume_cc = mold_block_volume_mm3 * 0.001
    mold_cost = mold_block_volume_cc * 1.1 * data.silicon_rate

    development_cost = master_pattern_cost + mold_cost
    part_cost = (weight + data.part_waste_gate) * data.part_rate

    return {
    "x_dimension": x,
    "y_dimension": y,
    "z_dimension": z,

    "new_x": new_x,
    "new_y": new_y,
    "new_z": new_z,

    "volume": volume,
    "volume_in_cc": volume_in_cc,
    "weight": weight,

    "mold_block_volume_mm3": mold_block_volume_mm3,
    "mold_block_volume_cc": mold_block_volume_cc,

    "master_pattern_cost": master_pattern_cost,
    "mold_cost": mold_cost,
    "development_cost": development_cost,
    "part_cost": part_cost
    }