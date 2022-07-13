import { useGqlDashboardQuery } from 'hooks/graphql/dashboardQuery';

interface DashboardDiagramProps {
  name: string,
  active: number,
  inactive: number,
  completed: number
}

function DashboardDiagram(props: DashboardDiagramProps) {
  const total = props.active + props.inactive + props.completed;

  return (
    <div>
      <div>{props.name}</div>
      <div>Всего: {total}</div>
      <div>Активных: {props.active}</div>
      <div>Неактивных: {props.inactive}</div>
      <div>Завершенных: {props.completed}</div>
    </div>
  )
}

function Dashboard() {
  const { gqlDashboardData, gqlDashboardLoading, gqlDashboardError } = useGqlDashboardQuery();

  if (gqlDashboardData) {
    console.log(gqlDashboardData);
  }

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
    <div>
      <DashboardDiagram name='Сценарии' {...gqlDashboardData!.dashboard.scenarios} />
      <DashboardDiagram name='Списки' {...gqlDashboardData!.dashboard.lists} />
      <DashboardDiagram name='Диалоги' {...gqlDashboardData!.dashboard.dialogs} />
    </div>
  );
}

export default Dashboard;
