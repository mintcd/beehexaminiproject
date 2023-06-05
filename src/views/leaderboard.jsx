import React from "react";

const Leaderboard = ({ topUsers }) => {

    return <div>
        {console.log("Leaderboard", topUsers)}

        <div class="leaderboard-container">
            <div class="leaderboard-title"> Most respected colleagues - go learn from them!</div>
            <ul class="responsive-table">
                <li class="table-header">
                    <div class="col col-1"> Name </div>
                    <div class="col col-2">Score</div>
                    <div class="col col-3"> Best value </div>
                </li>
                {topUsers.map((user) => <li class="table-row">
                    <div class="col col-1">John Doe</div>
                    <div class="col col-2">$350</div>
                    <div class="col col-3">Pending</div>
                </li>)}
            </ul>
        </div>
    </div>
}

export default Leaderboard;