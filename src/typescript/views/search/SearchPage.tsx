


import * as React from "react"
import { useLocation, useNavigate } from "react-router";
import { Architect } from "../../admin/architect";
import { Grid } from "../../components/grid";
import { Region } from "../../components/region";
import { Axis, Scrollview } from "../../components/scrollview"
import { Textfield, textfieldType } from "../../components/textfield";
import { Album } from "../../models/album";
import { Query } from "../../models/query";
import { Track } from "../../models/track";
import { getIDfromURL } from "../../utilities/getId";
import { AlbumCard } from "../cards/albumCard";
import { ArtistCard } from "../cards/artistCard";
import { TrackCard } from "../cards/trackCard";



interface ISearchPageProperties
{

}

function SearchPage(props: ISearchPageProperties)
{

    const navigate = useNavigate(); 

    const location = useLocation(); 
    const [query, setQuery] = React.useState<Query>( undefined );


    // #region On Mount
    React.useEffect(() => 
    {

        const encoded = window.location.pathname.split(`/`)[2]; 
        const searchString = encoded ? decodeURIComponent(encoded) : undefined;

        setupPage(searchString); 

    }, [location]); 
    // #endregion

    // #region Fetch Query Items 
    const setupPage = React.useCallback( async (value: string) => 
    {
        if (!value || value == ``) { setQuery(undefined); return; }

        const queryItem = await Architect.network.fetchQueryItems(value);
        setQuery( queryItem ); 

    }, []); 
    // #endregion

    // #region Display Songs
    const displaySongs = React.useMemo<Track[]>(() => 
    {
        if (!query) { return }; 

        return (query.songs.slice(0, 5)); 

    }, [query]); 
    // #endregion

    return (
    
    <Scrollview id="search" axis={ Axis.vertical } classes="sheet" content=
    {
    <>
        <div className="searchcontainer">
        <Textfield
        id="searchfield"
        leadIcon=
        {
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.375 15.75C13.172 15.75 16.25 12.672 16.25 8.875C16.25 5.07804 13.172 2 9.375 2C5.57804 2 2.5 5.07804 2.5 8.875C2.5 12.672 5.57804 15.75 9.375 15.75Z" stroke="#28293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.5599 14.6849L18.1369 18.0181" stroke="#28293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        }
        type={ textfieldType.search }
        placeholder={ `Search ...` }
        onTextfieldCommit={ (value: string) => 
        {
            navigate(`/search/${ value }`);

        }}
        />
        </div>


        {
        query ? 
        <>
        <Region header="Songs" content=
        {
            (displaySongs.map((track, trackIndex) => <TrackCard key={ trackIndex } track={ track } />))
        }/>


        <Region articleID="search-artists" header={ "Artists" } content=
        {

            <Grid gap={{ x: 1, y: 1 }} minItemWidth={ 320 } contentItems=
            {
                <>
                { (query.artists.map((artist, artistIndex) => <ArtistCard key={ artistIndex } artist={ artist } />)) }
                </>
            } />

        }/>


        <Region articleID="search-albums" header={ "Albums" } content=
        {

            <Grid gap={{ x: 1, y: 1 }} minItemWidth={ 320 } contentItems=
            {
                <>
                { (query.albums.map((album, albumIndex) => <AlbumCard key={ albumIndex } album={ album } class="grid-item" />)) }
                </>
            } />

        }/>

        </>

        : 

        <div className="empty">
            <div className="illustration">
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 982.48732 763.01413" xmlnsXlink="http://www.w3.org/1999/xlink"><circle cx="559.4329" cy="333.06116" r="40.02979" fill="#e6e6e6"/><path d="M766.295,452.99465l-41.832-41.832a44.307,44.307,0,0,0-14.42627-61.92578,44.45758,44.45758,0,0,0-58.91358,12.23779,44.30652,44.30652,0,0,0,60.03321,62.99512l41.832,41.832A9.40939,9.40939,0,0,0,766.295,452.99465ZM709.59431,409.6011a31.68421,31.68421,0,1,1,9.27978-22.40381A31.58568,31.58568,0,0,1,709.59431,409.6011Z" transform="translate(-108.75634 -68.49293)" fill="#3f3d56"/><path d="M1069.529,514.69884C1176.50914,633.00725,866.39184,803.50707,615.8095,803.50707S191.86334,671.39983,162.09,514.69884C89.89987,134.75174,777.16735-106.74054,615.8095,225.89055,380.61181,710.73882,985.27984,421.5284,1069.529,514.69884Z" transform="translate(-108.75634 -68.49293)" fill="#e6e6e6"/><path d="M1021.529,542.69884C1128.50914,661.00725,818.39184,831.50707,567.8095,831.50707S143.86334,699.39983,114.09,542.69884C41.89987,162.75174,729.16735-78.74054,567.8095,253.89055,332.61181,738.73882,937.27984,449.5284,1021.529,542.69884Z" transform="translate(-108.75634 -68.49293)" fill="#3f3d56"/><path d="M258.35026,265.31823c-75.06741-3.30525-133.27133-19.49788-132.50668-36.86436.45844-10.41178,21.70324-18.7842,58.28677-22.96955a1,1,0,1,1,.22727,1.987c-34.46168,3.943-56.11733,12.01678-56.516,21.07051-.69148,15.70451,59.11433,31.63093,130.59659,34.77832s132.4564-7.461,133.14787-23.16554c.40032-9.09178-20.59681-19.06558-54.79775-26.0284a1.00008,1.00008,0,1,1,.3991-1.95993c36.3011,7.39058,56.85694,17.624,56.39672,28.0763C392.81953,257.60908,333.41767,268.62348,258.35026,265.31823Z" transform="translate(-108.75634 -68.49293)" fill="#b3b5c3"/><path d="M191.67927,268.22672a76.98277,76.98277,0,0,0,133.03578,5.52178A1211.97551,1211.97551,0,0,1,191.67927,268.22672Z" transform="translate(-108.75634 -68.49293)" fill="#b3b5c3"/><path d="M333.019,252.71347a76.997,76.997,0,1,0-147.74945-5.70562A572.23325,572.23325,0,0,0,333.019,252.71347Z" transform="translate(-108.75634 -68.49293)" fill="#b3b5c3"/><circle cx="168.83353" cy="123.60073" r="9" fill="#fff"/><circle cx="122.51347" cy="152.59128" r="15" fill="#fff"/><circle cx="348.90479" cy="142.89813" r="9.99975" fill="#b3b5c3"/><circle cx="122.90479" cy="452.89813" r="6.00007" fill="#e6e6e6"/><circle cx="542.90479" cy="658.89813" r="6.00007" fill="#e6e6e6"/><circle cx="151.90479" cy="339.89813" r="3.00007" fill="#e6e6e6"/><circle cx="399.90479" cy="563.89813" r="3.00007" fill="#e6e6e6"/><circle cx="850.90479" cy="534.89813" r="3.00007" fill="#e6e6e6"/><circle cx="709.90479" cy="623.89813" r="3.00007" fill="#e6e6e6"/><circle cx="562.90479" cy="515.89813" r="3.00007" fill="#e6e6e6"/><circle cx="372.90479" cy="219.89813" r="3.00007" fill="#e6e6e6"/><circle cx="396.90479" cy="71.89813" r="3.00007" fill="#e6e6e6"/><circle cx="382.90479" cy="694.89813" r="3.00007" fill="#e6e6e6"/><circle cx="234.90479" cy="631.89813" r="3.00007" fill="#e6e6e6"/><circle cx="703.90479" cy="523.89813" r="3.00007" fill="#e6e6e6"/><circle cx="148.3737" cy="224.7987" r="9" fill="#fff"/><path d="M460.6612,431.39114c0,26.88035-41.55939,89.516-53.70465,107.24669a3.99188,3.99188,0,0,1-6.5907,0c-12.14526-17.73066-53.70465-80.36634-53.70465-107.24669a57,57,0,1,1,114,0Z" transform="translate(-108.75634 -68.49293)" fill="#fff"/><circle cx="294.90486" cy="358.8982" r="29" fill="#b3b5c3"/><ellipse cx="294.40486" cy="496.3982" rx="33.5" ry="6.5" fill="#fff"/><path d="M925.60957,386.41245a10.52681,10.52681,0,0,0-.64106,1.52851l-47.783,13.27682-8.61085-8.42662L854.1589,404.12429,867.953,420.52338a8,8,0,0,0,9.35283,2.169l51.61632-22.78484a10.49709,10.49709,0,1,0-3.31256-13.49509Z" transform="translate(-108.75634 -68.49293)" fill="#ffb8b8"/><path d="M875.50191,401.996l-17.9352,13.95958a4.5,4.5,0,0,1-6.68163-1.33719L839.73843,394.891a12.49741,12.49741,0,0,1,19.76923-15.29426l16.33819,15.59379a4.5,4.5,0,0,1-.34394,6.80543Z" transform="translate(-108.75634 -68.49293)" fill="#b3b5c3"/><path d="M930.19158,379.80967l18.18807,8.1829a3.14913,3.14913,0,0,1,1.57976,4.16384l-2.15339,4.78633a1.05293,1.05293,0,0,1,.52659,1.38795l-.86136,1.91453a1.05292,1.05292,0,0,1-1.388.52659l-.86136,1.91453a1.05292,1.05292,0,0,1,.52659,1.388l-.86136,1.91453a1.0529,1.0529,0,0,1-1.38794.52659L931.8709,432.36162a3.14914,3.14914,0,0,1-4.16384,1.57977l-18.18807-8.1829a3.14915,3.14915,0,0,1-1.57977-4.16384l18.08852-40.20522A3.14913,3.14913,0,0,1,930.19158,379.80967Z" transform="translate(-108.75634 -68.49293)" fill="#3f3d56"/><path d="M912.82137,423.21181l14.59056,6.57106a3.03424,3.03424,0,0,0,3.99937-1.51155l6.73892-14.98951,2.34078-5.196,6.09875-13.562a3.026,3.026,0,0,0-1.51149-3.98886l-4.58726-2.06786L930.47694,383.964a3.02112,3.02112,0,0,0-3.98861,1.522L920.589,398.59669l-6.7179,14.92653-2.56118,5.69979A3.022,3.022,0,0,0,912.82137,423.21181Z" transform="translate(-108.75634 -68.49293)" fill="#f2f2f2"/><polygon points="773.577 540.443 785.837 540.442 791.67 493.154 773.575 493.155 773.577 540.443" fill="#ffb8b8"/><path d="M879.2066,604.93325l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38648,15.38623v.5l-39.53052.00146Z" transform="translate(-108.75634 -68.49293)" fill="#2f2e41"/><polygon points="805.577 537.443 817.837 537.442 823.67 490.154 805.575 490.155 805.577 537.443" fill="#ffb8b8"/><path d="M911.2066,601.93325l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38648,15.38623v.5l-39.53052.00146Z" transform="translate(-108.75634 -68.49293)" fill="#2f2e41"/><path d="M827.34138,497.97109a39.41035,39.41035,0,0,0,36.8999,26.81006l.62012.01c6.32959.18,13.75976-1.86,21.0498-4.79,14.3999-5.79,28.23-15.06,31.8999-17.61l-6.21972,59.79-2.52,24.24a4.51415,4.51415,0,0,0,4.48,4.97h15.52978a4.50547,4.50547,0,0,0,4.35987-3.36l25.64013-97.65a19.032,19.032,0,0,0-19.71-23.83l-53.25976,3.65,3.71972-14.88-47.54-3.16-.13965.1c-1.14013.83-2.25,1.7-3.31005,2.61a40.27149,40.27149,0,0,0-6.99024,7.66A38.48741,38.48741,0,0,0,827.34138,497.97109Z" transform="translate(-108.75634 -68.49293)" fill="#2f2e41"/><path d="M827.34138,497.97109a39.41035,39.41035,0,0,0,36.8999,26.81006,196.14623,196.14623,0,0,0,22.56982-13.39l-.8999,8.61-7.83984,75.42a4.51415,4.51415,0,0,0,4.48,4.97h15.52978a4.50547,4.50547,0,0,0,4.35987-3.36l9.15039-34.85,16.48974-62.8a19.032,19.032,0,0,0-19.71-23.83l-53.25976,3.65,3.71972-14.88-26.98-1.79A38.48741,38.48741,0,0,0,827.34138,497.97109Z" transform="translate(-108.75634 -68.49293)" fill="#2f2e41"/><path d="M838.7735,458.32082l-.35766-.043-8.29517-40.78515c-.071-.354-6.85229-35.5332,13.93677-53.92432l.36182-2.51709a4.50032,4.50032,0,0,1,5.78711-3.65771l19.58471,6.0747a4.49086,4.49086,0,0,1,3.019,5.4419l-1.90381,7.2417c2.63989,3.1001,33.7146,40.51221,22.89038,69.33545L888.9488,464.439Z" transform="translate(-108.75634 -68.49293)" fill="#b3b5c3"/><path d="M920.09389,426.48986a10.52591,10.52591,0,0,0-1.32908.99037l-47.89739-12.858-3.13136-11.634-18.17538,2.43095,3.54192,21.13437a8,8,0,0,0,6.95146,6.62248l56.032,6.619a10.4971,10.4971,0,1,0,4.00785-13.30516Z" transform="translate(-108.75634 -68.49293)" fill="#ffb8b8"/><path d="M869.022,414.43646,846.48068,417.34a4.5,4.5,0,0,1-5.07405-4.54822l.42987-22.65461a12.49741,12.49741,0,0,1,24.79917-3.12052l6.14215,21.73423a4.5,4.5,0,0,1-3.75583,5.68559Z" transform="translate(-108.75634 -68.49293)" fill="#b3b5c3"/><circle cx="753.92061" cy="258.80372" r="24.56103" fill="#ffb8b8"/><path d="M861.3848,329.34791l-3.075-5.59966c-5.82461,23.73215,4.46383,43.37315,4.46383,43.37315l-39.93243-18.601.38033-6.59991-3.95134,4.484-5.67747-3.12872-.74992-4.28064-4.28563,1.06158,15.64354-28.38736c15.18238-27.01314,37.25508-16.69982,37.25508-16.69982,35.11544-1.66934,30.82681,32.97543,30.82681,32.97543Z" transform="translate(-108.75634 -68.49293)" fill="#2f2e41"/><ellipse cx="556.1612" cy="472.39114" rx="12.17949" ry="47.5" transform="translate(-275.75171 306.36236) rotate(-32.66242)" fill="#3f3d56"/></svg>
            </div>

            <p className="label">Search millions of songs, albums, and artists ...</p>
            <p className="small">Illustration by <a target={ "_blank"} href="https://undraw.co/">unDraw</a></p>
        </div>
        
    
    
        }
    </>
    }/>

    )

}


export { SearchPage }



