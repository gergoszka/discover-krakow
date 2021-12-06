import classes from "./Sidebar.module.css";

function Sidebar(props) {
  
	const close = (e) => {
		e.target.parentNode.setAttribute("hidden", "");
	};

	return (
		<div id="sidebar" className={classes.sidebar} hidden>
			<button className={classes.back} onClick={props.handleMapReset}>
				Back to map
			</button> 
			<button className={classes.close} onClick={close}>
				X
			</button>
			<h2 name="title" className={classes.title}>
				Placeholder Title
			</h2>
			<img name="image" className={classes.image} src="" alt="" />
			<div name="desc" id="description" className={classes.desc}>
				Placeholder desc
			</div>
		</div>
	);
}

export default Sidebar;
