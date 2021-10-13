import Card from "../ui/Card";
import { RiStarLine, RiStarFill } from "react-icons/ri";
import { addFavorite, removeFavorite } from "../../store/reducers/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
const classes = require("../ui/Card.module.css");

function LandMarkItem(props) {
	let landmark = props.landmark;
	let dispatch = useDispatch();

	let itemIsFavorite = useSelector((state) =>
		state.favorites.some((_landmark) => _landmark._id === landmark._id)
	);

	function toggleFavoriteHandler() {
		if (itemIsFavorite) {
			dispatch(removeFavorite(landmark._id));
		} else {
			dispatch(addFavorite(landmark));
		}
	}

	return (
		<li style={{ width: "fit-content" }}>
			<Card>
				<img
					src={landmark.image}
					alt={landmark.title}
					height="200px"
					width="300px"
				/>
				<h3>
					{landmark.title}
					{itemIsFavorite ? (
						<span
							className={`${classes.star_filled} ${classes.star}`}
							onClick={toggleFavoriteHandler}
						>
							<RiStarFill />
						</span>
					) : (
						<span className={classes.star} onClick={toggleFavoriteHandler}>
							<RiStarLine />
						</span>
					)}
				</h3>
			</Card>
		</li>
	);
}

export default LandMarkItem;
