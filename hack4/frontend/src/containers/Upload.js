import Uploader from '../components/Uploader';
import { useMutation } from '@apollo/react-hooks';

import "./Upload.css";

import {
    INSERT_MUTATION,
} from '../graphql';


export default function Upload() {

    // TODO get the mutation function
    // pass it to the Uploader component
    const [insertData] = useMutation(INSERT_MUTATION);
    

    return <div id="Upload">
        <div id="PeopleUploader">
            {/* <Uploader tag="People" mutation={() => {}}/> */}
            <Uploader tag="People" mutation={insertData}/>
        </div>
    </div>;
}
