import {useState} from "react"

export default function UseCredentialValidation(){
    const [error, setError] = useState("");

    const validate = (email, pw) => {
        if (!email || !pw){
            setError("You need to enter your email and password to log in.");
            return;
        }
    }
    return {error, setError, validate};
}