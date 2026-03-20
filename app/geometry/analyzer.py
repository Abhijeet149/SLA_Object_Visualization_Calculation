import io
import trimesh


def analyze_file_from_bytes(contents):

    mesh = trimesh.load(io.BytesIO(contents), file_type="stl")

    if isinstance(mesh, trimesh.Scene):
        mesh = trimesh.util.concatenate(mesh.dump())

    return {
        "bounding_box": {
            "x_length": float(mesh.extents[0]),
            "y_width": float(mesh.extents[1]),
            "z_height": float(mesh.extents[2])
        },
        "volume": float(mesh.volume)
    }