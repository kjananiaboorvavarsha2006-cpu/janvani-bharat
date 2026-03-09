import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Simplified India state boundaries (you would use actual GeoJSON data)
const indiaStates = {
  type: 'FeatureCollection',
  features: [
    // This is a simplified example - in production, use actual GeoJSON data
    {
      type: 'Feature',
      properties: { name: 'Maharashtra', center: [19.7515, 75.7139] },
      geometry: { type: 'Point', coordinates: [75.7139, 19.7515] }
    },
    {
      type: 'Feature',
      properties: { name: 'Karnataka', center: [15.3173, 75.7139] },
      geometry: { type: 'Point', coordinates: [75.7139, 15.3173] }
    },
    {
      type: 'Feature',
      properties: { name: 'Tamil Nadu', center: [11.1271, 78.6569] },
      geometry: { type: 'Point', coordinates: [78.6569, 11.1271] }
    },
    {
      type: 'Feature',
      properties: { name: 'Delhi', center: [28.7041, 77.1025] },
      geometry: { type: 'Point', coordinates: [77.1025, 28.7041] }
    },
    {
      type: 'Feature',
      properties: { name: 'Uttar Pradesh', center: [26.8467, 80.9462] },
      geometry: { type: 'Point', coordinates: [80.9462, 26.8467] }
    }
  ]
};

interface SchemeMapProps {
  onStateSelect?: (state: string) => void;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 5);
  }, [center, map]);
  return null;
}

export const SchemeMap = ({ onStateSelect }: SchemeMapProps) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStateClick = async (stateName: string) => {
    setSelectedState(stateName);
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/api/schemes`, {
        params: { state: stateName }
      });
      setSchemes(response.data.schemes || []);
    } catch (error) {
      console.error('Error fetching schemes:', error);
      setSchemes([]);
    } finally {
      setLoading(false);
    }

    if (onStateSelect) {
      onStateSelect(stateName);
    }
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        handleStateClick(feature.properties.name);
      },
      mouseover: (e: any) => {
        e.target.setStyle({
          fillColor: '#FF9933',
          fillOpacity: 0.7
        });
      },
      mouseout: (e: any) => {
        e.target.setStyle({
          fillColor: '#138808',
          fillOpacity: 0.5
        });
      }
    });

    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      direction: 'center'
    });
  };

  const pointToLayer = (feature: any, latlng: any) => {
    return (window as any).L.circleMarker(latlng, {
      radius: 20,
      fillColor: '#138808',
      color: '#FF9933',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.5
    });
  };

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: '500px', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            data={indiaStates as any}
            onEachFeature={onEachFeature}
            pointToLayer={pointToLayer}
          />
          <MapController center={[20.5937, 78.9629]} />
        </MapContainer>
      </Card>

      {/* State Info Panel */}
      {selectedState && (
        <Card className="absolute top-4 right-4 w-80 max-h-96 overflow-auto bg-card/95 backdrop-blur-sm shadow-elevated animate-fade-in">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg">{selectedState}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedState(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {loading ? (
              <p className="text-muted-foreground text-sm">Loading schemes...</p>
            ) : schemes.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">{schemes.length} schemes available:</p>
                {schemes.map((scheme, idx) => (
                  <div key={idx} className="bg-muted rounded-lg p-2">
                    <p className="font-medium text-sm">{scheme.schemeName}</p>
                    <p className="text-xs text-muted-foreground">{scheme.category}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No schemes found for this state.</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
