import PasteEditor from '@/components/Editor';
import RecentPastes from '@/components/RecentPastes';
import TrendingPastes from '@/components/TrendingPastes';

export default function Paste() {
  return (
<>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                  <PasteEditor />
                  </div>
                  <div>
                    <RecentPastes />
                    <TrendingPastes/>
                  </div>
                </div>
                  </>
  );
}