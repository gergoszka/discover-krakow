import LandMarkItem from "./LandmarkItem";
const classes = require('./Landmarks.module.css');

function LandmarkList(props) {
  return (
  <ul className={classes.container}>
    {props.landmarks.map((landmark) => <LandMarkItem key={landmark._id} landmark={landmark}/>)}
  </ul>
  )
}

export default LandmarkList;