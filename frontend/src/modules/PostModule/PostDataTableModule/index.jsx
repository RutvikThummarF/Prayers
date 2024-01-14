import { ErpLayout } from '@/layout';
import PostPanel from '@/modules/PostPanelModule';

export default function PostDataTableModule({ config }) {
  return (
    <ErpLayout>
      <PostPanel config={config}></PostPanel>
    </ErpLayout>
  );
}
