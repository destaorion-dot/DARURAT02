import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import { ForeignNation, BattleEvent, MilestoneEvent, LatLng } from '../types/history';
import { Compass, Ship, Flame, Flag, MapPin, ZoomIn, ZoomOut, Layers, ExternalLink, RotateCcw } from 'lucide-react';
import { playCannonBlast, playIndependenceFanfare, playShipBell } from '../utils/audioEffects';

interface MapContainerProps {
  currentView: 'indonesia' | 'global';
  mapStyle: 'antique' | 'osm' | 'satellite' | 'dark';
  activeFilter: 'all' | 'battles' | 'milestones' | 'expeditions';
  selectedNation: ForeignNation | null;
  activeColonizationStepIndex: number | null;
  isSailing: boolean;
  onSailingComplete: () => void;
  onSailingProgress: (progress: number) => void;
  battles: BattleEvent[];
  milestones: MilestoneEvent[];
  onSelectBattle: (battle: BattleEvent) => void;
  onSelectMilestone: (milestone: MilestoneEvent) => void;
  focusedCoords: LatLng | null;
  onResetFocus: () => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  currentView,
  mapStyle,
  activeFilter,
  selectedNation,
  activeColonizationStepIndex,
  isSailing,
  onSailingComplete,
  onSailingProgress,
  battles,
  milestones,
  onSelectBattle,
  onSelectMilestone,
  focusedCoords,
  onResetFocus
}) => {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Layers refs
  const battleLayerRef = useRef<L.LayerGroup | null>(null);
  const milestoneLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const colonizationLayerRef = useRef<L.LayerGroup | null>(null);
  const shipMarkerRef = useRef<L.Marker | null>(null);

  // Animation frame ref
  const animFrameRef = useRef<number | null>(null);

  // Mount tracking to prevent Leaflet flyTo unproject(NaN) on uninitialized viewport
  const isFirstMountRef = useRef<boolean>(true);

  // Center coordinates state
  const [currentCenter, setCurrentCenter] = useState<LatLng>({ lat: -2.5489, lng: 118.0149 });
  const [currentZoom, setCurrentZoom] = useState<number>(5);

  // Safe navigation wrapper preventing Invalid LatLng object: (NaN, NaN)
  const safeNavigate = useCallback((lat: number, lng: number, zoom: number, animate = true) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (
      typeof lat !== 'number' ||
      typeof lng !== 'number' ||
      isNaN(lat) ||
      isNaN(lng) ||
      !isFinite(lat) ||
      !isFinite(lng)
    ) {
      return;
    }
    const size = map.getSize();
    if (!animate || size.x <= 0 || size.y <= 0) {
      map.setView([lat, lng], zoom);
    } else {
      try {
        map.flyTo([lat, lng], zoom, { duration: 1.5 });
      } catch {
        map.setView([lat, lng], zoom);
      }
    }
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapElementRef.current || mapInstanceRef.current) return;

    const initialCenter: [number, number] = [-2.5489, 118.0149];
    const initialZoom = 5;

    const map = L.map(mapElementRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false, // We'll render custom clean controls
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Create layer groups
    battleLayerRef.current = L.layerGroup().addTo(map);
    milestoneLayerRef.current = L.layerGroup().addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map);
    colonizationLayerRef.current = L.layerGroup().addTo(map);

    // Track center
    map.on('moveend', () => {
      const c = map.getCenter();
      setCurrentCenter({ lat: c.lat, lng: c.lng });
      setCurrentZoom(map.getZoom());
    });

    // Handle container resize
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapElementRef.current) {
      resizeObserver.observe(mapElementRef.current);
    }

    // Delayed invalidateSize to ensure full 3/4 canvas render
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer based on mapStyle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let tileClassName = '';
    let maxZoom = 19;

    if (mapStyle === 'antique') {
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      tileClassName = 'tile-sepia';
    } else if (mapStyle === 'satellite') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      tileClassName = 'tile-satellite';
    } else if (mapStyle === 'dark') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      tileClassName = 'tile-dark';
    } else {
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      tileClassName = '';
    }

    tileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom,
      className: tileClassName,
      attribution: '&copy; OpenStreetMap contributors, CartoDB, Esri'
    }).addTo(map);
  }, [mapStyle]);

  // Handle View Change (Reset to Indonesia) safely
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return; // Do NOT animate on initial mount, map was already created with center and zoom
    }
    const map = mapInstanceRef.current;
    if (!map) return;

    safeNavigate(-2.5489, 118.0149, 5, true);
  }, [currentView, safeNavigate]);

  // Handle Focused Coords safely
  useEffect(() => {
    if (
      focusedCoords &&
      typeof focusedCoords.lat === 'number' &&
      typeof focusedCoords.lng === 'number' &&
      !isNaN(focusedCoords.lat) &&
      !isNaN(focusedCoords.lng) &&
      isFinite(focusedCoords.lat) &&
      isFinite(focusedCoords.lng)
    ) {
      safeNavigate(focusedCoords.lat, focusedCoords.lng, 9, true);
    }
    onResetFocus();
  }, [focusedCoords, onResetFocus, safeNavigate]);

  // Render Battles Markers (💥 / 🔥)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const battleGroup = battleLayerRef.current;
    if (!map || !battleGroup) return;

    battleGroup.clearLayers();

    if (activeFilter === 'milestones') return;

    battles.forEach((battle) => {
      // Custom DivIcon with animated explosion ring & flame
      const iconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <!-- Animated blast shockwave -->
          <div class="absolute w-12 h-12 rounded-full bg-red-600/30 animate-blast-ring pointer-events-none"></div>
          <div class="absolute w-8 h-8 rounded-full bg-orange-500/40 animate-ping opacity-50 pointer-events-none"></div>
          
          <!-- Core Explosion / Fire Badge -->
          <div class="relative z-10 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 via-orange-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-950 border-2 border-amber-300 text-sm animate-fire-glow transform hover:scale-125 transition-transform">
            <span>💥</span>
          </div>

          <!-- Year pill label -->
          <div class="absolute -bottom-5 whitespace-nowrap bg-stone-950/90 text-amber-300 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-red-700/60 shadow-md">
            ${battle.year.split('–')[0]}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-battle-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([battle.coordinates.lat, battle.coordinates.lng], {
        icon: customIcon,
        title: battle.title
      });

      marker.on('click', () => {
        playCannonBlast();
        onSelectBattle(battle);
      });

      // Rich Tooltip on hover
      marker.bindTooltip(
        `<div class="p-1">
          <div class="flex items-center gap-1 text-[10px] text-red-400 font-bold uppercase"><span class="animate-pulse">💥</span> Medan Perang ${battle.year}</div>
          <div class="font-bold text-xs text-amber-200">${battle.title}</div>
          <div class="text-[10px] text-stone-300">${battle.location}</div>
          <div class="text-[9px] text-stone-400 mt-1 italic">Klik untuk membuka arsip pertempuran</div>
        </div>`,
        { direction: 'top', opacity: 0.95 }
      );

      marker.addTo(battleGroup);
    });
  }, [battles, activeFilter, onSelectBattle]);

  // Render Milestones Markers (🇮🇩 Indonesian Fluttering Flag)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const milestoneGroup = milestoneLayerRef.current;
    if (!map || !milestoneGroup) return;

    milestoneGroup.clearLayers();

    if (activeFilter === 'battles') return;

    milestones.forEach((milestone) => {
      const isProclamation = milestone.id === 'hari-proklamasi-17-agustus';

      const iconHtml = `
        <div class="relative flex flex-col items-center justify-center cursor-pointer group">
          <!-- Golden Halo for Proclamation -->
          ${isProclamation ? '<div class="absolute w-14 h-14 rounded-full bg-red-600/30 animate-pulse pointer-events-none"></div>' : ''}
          
          <!-- Fluttering Indonesian Flag Badge -->
          <div class="relative z-10 ${isProclamation ? 'w-10 h-10 ring-4 ring-yellow-400/80 shadow-2xl shadow-red-600' : 'w-8 h-8 ring-2 ring-red-400 shadow-lg'} rounded-xl bg-gradient-to-b from-red-600 via-rose-500 to-white flex items-center justify-center border border-white text-lg animate-flag-wave transform hover:scale-125 transition-transform">
            <span>🇮🇩</span>
          </div>

          <!-- Date Tag -->
          <div class="whitespace-nowrap mt-1 bg-stone-950/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border ${isProclamation ? 'border-yellow-400 text-yellow-300' : 'border-stone-700'} shadow-md">
            ${milestone.date.includes('17 Agustus') ? '17 AGUSTUS 1945' : milestone.date.split('–')[0]}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-milestone-marker',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
      });

      const marker = L.marker([milestone.coordinates.lat, milestone.coordinates.lng], {
        icon: customIcon,
        title: milestone.title
      });

      marker.on('click', () => {
        playIndependenceFanfare();
        onSelectMilestone(milestone);
      });

      marker.bindTooltip(
        `<div class="p-1">
          <div class="flex items-center gap-1 text-[10px] text-amber-400 font-bold uppercase"><span>🇮🇩</span> ${milestone.date}</div>
          <div class="font-bold text-xs text-white">${milestone.title}</div>
          <div class="text-[10px] text-stone-300">${milestone.location}</div>
          <div class="text-[9px] text-stone-400 mt-1 italic">Klik untuk membuka detail kemerdekaan</div>
        </div>`,
        { direction: 'top', opacity: 0.95 }
      );

      marker.addTo(milestoneGroup);
    });
  }, [milestones, activeFilter, onSelectMilestone]);

  // Render Sailing Route & Origin Marker when a Nation is selected
  useEffect(() => {
    const map = mapInstanceRef.current;
    const routeGroup = routeLayerRef.current;
    if (!map || !routeGroup) return;

    routeGroup.clearLayers();

    if (!selectedNation) return;

    // 1. Origin Port Marker (Pintu Masuk Perairan Indonesia)
    const originIcon = L.divIcon({
      html: `
        <div class="flex flex-col items-center group cursor-pointer">
          <div class="w-10 h-10 rounded-xl bg-stone-900 border-2 border-amber-400 flex items-center justify-center shadow-xl text-2xl transform hover:scale-110 transition-transform">
            ${selectedNation.flag}
          </div>
          <div class="bg-stone-950 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded mt-1 border border-amber-500 shadow whitespace-nowrap">
            Pintu Masuk: ${selectedNation.originCity}
          </div>
        </div>
      `,
      className: 'custom-origin-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const originMarker = L.marker([selectedNation.originCoords.lat, selectedNation.originCoords.lng], {
      icon: originIcon
    }).addTo(routeGroup);

    originMarker.bindTooltip(
      `<div class="text-xs">
        <strong class="text-amber-300">Pintu Masuk Armada ${selectedNation.name}</strong><br/>
        ${selectedNation.originCity}
      </div>`
    );

    // 2. Landing Port Marker in Indonesia
    const landingIcon = L.divIcon({
      html: `
        <div class="flex flex-col items-center group cursor-pointer animate-bounce">
          <div class="w-10 h-10 rounded-xl bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center shadow-xl text-xl">
            ⚓
          </div>
          <div class="bg-emerald-950 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded mt-1 border border-emerald-500 shadow whitespace-nowrap">
            Pendaratan Pertama: ${selectedNation.landingPort.split(' ')[0]}
          </div>
        </div>
      `,
      className: 'custom-landing-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const landingMarker = L.marker([selectedNation.landingCoords.lat, selectedNation.landingCoords.lng], {
      icon: landingIcon
    }).addTo(routeGroup);

    landingMarker.bindTooltip(
      `<div class="text-xs">
        <strong class="text-emerald-300">Pendaratan Perdana di RI (${selectedNation.firstArrivalYear})</strong><br/>
        ${selectedNation.landingPort}
      </div>`
    );

    // 3. Polyline Route with waypoints
    const routePoints: [number, number][] = selectedNation.routeWaypoints.map((wp) => [wp.lat, wp.lng]);

    const routePolyline = L.polyline(routePoints, {
      color: selectedNation.color,
      weight: 3.5,
      dashArray: '8, 8',
      opacity: 0.85
    }).addTo(routeGroup);

    // Waypoint markers
    selectedNation.routeWaypoints.forEach((wp, idx) => {
      if (idx === 0 || idx === selectedNation.routeWaypoints.length - 1) return; // Skip origin & destination already marked
      const wpIcon = L.divIcon({
        html: `
          <div class="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-stone-900 shadow"></div>
        `,
        className: 'custom-wp-marker',
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const wpMarker = L.marker([wp.lat, wp.lng], { icon: wpIcon }).addTo(routeGroup);
      wpMarker.bindTooltip(
        `<div class="text-xs">
          <strong>${wp.name}</strong><br/>
          <span class="text-stone-300">${wp.description || ''}</span>
        </div>`
      );
    });

    // Fit bounds to show route if not sailing
    if (!isSailing) {
      try {
        const bounds = routePolyline.getBounds();
        const size = map.getSize();
        if (bounds.isValid() && size.x > 0 && size.y > 0) {
          map.fitBounds(bounds, { padding: [60, 60], maxZoom: 6 });
        }
      } catch {
        // safe fallback
      }
    }
  }, [selectedNation, isSailing]);

  // Handle Animated Ship Sailing Along Route
  useEffect(() => {
    const map = mapInstanceRef.current;
    const routeGroup = routeLayerRef.current;
    if (!map || !routeGroup || !selectedNation || !isSailing) {
      if (shipMarkerRef.current && routeGroup) {
        routeGroup.removeLayer(shipMarkerRef.current);
        shipMarkerRef.current = null;
      }
      return;
    }

    const waypoints = selectedNation.routeWaypoints;
    if (waypoints.length < 2) return;

    playShipBell();

    // Setup ship marker icon
    const shipIcon = L.divIcon({
      html: `
        <div class="flex flex-col items-center">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/90 border-2 border-white flex items-center justify-center shadow-2xl shadow-black text-2xl animate-ship-bob">
            ⛵
          </div>
          <div class="bg-stone-950 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow border border-amber-400 mt-1 whitespace-nowrap">
            ${selectedNation.shipNames[0] || 'Kapal Armada'}
          </div>
        </div>
      `,
      className: 'custom-sailing-ship-marker',
      iconSize: [48, 48],
      iconAnchor: [24, 24]
    });

    if (shipMarkerRef.current) {
      routeGroup.removeLayer(shipMarkerRef.current);
    }

    const shipMarker = L.marker([waypoints[0].lat, waypoints[0].lng], {
      icon: shipIcon,
      zIndexOffset: 1000
    }).addTo(routeGroup);
    shipMarkerRef.current = shipMarker;

    // Calculate total distance & segments
    const segmentLengths: number[] = [];
    let totalDistance = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      const p1 = L.latLng(waypoints[i].lat, waypoints[i].lng);
      const p2 = L.latLng(waypoints[i + 1].lat, waypoints[i + 1].lng);
      const dist = p1.distanceTo(p2);
      segmentLengths.push(dist);
      totalDistance += dist;
    }

    const duration = 3500; // Snappy 3.5 seconds across Indonesian waters (cepat & ringan tanpa loading berat)
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      onSailingProgress(progress);

      // Current target distance along path
      const currentTargetDist = progress * totalDistance;

      // Find which segment we are in
      let accumulatedDist = 0;
      let currentSegIndex = 0;
      for (let i = 0; i < segmentLengths.length; i++) {
        if (accumulatedDist + segmentLengths[i] >= currentTargetDist) {
          currentSegIndex = i;
          break;
        }
        accumulatedDist += segmentLengths[i];
      }

      const segProgress = (currentTargetDist - accumulatedDist) / (segmentLengths[currentSegIndex] || 1);
      const startWp = waypoints[currentSegIndex];
      const endWp = waypoints[Math.min(currentSegIndex + 1, waypoints.length - 1)];

      if (!startWp || !endWp) return;

      const currentLat = startWp.lat + (endWp.lat - startWp.lat) * segProgress;
      const currentLng = startWp.lng + (endWp.lng - startWp.lng) * segProgress;

      if (isNaN(currentLat) || isNaN(currentLng) || !isFinite(currentLat) || !isFinite(currentLng)) return;

      shipMarker.setLatLng([currentLat, currentLng]);

      // Gently follow the ship camera
      if (progress < 0.98) {
        const size = map.getSize();
        if (size.x > 0 && size.y > 0) {
          try {
            map.panTo([currentLat, currentLng], { animate: false });
          } catch {
            // safe fallback
          }
        }
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Finished voyage!
        playShipBell();
        onSailingComplete();
        // Zoom into Indonesia landing island safely
        if (
          selectedNation.landingCoords &&
          typeof selectedNation.landingCoords.lat === 'number' &&
          typeof selectedNation.landingCoords.lng === 'number' &&
          !isNaN(selectedNation.landingCoords.lat) &&
          !isNaN(selectedNation.landingCoords.lng)
        ) {
          safeNavigate(selectedNation.landingCoords.lat, selectedNation.landingCoords.lng, 7, true);
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [selectedNation, isSailing, onSailingComplete, onSailingProgress]);

  // Render Colonization Steps on Map when selected
  useEffect(() => {
    const map = mapInstanceRef.current;
    const colonizationGroup = colonizationLayerRef.current;
    if (!map || !colonizationGroup) return;

    colonizationGroup.clearLayers();

    if (!selectedNation || selectedNation.colonizationSteps.length === 0) return;

    const steps = selectedNation.colonizationSteps;
    const stepCoords: [number, number][] = steps.map((s) => [s.coordinates.lat, s.coordinates.lng]);

    // Draw colonization arrows / polyline
    L.polyline(stepCoords, {
      color: '#f59e0b',
      weight: 3,
      opacity: 0.7,
      dashArray: '5, 5'
    }).addTo(colonizationGroup);

    // Numbered step pins
    steps.forEach((step, idx) => {
      const isCurrentStep = activeColonizationStepIndex === idx;

      const stepIcon = L.divIcon({
        html: `
          <div class="flex flex-col items-center cursor-pointer transform hover:scale-125 transition-transform">
            <div class="w-7 h-7 rounded-full ${
              isCurrentStep
                ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-300 font-extrabold scale-125 shadow-xl'
                : 'bg-stone-950 text-amber-300 border border-amber-500 font-bold'
            } flex items-center justify-center text-xs shadow-md">
              ${idx + 1}
            </div>
            <div class="bg-stone-900/95 text-[9px] font-semibold text-stone-200 px-1.5 py-0.5 rounded border border-stone-700 shadow mt-0.5 whitespace-nowrap">
              ${step.year.split('–')[0]} ${step.locationName.split(' ')[0]}
            </div>
          </div>
        `,
        className: 'custom-colonization-step-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([step.coordinates.lat, step.coordinates.lng], {
        icon: stepIcon,
        zIndexOffset: isCurrentStep ? 500 : 100
      }).addTo(colonizationGroup);

      marker.bindTooltip(
        `<div class="text-xs p-1">
          <div class="font-bold text-amber-300">Fase ${idx + 1}: ${step.title} (${step.year})</div>
          <div class="text-stone-300">${step.locationName}</div>
          <div class="text-[10px] text-stone-400 mt-1">${step.description.substring(0, 80)}...</div>
        </div>`
      );
    });
  }, [selectedNation, activeColonizationStepIndex]);

  // Google Maps link for current center point
  const googleMapsCenterUrl = `https://www.google.com/maps?q=${currentCenter.lat.toFixed(4)},${currentCenter.lng.toFixed(4)}&z=${currentZoom}`;

  return (
    <div className="relative w-full h-full min-h-[450px] overflow-hidden bg-stone-950">
      {/* The Leaflet DOM Element */}
      <div ref={mapElementRef} className="w-full h-full" />

      {/* Custom Map Floating Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {/* Zoom In */}
        <button
          onClick={() => mapInstanceRef.current?.zoomIn()}
          className="p-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 shadow-xl transition-all"
          title="Perbesar Peta"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => mapInstanceRef.current?.zoomOut()}
          className="p-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 shadow-xl transition-all"
          title="Perkecil Peta"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Reset View to Nusantara */}
        <button
          onClick={() => {
            mapInstanceRef.current?.flyTo([-2.5489, 118.0149], 5, { duration: 1.2 });
          }}
          className="p-2 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-amber-400 border border-stone-700 shadow-xl transition-all"
          title="Reset ke Kepulauan Indonesia"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Vintage Compass Rose Widget */}
      <div className="absolute bottom-5 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-800 text-xs text-stone-300 shadow-xl">
        <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '30s' }} />
        </div>
        <div>
          <span className="font-cinzel text-amber-200 font-bold text-[11px] block">ORIENTASI NUSANTARA</span>
          <span className="text-[10px] text-stone-400 font-mono">
            {currentCenter.lat >= 0 ? `${currentCenter.lat.toFixed(2)}° LU` : `${Math.abs(currentCenter.lat).toFixed(2)}° LS`},{' '}
            {currentCenter.lng >= 0 ? `${currentCenter.lng.toFixed(2)}° BT` : `${Math.abs(currentCenter.lng).toFixed(2)}° BB`}
          </span>
        </div>
      </div>

      {/* Google Maps Bridge Floating Button */}
      <div className="absolute bottom-5 right-4 z-20 flex items-center gap-2 bg-stone-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-700 text-xs shadow-xl">
        <div className="flex items-center gap-1.5 text-stone-300">
          <MapPin className="w-3.5 h-3.5 text-red-400" />
          <span className="text-[11px] font-medium hidden md:inline">Terhubung Google Maps:</span>
        </div>
        <a
          href={googleMapsCenterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-all shadow"
          title="Buka titik koordinat tengah peta saat ini di Google Maps"
        >
          <span>Buka di Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Sailing Status Banner if Sailing */}
      {isSailing && selectedNation && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-stone-900/95 backdrop-blur-md border-2 border-amber-500 px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 animate-pulse">
          <span className="text-xl">⛵</span>
          <div className="text-xs">
            <span className="font-bold text-amber-300">Pelayaran {selectedNation.name}</span>
            <span className="text-stone-300 ml-1">menuju {selectedNation.landingPort}...</span>
          </div>
        </div>
      )}
    </div>
  );
};
