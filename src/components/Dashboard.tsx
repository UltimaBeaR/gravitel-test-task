import { useGqlDashboardQuery } from 'hooks/graphql/dashboardQuery';

function LoginForm() {
  const { gqlDashboardData, gqlDashboardLoading, gqlDashboardError } = useGqlDashboardQuery();

  if (gqlDashboardData) {
    console.log(gqlDashboardData);
  }

  return (
    <div>
      Dashboard
    </div>
  );
}

export default LoginForm;
