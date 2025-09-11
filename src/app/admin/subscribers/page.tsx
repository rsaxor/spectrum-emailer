import { SubscribersTable } from './subscribers-table';
import { PageClientContent } from './page-client';

export default function SubscribersPage() {
  return (
    <div>
      <PageClientContent />
      <SubscribersTable />
    </div>
  );
}