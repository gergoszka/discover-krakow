import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSights } from "../../store/reducers/sightSlice";
const classes = require("./Landmarks.module.css");

/* eslint-disable */
function LandmarkForm(props) {

	const initialFormData = {
		title: "",
		image: "",
		desc: "",
		lat: 0,
		lng: 0,
	};

	const [formData, setFormData] = useState(initialFormData);
	const dispatch = useDispatch();

	useEffect(() => {
		setFormData({
			...formData,
			lat: props.position[0],
			lng: props.position[1],
		});
	}, [props.position]);

	function handleChange(event) {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (isFormFilled(formData)) {
      
      axios.post("http://localhost:4040/landmarks", formData).then((res) => {
        dispatch(getSights(res.data))
      });

      setFormData(initialFormData);
		}
	}

	function isFormFilled(data) {
		let correct = 0;
		for (let key in data) {
			if (data[key]) {
				correct += 1;
			}
		}
		return correct === Object.keys(data).length ? true : false;
	}

	return (
		<div className={classes.formContainer}>
			<h2>Submit a new landmark</h2>
			<form className={classes.form} onSubmit={handleSubmit}>
				<div className={classes.control}>
					<label htmlFor="title">Landmark Title</label>
					<input
						type="text"
						name="title"
						id="title"
						required
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor="image">Image Url</label>
					<input
						type="url"
						name="image"
						id="image"
						required
						value={formData.image}
						onChange={handleChange}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor="desc">Description</label>
					<textarea
						type="text"
						name="desc"
						id="desc"
						value={formData.desc}
						onChange={handleChange}
					/>
				</div>
				<div className={classes.control}>
					<label>Position</label>
					<div className={classes.position}>
						<label htmlFor="">Latitude: </label>
						<input
							type="number"
							name="lat"
							id="lat"
							required
							disabled
							value={formData.lat}
						/>
					</div>
					<div className={classes.position}>
						<label htmlFor="">Longitude: </label>
						<input
							type="number"
							name="lng"
							id="lng"
							required
							disabled
							value={formData.lng}
						/>
					</div>
				</div>
				<div className={classes.actions}>
					<button>Add Landmark</button>
				</div>
			</form>
		</div>
	);
}

export default LandmarkForm;
