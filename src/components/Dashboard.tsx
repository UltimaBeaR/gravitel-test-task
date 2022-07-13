import { useGqlDashboardQuery } from 'hooks/graphql/dashboardQuery';
import DashboardDiagram from './DashboardDiagram';

import classes from './Dashboard.module.scss';

function Dashboard() {
  const { gqlDashboardData, gqlDashboardLoading, gqlDashboardError } = useGqlDashboardQuery();

  if (gqlDashboardLoading) {
    return (
      <div>Загрузка данных...</div>
    );
  }

  if (gqlDashboardError) {
    return (
      <div>Ошибка загрузки данных</div>
    );
  }

  return (
    <div className={classes.dashboard}>
      <DashboardDiagram name='Сценарии' {...gqlDashboardData!.dashboard.scenarios} />
      <DashboardDiagram name='Списки' {...gqlDashboardData!.dashboard.lists} />
      <DashboardDiagram name='Диалоги' {...gqlDashboardData!.dashboard.dialogs} />
    </div>
  );
}

export default Dashboard;
