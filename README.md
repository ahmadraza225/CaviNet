# 🫁 CaviNet — Mycobacterial Lung Cavity Detection

> **Final Year IT Project · 2026**
> Based on [josephnw/cavity-nnunet-pytorch](https://github.com/josephnw/cavity-nnunet-pytorch) · Powered by [nnU-Net](https://github.com/MIC-DKFZ/nnUNet) (MIC-DKFZ)

A **Streamlit web application** that demonstrates the complete nnU-Net CT scan cavity detection pipeline using **fully synthetic data** — no patient information, no GPU, no pre-trained model weights required.

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/ahmadraza225/CaviNet.git
cd CaviNet
```

### 2. Create a virtual environment

```bash
python -m venv venv

# macOS / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the app

```bash
streamlit run app.py
```

Open your browser at **http://localhost:8501** 🎉

---

## 🗂️ Project Structure

```
CaviNet/
├── app.py                    ← Streamlit web application (main entry point)
├── pipeline/
│   ├── __init__.py
│   ├── synthetic_ct.py       ← Generates synthetic 3D CT volumes in HU
│   ├── preprocessing.py      ← HU filtering + lung field isolation
│   ├── segmentation.py       ← Simulated 3D U-Net cavity inference
│   └── postprocessing.py     ← Connected components + volume computation
├── requirements.txt          ← Python dependencies
└── README.md
```

---

## 🎛️ Features

| Feature | Description |
|---|---|
| **Synthetic CT Generator** | Realistic 3D chest CT volumes in Hounsfield Units with injected cavities |
| **HU Filtering** | Simulates `filternii.py` — isolates the lung Hounsfield window |
| **Lung Segmentation** | Extracts left and right lung fields via connected-component analysis |
| **Cavity Detection** | Simulates nnU-Net 3D U-Net softmax confidence map |
| **Post-processing** | Removes spurious small predictions (mirrors `connected_components.py`) |
| **2D Slice Viewer** | 6-panel side-by-side axial slice comparison |
| **3D Visualisation** | Interactive Plotly 3D scatter plot of cavity distribution |
| **Clinical Report** | Per-cavity volume in mL with severity classification |
| **Sidebar Controls** | Real-time adjustment of all pipeline parameters |

---

## ⚙️ Sidebar Controls

| Control | Effect |
|---|---|
| Number of Cavities | Synthetic cavities injected into the CT volume |
| Scanner Noise Level | Gaussian noise σ to mimic real scanner characteristics |
| Random Seed | Reproducibility — same seed = same CT every time |
| Detection Threshold | U-Net confidence cutoff (lower = more detections) |
| Min Cavity Size (voxels) | Blobs below this count are discarded as noise |
| CT Axial Slice (Z) | Which depth slice to display in the 2D viewer |
| Show 3D Render | Toggle the interactive Plotly 3D visualisation |

---

## 🏗️ Pipeline Architecture

### Stage-by-Stage Breakdown

| Stage | File | What Happens |
|---|---|---|
| **① Synthetic CT** | `pipeline/synthetic_ct.py` | Creates 128×128×80 voxel 3D volume in HU using NumPy ellipses + Gaussian noise. Injects air-density cavities at random lung positions. |
| **② HU Filtering** | `pipeline/preprocessing.py` | Clips voxel values to lung window [−950, −300 HU] and normalises to [0, 1]. Mirrors `filternii.py` from the real pipeline. |
| **③ Lung Isolation** | `pipeline/preprocessing.py` | Threshold + `scipy.ndimage.label` to extract left and right lung fields. |
| **④ U-Net Inference** | `pipeline/segmentation.py` | Generates a per-voxel confidence map mimicking a trained 3D U-Net softmax output. Thresholds at user-selected value. |
| **⑤ Post-processing** | `pipeline/postprocessing.py` | Removes connected components smaller than `min_voxels`. Mirrors `nnunet/postprocessing/connected_components.py`. |
| **⑥ Volume Report** | `pipeline/postprocessing.py` | `volume_mL = voxel_count × 1.5 mm³ × 0.001` per detected cavity. |

### Real nnU-Net vs. CaviNet MVP

| Aspect | Real nnU-Net System | CaviNet MVP |
|---|---|---|
| Data | Patient `.nii.gz` CT files | NumPy synthetic 3D array |
| Model | Trained PyTorch `.pth` weights | Physics-based HU threshold rule |
| Inference | GPU sliding-window (CUDA) | CPU NumPy / SciPy |
| Preprocessing | SimpleITK resampling + `filternii.py` | NumPy clip + connected components |
| Output | Clinical NIfTI segmentation mask | Visual overlay + statistics table |
| Hardware | GPU recommended | Standard laptop CPU |

---

## 📦 Dependencies

| Package | Version | Role |
|---|---|---|
| streamlit | ≥1.32.0 | Web application framework |
| numpy | ≥1.24.0 | Array operations and CT volume generation |
| scipy | ≥1.11.0 | Connected components, Gaussian filter |
| scikit-image | ≥0.21.0 | Ellipse drawing for synthetic CT |
| matplotlib | ≥3.7.0 | 2D slice viewer and histogram |
| plotly | ≥5.18.0 | Interactive 3D cavity scatter plot |
| pandas | ≥2.0.0 | Clinical report table |
| Pillow | ≥10.0.0 | Image utilities |

---

## 📚 References

- [josephnw/cavity-nnunet-pytorch](https://github.com/josephnw/cavity-nnunet-pytorch) — Original cavity detection implementation
- [MIC-DKFZ/nnUNet](https://github.com/MIC-DKFZ/nnUNet) — Upstream nnU-Net framework
- Isensee et al., *"nnU-Net: a self-configuring method for deep learning-based biomedical image segmentation"*, Nature Methods 2021. DOI: 10.1038/s41592-020-01008-z

---

## 👨‍💻 Author

**ahmadraza225** · Final Year Information Technology · 2026

> *All data used in this application is fully synthetic. No real patient information is stored, processed, or transmitted.*