const classes = require("./Card.module.css");

function Card(props: any) {
  return (<div className={classes.card}>{props.children}</div>)
}

export default Card;