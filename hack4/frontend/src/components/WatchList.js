import constants from '../constants';  
// Look at this file and see how the watchList is strucutred

import { useQuery } from '@apollo/react-hooks';
import {
    STATCOUNT_QUERY,
} from '../graphql';

export default function WatchList() {

    // TODO
    // query countStats
    // save the result in a counts variable
    
    console.log("constants = ", constants.watchList)
    const { loading, error, data, subscribeToMore } = useQuery(STATCOUNT_QUERY, {
        variables: { locationKeywords: constants.watchList, severity: 1 }
    });
    console.log("data = ", data)
    const counts = data;


    // TODO
    // use subscription
    
    // DO NOT MODIFY BELOW THIS LINE
    return (
        <table>
        <tbody>
            <tr>
                <th>Keyword</th>
                <th>Count</th>
            </tr>
            {
                constants.watchList.map(
                    (keyword, idx) => 
                    <tr key={keyword}>
                        <td>{keyword}</td>
                        {/* You might need to see this */}
                        <td id={`count-${idx}`}>{!counts || ! counts.statsCount || counts.statsCount[idx]}</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    );
}