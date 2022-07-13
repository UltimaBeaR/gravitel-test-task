import Dashboard from "components/Dashboard";
import LogoutButton from "components/LogoutButton";

import classes from './DashboardPage.module.scss';

function DashboardPage() {
  return (
    <div className={classes.offsets}>
      <div className={classes.header}>
        <h2>Сводка</h2>
        <LogoutButton />
      </div>
      <div className={classes.content}>
        <Dashboard />
      </div>
    </div>
  );
}

export default DashboardPage;