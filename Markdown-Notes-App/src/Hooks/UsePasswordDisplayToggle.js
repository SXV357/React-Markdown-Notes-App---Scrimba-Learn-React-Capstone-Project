import {useState, useEffect} from "react"
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function UsePasswordDisplayToggle(){
    const [icon, setIcon] = useState(faEyeSlash);
    const [displayPw, setDisplayPw] = useState(false);

    const toggleDisplayPw = () => setDisplayPw(prevDisplayStatus => !prevDisplayStatus);

    useEffect(() => {
        setIcon(displayPw ? faEye : faEyeSlash);
    }, [displayPw])

    return {icon, toggleDisplayPw};
}