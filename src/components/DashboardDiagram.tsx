import { useMemo, useState } from "react";

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import classes from './DashboardDiagram.module.scss';

function buildCircleStyles(completedColor: string, activeColor: string, inactiveColor: string) {
  return {
    outer: buildStyles({
      pathColor: activeColor,
      trailColor: inactiveColor,
    }),
    inner: buildStyles({
      pathColor: completedColor,
      trailColor: "transparent",
    })
  };
}

function buildCircleStylesForAllCases() {
  const darkAccentColor = 'rgb(249, 167, 82)';
  const lightAccentColor = 'rgb(252, 207, 130)';
  const darkDimColor = 'rgb(185, 177, 192)';
  const lightDimColor = 'rgb(208, 203, 214)';
  const veryLightDimColor = 'rgb(242, 240, 245)';

  return {
    all: buildCircleStyles(darkAccentColor, lightAccentColor, veryLightDimColor),
    none: buildCircleStyles(darkDimColor, lightDimColor, veryLightDimColor),
    completed: buildCircleStyles(lightAccentColor, lightDimColor, veryLightDimColor),
    active: buildCircleStyles(darkDimColor, lightAccentColor, veryLightDimColor),
    inactive: buildCircleStyles(darkDimColor, lightDimColor, lightAccentColor)
  };
}

const circleStylesForAllCases = buildCircleStylesForAllCases();

function calcCircleParameters(localX: number, localY: number, width: number, height: number) {
  const percentX = (localX / width) - 0.5;
  const percentY = (localY / height) - 0.5;

  // В полярные координаты
  const radians = Math.atan2(percentX, percentY);

  const angle01 = 1.0 - (radians * (0.5/Math.PI) + 0.5);
  const distance01 = Math.sqrt(percentX * percentX + percentY * percentY) * 2;

  return {
    // Угол по часовой стрелке от 0 до 1 (0/1 находятся сверху, где 12 часов)
    angle01,

    // Дистанция от центра до края вписанной окружности, от 0 до 1 или -1, если выходит за пределы круга
    distance01: distance01 > 1 ? -1 : distance01
  };
};

const strokeWidth = 5;

interface DashboardDiagramProps {
  name: string,
  active: number,
  inactive: number,
  completed: number
}

function DashboardDiagram(props: DashboardDiagramProps) {
  const { total, completedCirclePercent, activeCirclePercent } = useMemo(
    () => {
      const total = props.active + props.inactive + props.completed;

      return {
        total,
        completedCirclePercent: props.completed / total,
        activeCirclePercent: (props.completed + props.active) / total
      };
    },
    [props.active, props.inactive, props.completed]
  );

  const [circleSelectionMode, setCircleSelectionMode] = useState<'all' | 'none' | 'completed'| 'active'| 'inactive'>('none');

  function mouseOver(event: React.MouseEvent<HTMLDivElement>) {
    const circleParameters = calcCircleParameters(
      event.pageX - event.currentTarget.offsetLeft,
      event.pageY - event.currentTarget.offsetTop,
      event.currentTarget.clientWidth,
      event.currentTarget.clientHeight
    );

    if (circleParameters.distance01 === -1) {
      setCircleSelectionMode('none');
      return;
    }

    if (circleParameters.distance01 > 0.85) {
      if (circleParameters.angle01 < completedCirclePercent) {
        setCircleSelectionMode('completed');
      }
      else if (circleParameters.angle01 < activeCirclePercent) {
        setCircleSelectionMode('active');
      }
      else {
        setCircleSelectionMode('inactive');
      }
    }
    else {
      setCircleSelectionMode('all');
    }
  }

  function mouseOut(){
    setCircleSelectionMode('none');
  }

  const diagram = (
    <div className={`${classes['diagram-wrapper']} ${circleSelectionMode === 'none' ? '' : classes.hover}`} onMouseMove={mouseOver} onMouseOut={mouseOut}>
      <CircularProgressbarWithChildren
        value={activeCirclePercent * 100}
        strokeWidth={strokeWidth}
        styles={circleStylesForAllCases[circleSelectionMode].outer}
      >
        <CircularProgressbarWithChildren
          value={completedCirclePercent * 100}
          strokeWidth={strokeWidth}
          styles={circleStylesForAllCases[circleSelectionMode].inner}
        >
          <div className={classes['diagram-name']}>
            {props.name}
          </div>
          <div className={classes['diagram-number']}>
            { circleSelectionMode === 'completed' ? props.completed : (circleSelectionMode === 'active' ? props.active : (circleSelectionMode === 'inactive' ? props.inactive : total)) }
          </div>
        </CircularProgressbarWithChildren>
      </CircularProgressbarWithChildren>
    </div>
  );

  const textBlock = (
    <table className={classes['text-block']}>
      <tbody>
        <tr
          className={circleSelectionMode === 'all' ? classes.selected : undefined}
          onMouseOver={() => setCircleSelectionMode('all')}
          onMouseOut={() => setCircleSelectionMode('none')}
        >
          <td>Всего:</td>
          <td>{total}</td>
        </tr>
        <tr
          className={circleSelectionMode === 'active' ? classes.selected : undefined}
          onMouseOver={() => setCircleSelectionMode('active')}
          onMouseOut={() => setCircleSelectionMode('none')}
        >
          <td>Активных:</td>
          <td>{props.active}</td>
        </tr>
        <tr
          className={circleSelectionMode === 'inactive' ? classes.selected : undefined}
          onMouseOver={() => setCircleSelectionMode('inactive')}
          onMouseOut={() => setCircleSelectionMode('none')}
        >
          <td>Неактивных:</td>
          <td>{props.inactive}</td>
        </tr>
        <tr
          className={circleSelectionMode === 'completed' ? classes.selected : undefined}
          onMouseOver={() => setCircleSelectionMode('completed')}
          onMouseOut={() => setCircleSelectionMode('none')}
        >
          <td>Завершенных:</td>
          <td>{props.completed}</td>
        </tr>
      </tbody>
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