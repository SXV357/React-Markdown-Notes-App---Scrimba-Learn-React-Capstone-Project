import {useState} from "react"

export default function UseCredentialValidation(){
    const [error, setError] = useState("");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = (email, pw) => {
        if (!email || !pw){
            setError("You need to enter your email and password to log in.");
            return;
        }
        if (!(emailRegex.test(email))){
            setError("This email is invalid. Please enter a valid one and try again");
            return;
        }
    }
    return {error, setError, validate};
}