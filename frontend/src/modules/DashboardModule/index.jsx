import { Tag, Row, Col } from 'antd';
import useLanguage from '@/locale/useLanguage';

import { useMoney } from '@/settings';

import { request } from '@/request';
import useFetch from '@/hooks/useFetch';

import RecentTable from './components/RecentTable';

import SummaryCard from './components/SummaryCard';
import PreviewCard from './components/PreviewCard';

export default function DashboardModule() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();

  const dataTableColumns = [];

  const entityData = [];

  const cards = entityData.map((data, index) => {
    return null;
  });

  const statisticCards = entityData.map((data, index) => {
    return null;
  });

  return (
    <>
      <div className="space30"></div>
    </>
  );
}
