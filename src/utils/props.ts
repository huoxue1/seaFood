import {Location} from "react-router-dom"

export interface WithProps {
    location: Location
    navigate: (path:string) => any
}



