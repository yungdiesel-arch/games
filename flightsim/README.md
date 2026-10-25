# Raptor Flight Sim (v2)

Single-file browser flight sim (phone + desktop). Open `index.html`.

- 6-DOF flight model at 120 Hz: AoA/sideslip, CL curve with stall, induced/parasitic/wave drag, ISA atmosphere, engine spool, fly-by-wire (toggle), gear, wheel/brake ground handling, landings and crashes.
- Real terrain around Camarillo / Oxnard, California.

## Credits
- F-22 3D model by **Toxværd** (Printables/Thingiverse), licensed **CC BY 4.0** – https://creativecommons.org/licenses/by/4.0/
- Terrain elevation: SRTM / USGS via Mapzen Terrain Tiles on AWS.
- Ground textures: ambientCG (CC0).
- Sky, water, clouds, airbase, trees, towns and effects are drawn by code. Built with three.js (MIT).

Saves use localStorage, so they are per site (this GitHub Pages copy and the sharehtml copy keep separate progress).
