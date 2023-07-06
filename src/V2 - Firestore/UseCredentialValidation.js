import {useState} from "react"

export default function UseCredentialValidation(){
    const [error, setError] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = (email, pw) => {
        if (!email || !pw){
            setError("You need to enter your email and password to log in.");
            return;
        }
        else if (!emailRegex.test(email)){
            setError("The email doesn't conform to the default naming convention. Please enter a valid one.")
            return;
        }
    }

    return {error, validate};
}