








import { trace } from "console";
import * as React from "react"
import { Link } from "react-router-dom";
import { Track } from "../../models/track";

interface ITrackCardProperties 
{
    track: Track; 
}



function TrackCard(props: ITrackCardProperties)
{

    React.useEffect(() => 
    {

    }, []); 


    return (

    <div className="track-card">

        <div className="cover">
            <img src={ props.track.coverURL } alt={ props.track.title } />
        </div>

        <div className="info">
            <p className="subtitle">{ props.track.title }</p>

            <Link to={ `/artist/${ props.track.artists[0].id }` } children=
            {
                <p className="truncated">{ props.track.artists[0].name }</p>
            }/>

        </div>

        <div className="metadata">
            <p>{ props.track.duration.digitalTimeFormat() }</p>
        </div>
    </div>



    )

}


export { TrackCard }







