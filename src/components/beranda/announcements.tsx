import { Announcement } from '@/types/announcement';
import DialogAddAnnouncement from './dialog-add-announcement';
import { getAnnouncementsPaginated } from '@/actions/announcement';
import AnnouncementCard from './announcement-card';
import { auth } from '@/lib/auth';
import { PaginationBar } from '../ui/pagination-bar';

export default async function Announcements({ page }: { page: string }) {
  const session = await auth();
  const announcements = await getAnnouncementsPaginated({ page: Number(page) });
  const data: Announcement[] = announcements?.data?.data ?? [];
  const isAuthorized = session?.user?.role === 'admin' || session?.user?.role === 'dosen';

  return (
    <div
      id='announcements'
      className='bg-white rounded-lg border border-neutral-200 md:shadow mb-6 p-6'
    >
      <div className='flex justify-between items-center'>
        <h2 className='font-medium text-xl'>📢 Pengumuman</h2>
        {isAuthorized && <DialogAddAnnouncement />}
      </div>
      {data.length === 0 ? (
        <p className='mt-6 text-sm text-neutral-600'>Belum ada pengumuman.</p>
      ) : (
        <div className='mt-6 flex flex-col gap-4'>
          {data.map((item: Announcement) => (
            <AnnouncementCard key={item.id} announcement={item} isAuthorized={isAuthorized} />
          ))}
          {data.length > 6 && (
            <PaginationBar
              currentPage={announcements.data?.currentPage ?? 1}
              totalPages={announcements.data?.totalPages ?? 1}
              idSection='announcements'
            />
          )}
        </div>
      )}
    </div>
  );
}
