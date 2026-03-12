"""
postprocessing.py
-----------------
Mimics nnunet/postprocessing/connected_components.py

Steps:
  1. Label connected components in the predicted binary mask
  2. Remove components smaller than min_voxels  (noise suppression)
  3. Compute cavity volume in millilitres (mL)
  4. Generate per-cavity statistics
"""

import numpy as np
from scipy.ndimage import label

# Simulated isotropic voxel spacing: 1 mm x 1 mm x 1.5 mm
VOXEL_VOLUME_MM3 = 1.0 * 1.0 * 1.5   # mm3 per voxel
MM3_TO_ML        = 0.001              # 1 mm3 = 0.001 mL

def postprocess(predicted_mask: np.ndarray, min_voxels: int = 20):
    """
    Clean the raw prediction mask and compute cavity statistics.

    Returns
    -------
    cleaned_mask     : np.ndarray bool  -- mask after small-component removal
    cavity_stats     : list[dict]       -- per-cavity measurements
    total_volume_ml  : float            -- total cavity burden in mL
    """
    labeled_array, num_features = label(predicted_mask)
    cleaned_mask = np.zeros_like(predicted_mask, dtype=bool)
    cavity_stats = []

    for comp_id in range(1, num_features + 1):
        component   = labeled_array == comp_id
        voxel_count = int(component.sum())

        if voxel_count < min_voxels:
            continue   # discard noise

        cleaned_mask |= component
        volume_mm3 = voxel_count * VOXEL_VOLUME_MM3
        volume_ml  = volume_mm3  * MM3_TO_ML

        # Axial bounding box
        coords = np.argwhere(component)
        bbox   = {
            "z_min": int(coords[:, 2].min()),
            "z_max": int(coords[:, 2].max()),
        }

        cavity_stats.append({
            "cavity_id"  : len(cavity_stats) + 1,
            "voxel_count": voxel_count,
            "volume_mm3" : round(volume_mm3, 2),
            "volume_ml"  : round(volume_ml,  4),
            "z_range"    : f"Slice {bbox['z_min']} - {bbox['z_max']}",
        })

    total_volume_ml = round(sum(c["volume_ml"] for c in cavity_stats), 4)
    return cleaned_mask, cavity_stats, total_volume_ml
