import { Announcement } from '@/types/announcement';
import DropdownAnnouncement from './dropdown-announcement';

interface AnnouncementCardProps {
  announcement: Announcement;
  isAuthorized: boolean;
}

export default function AnnouncementCard({ announcement, isAuthorized }: AnnouncementCardProps) {
  return (
    <div className="bg-white rounded-md border border-neutral-200 flex items-center justify-between p-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">{announcement.title}</h3>
        <p className="text-sm text-neutral-600 text-justify">{announcement.description}</p>
      </div>
      {isAuthorized && (
        <div>
          <DropdownAnnouncement announcement={announcement} />
        </div>
      )}
    </div>
  );
}
