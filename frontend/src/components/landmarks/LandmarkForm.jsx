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
		type: "",
		address: "",
		position: [0,0]
	};

	const [formData, setFormData] = useState(initialFormData);
	const [addrList, setAddrList] = useState([])
	const dispatch = useDispatch();

	useEffect(() => {
		setFormData({
			...formData,
			address: props.address,
			position: props.position,
		});
	}, [props.position]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if(formData.address.length > 3){
				axios.get(
						`https://api.opencagedata.com/geocode/v1/json?q=${formData.address}&key=${process.env.REACT_APP_GEOCODING_API_KEY}&language=en&pretty=1`)
					.then((res) => {
						deleteOptions();
						setAddrList(res.data?.results.map((obj)=>obj.formatted));
						if(res.data.results[0]?.geometry){
							setFormData({
								...formData,
								position: [res.data.results[0].geometry.lat, res.data.results[0].geometry.lng],
							});
							// THis is buggy as hell
							// Clean it up pls, future Greg
							//props.setPos([res.data.results[0].geometry.lat, res.data.results[0].geometry.lng])
						}
					});
			}
		}, 2000);

		return () => clearTimeout(delayDebounceFn);
	}, [formData.address]);

	useEffect(()=>{
		for (var key in addrList) {
			var optionElement = document.createElement("option");
			optionElement.value = addrList[key];
			optionElement.innerHTML = addrList[key];

			document.getElementById("addrlist").appendChild(optionElement);
		}
	}, [addrList])

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
				dispatch(getSights(res.data));
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

	function deleteOptions() {
		console.log("clicked");
		let datalist = document.getElementById("addrlist");
		datalist.innerHTML = ""
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
				<div className={classes.dropdown}>
					<label htmlFor="types">
						<b>Type of Landmark</b>
					</label>
					<select
						name="type"
						id="type"
						value={formData.type}
						onChange={handleChange}
					>
						<option value="poi">Point of Interest</option>
						<option value="museum">Museum</option>
						<option value="restaurant">Restaurant or Cafe</option>
						<option value="park">Park</option>
						<option value="free_time">Free Time</option>
						<option value="other">Other</option>
					</select>
				</div>
				<div className={classes.control}>
					<label>Address</label>
					<input
						type="text"
						name="address"
						id="address"
						list="addrlist"
						value={formData.address}
						onChange={handleChange}
					/>
					<datalist id="addrlist">
					</datalist>
				<input type="text" disabled value={formData.position} />
				</div>
				<div className={classes.actions}>
					<button>Add Landmark</button>
				</div>
			</form>
		</div>
	);
}

export default LandmarkForm;
