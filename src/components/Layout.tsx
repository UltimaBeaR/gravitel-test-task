import { Outlet } from "react-router";

import classes from './Layout.module.scss';

function Layout() {
  return (
    <>
      <main className={classes['center-contents']}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
