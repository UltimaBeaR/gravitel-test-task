import { useMemo } from "react";

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import classes from './DashboardDiagram.module.scss';

const outerStyle = buildStyles({
  pathColor: "rgb(252, 207, 130)",
  trailColor: "rgb(242, 240, 245)",
})

const innerStyle = buildStyles({
  pathColor: "rgb(249, 167, 82)",
  trailColor: "transparent",
});

console.log(outerStyle);

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

  function mouseOver(event: any) {
    event.target.style.background = 'red';
  }
  function mouseOut(event: any){
    event.target.style.background="";
  }

  const diagram = (
    <div className={classes['diagram-wrapper']} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <CircularProgressbarWithChildren
        value={80}
        strokeWidth={5}
        styles={outerStyle}
      >
        <CircularProgressbarWithChildren
          value={70}
          strokeWidth={5}
          styles={innerStyle}
        >
          <div className={classes['diagram-name']}>
            {props.name}
          </div>
          <div className={classes['diagram-number']}>
            {total}
          </div>
        </CircularProgressbarWithChildren>
      </CircularProgressbarWithChildren>
    </div>
  );

  const textBlock = (
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
  );

  return (
    <div className={classes.root}>
      {diagram}
      {textBlock}
    </div>
  )
}

export default DashboardDiagram;