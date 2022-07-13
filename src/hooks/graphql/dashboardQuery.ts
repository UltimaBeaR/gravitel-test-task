import { gql, useQuery } from '@apollo/client';

export interface GqlStatistic {
  active: number,
  inactive: number,
  completed: number
}

export interface GqlDashboardStat {
  scenarios: GqlStatistic,
  lists: GqlStatistic,
  dialogs: GqlStatistic
}

export interface GqlDashboardData {
  dashboard: GqlDashboardStat
}

const GQL_DASHBOARD = gql`
  query Dashboard {
    dashboard {
      scenarios {
        active
        inactive
        completed
      }
      lists {
        active
        inactive
        completed
      }
      dialogs {
        active
        inactive
        completed
      }
    }
  }
`;

export function useGqlDashboardQuery() {
  const { loading, error, data } = useQuery<GqlDashboardData>(GQL_DASHBOARD);

  return {
    gqlDashboardData: data,
    gqlDashboardLoading: loading,
    gqlDashboardError: error
  };
}