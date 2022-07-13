import { useMemo } from "react";

import classes from './DashboardDiagram.module.scss';

interface DashboardDiagramProps {
  name: string,
  active: number,
  inactive: number,
  completed: number
}

function DashboardDiagram(props: DashboardDiagramProps) {
  const total = useMemo(
    () => props.active + props.inactive + props.completed,
    [props.active, props.inactive, props.completed]
  );

  return (
    <div className={classes.root}>
      <div className={classes.diagram}>
        <span>{props.name}</span>
      </div>
      <table className={classes['text-block']}>
        <tr>
          <td>Всего:</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>Активных:</td>
          <td>{props.active}</td>
        </tr>
        <tr>
          <td>Неактивных:</td>
          <td>{props.inactive}</td>
        </tr>
        <tr>
          <td>Завершенных:</td>
          <td>{props.completed}</td>
        </tr>
      </table>
    </div>

  )
}

export default DashboardDiagram;