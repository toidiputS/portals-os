import React from 'react';
import { useKernel } from '../../store/kernel';
import { PORTAL_BACKGROUNDS } from '../../constants';

const Settings: React.FC = () => {
  const currentWallpaper = useKernel(state => state.wallpaper);
  const setWallpaper = useKernel(state => state.setWallpaper);

  return (
    <div className="p-8 h-full overflow-y-auto text-[hsl(var(--card-foreground-hsl))]">
      <h1 className="text-2xl font-bold mb-4">Personalization</h1>

      <div>
        <h2 className="text-lg font-semibold mb-2">Change Background</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PORTAL_BACKGROUNDS.map(url => (
            <button
              key={url}
              onClick={() => setWallpaper(url)}
              className={`aspect-video rounded-lg overflow-hidden border-2 ${currentWallpaper === url ? 'border-[hsl(var(--accent-strong-hsl))]' : 'border-transparent'
                } transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring-hsl))]`}
            >
              <img src={url} alt="Wallpaper thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
