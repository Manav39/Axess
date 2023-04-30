import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import {v4 as uuidv4} from 'uuid';


function Login() {
	const [qrValue, setQRValue] = useState('initial value');
	useEffect(() => {
		const timer = setInterval(() => {
			// generate new QR conpde value here
			setQRValue(uuidv4());
		}, 3000);
		console.log(uuidv4())
		// clean up the timer when the component unmounts
		return () => clearInterval(timer);
	}, []);
	
	return (
		<div style={{display: 'flex', justifyContent: 'flex-end', height: ''}}>
			<QRCode value={qrValue}/>
		</div>
	)
}

export default Login;